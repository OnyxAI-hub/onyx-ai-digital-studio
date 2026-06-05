
-- Restrict engagement & activity reads to authenticated users to prevent anonymous user_id enumeration
DROP POLICY IF EXISTS "Public read claps" ON public.blog_claps;
CREATE POLICY "Authenticated read claps" ON public.blog_claps FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Public read likes" ON public.post_likes;
CREATE POLICY "Authenticated read likes" ON public.post_likes FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Public read comments" ON public.post_comments;
CREATE POLICY "Authenticated read comments" ON public.post_comments FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Public read entries" ON public.challenge_entries;
CREATE POLICY "Authenticated read entries" ON public.challenge_entries FOR SELECT TO authenticated USING (true);

-- Revoke anon grants so the tables are not enumerable without sign-in
REVOKE SELECT ON public.blog_claps FROM anon;
REVOKE SELECT ON public.post_likes FROM anon;
REVOKE SELECT ON public.post_comments FROM anon;
REVOKE SELECT ON public.challenge_entries FROM anon;

-- Lock down has_role SECURITY DEFINER function to only roles that need it for RLS evaluation
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
