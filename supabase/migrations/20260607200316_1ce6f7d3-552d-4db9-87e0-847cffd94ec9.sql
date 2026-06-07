
-- blog_claps
DROP POLICY IF EXISTS "Authenticated read claps" ON public.blog_claps;
CREATE POLICY "Users read own claps" ON public.blog_claps
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));

-- post_likes
DROP POLICY IF EXISTS "Authenticated read likes" ON public.post_likes;
CREATE POLICY "Users read own likes" ON public.post_likes
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));

-- post_comments
DROP POLICY IF EXISTS "Authenticated read comments" ON public.post_comments;
CREATE POLICY "Users read own comments" ON public.post_comments
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));

-- challenge_entries
DROP POLICY IF EXISTS "Authenticated read entries" ON public.challenge_entries;
CREATE POLICY "Users read own entries" ON public.challenge_entries
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));
