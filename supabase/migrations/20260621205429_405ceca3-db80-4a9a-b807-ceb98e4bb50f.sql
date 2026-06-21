-- Lock down the claim_daily_reward SECURITY DEFINER function so it is only
-- callable by the service role. This removes the Supabase linter warnings
-- about anonymous and authenticated users being able to execute it, while
-- keeping the secure server-side claim path available for edge functions.
REVOKE EXECUTE ON FUNCTION public.claim_daily_reward(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.claim_daily_reward(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.claim_daily_reward(uuid) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.claim_daily_reward(uuid) TO service_role;