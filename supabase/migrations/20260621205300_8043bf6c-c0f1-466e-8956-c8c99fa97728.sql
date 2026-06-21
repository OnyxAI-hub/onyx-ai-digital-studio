-- 1. Creative requests: give admins an explicit DELETE policy.
CREATE POLICY "Admins delete requests"
ON public.creative_requests
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. Challenge entries: remove the user-owned UPDATE policy that allowed
--    authenticated users to edit any column on their own row, including the
--    votes counter. Replace it with an admin-only UPDATE policy.
DROP POLICY IF EXISTS "Users update own entries" ON public.challenge_entries;

CREATE POLICY "Admins update entries"
ON public.challenge_entries
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 3. Reward claims: remove the overly permissive user INSERT policy and
--    replace direct inserts with a SECURITY DEFINER function that validates
--    the reward, prevents duplicate claims, and sets the credit amount from
--    daily_rewards (so users can't award themselves arbitrary credits).
DROP POLICY IF EXISTS "Users create own claims" ON public.reward_claims;

-- Enforce one claim per user per reward at the database level.
ALTER TABLE public.reward_claims
DROP CONSTRAINT IF EXISTS unique_user_reward_claim;

ALTER TABLE public.reward_claims
ADD CONSTRAINT unique_user_reward_claim UNIQUE (user_id, reward_id);

CREATE OR REPLACE FUNCTION public.claim_daily_reward(p_reward_id uuid)
RETURNS public.reward_claims
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_reward public.daily_rewards;
  v_claim public.reward_claims;
BEGIN
  -- Reward must exist and be active.
  SELECT * INTO v_reward
  FROM public.daily_rewards
  WHERE id = p_reward_id AND is_active = true;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Reward not found or inactive';
  END IF;

  -- Prevent duplicate claims.
  IF EXISTS (
    SELECT 1 FROM public.reward_claims
    WHERE user_id = auth.uid() AND reward_id = p_reward_id
  ) THEN
    RAISE EXCEPTION 'Reward already claimed';
  END IF;

  -- Insert with the reward's configured credit amount, not a user-supplied value.
  INSERT INTO public.reward_claims (user_id, reward_id, credits_awarded)
  VALUES (auth.uid(), p_reward_id, v_reward.credits)
  RETURNING * INTO v_claim;

  RETURN v_claim;
END;
$$;

GRANT EXECUTE ON FUNCTION public.claim_daily_reward(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.claim_daily_reward(uuid) TO service_role;