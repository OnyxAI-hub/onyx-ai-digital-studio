
-- MODEL CATALOG
CREATE TABLE public.model_catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  model_type text NOT NULL,
  description text,
  safety_level text NOT NULL DEFAULT 'standard',
  is_premium boolean NOT NULL DEFAULT false,
  cta_label text DEFAULT 'Open Studio',
  cta_href text DEFAULT '/generate',
  thumbnail_gradient text DEFAULT 'from-zinc-700 to-zinc-900',
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.model_catalog ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read models" ON public.model_catalog FOR SELECT USING (is_active = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage models" ON public.model_catalog FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_model_catalog_updated BEFORE UPDATE ON public.model_catalog FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- MODEL PRICING
CREATE TABLE public.model_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id uuid NOT NULL REFERENCES public.model_catalog(id) ON DELETE CASCADE,
  quality_tier text NOT NULL,
  credit_cost int NOT NULL,
  unit_label text DEFAULT 'per generation',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.model_pricing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read pricing" ON public.model_pricing FOR SELECT USING (true);
CREATE POLICY "Admins manage pricing" ON public.model_pricing FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- DAILY REWARDS
CREATE TABLE public.daily_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reward_key text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  reward_type text NOT NULL DEFAULT 'checkin',
  credits int NOT NULL DEFAULT 0,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.daily_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read rewards" ON public.daily_rewards FOR SELECT USING (is_active = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage rewards" ON public.daily_rewards FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- REWARD CLAIMS
CREATE TABLE public.reward_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  reward_id uuid NOT NULL REFERENCES public.daily_rewards(id) ON DELETE CASCADE,
  claimed_at timestamptz NOT NULL DEFAULT now(),
  credits_awarded int NOT NULL DEFAULT 0
);
ALTER TABLE public.reward_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own claims" ON public.reward_claims FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Users create own claims" ON public.reward_claims FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins manage claims" ON public.reward_claims FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- CHALLENGES
CREATE TABLE public.challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  theme text,
  status text NOT NULL DEFAULT 'upcoming',
  banner_gradient text DEFAULT 'from-zinc-700 to-zinc-900',
  starts_at timestamptz,
  ends_at timestamptz,
  prize text,
  vote_reward int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read challenges" ON public.challenges FOR SELECT USING (true);
CREATE POLICY "Admins manage challenges" ON public.challenges FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_challenges_updated BEFORE UPDATE ON public.challenges FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- CHALLENGE ENTRIES
CREATE TABLE public.challenge_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id uuid NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  title text,
  asset_url text,
  votes int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.challenge_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read entries" ON public.challenge_entries FOR SELECT USING (true);
CREATE POLICY "Users create own entries" ON public.challenge_entries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own entries" ON public.challenge_entries FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own entries" ON public.challenge_entries FOR DELETE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

-- BLOG POSTS
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  body text,
  category text DEFAULT 'General',
  author_name text,
  read_time text DEFAULT '5 min',
  cover_gradient text DEFAULT 'from-zinc-700 to-zinc-900',
  views int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read blog" ON public.blog_posts FOR SELECT USING (is_published = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage blog" ON public.blog_posts FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_blog_posts_updated BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- BLOG CLAPS
CREATE TABLE public.blog_claps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id)
);
ALTER TABLE public.blog_claps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read claps" ON public.blog_claps FOR SELECT USING (true);
CREATE POLICY "Users add own claps" ON public.blog_claps FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users remove own claps" ON public.blog_claps FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- POSTS (feed)
CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  caption text,
  media_url text,
  media_gradient text DEFAULT 'from-zinc-700 to-zinc-900',
  model_name text,
  challenge_id uuid REFERENCES public.challenges(id) ON DELETE SET NULL,
  views int NOT NULL DEFAULT 0,
  is_public boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read posts" ON public.posts FOR SELECT USING (is_public = true OR auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Users create own posts" ON public.posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own posts" ON public.posts FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own posts" ON public.posts FOR DELETE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_posts_updated BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- POST LIKES
CREATE TABLE public.post_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id)
);
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read likes" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Users add own likes" ON public.post_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users remove own likes" ON public.post_likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- POST COMMENTS
CREATE TABLE public.post_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read comments" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Users add own comments" ON public.post_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own comments" ON public.post_comments FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own comments" ON public.post_comments FOR DELETE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

-- GALLERY ITEMS
CREATE TABLE public.gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text DEFAULT 'All',
  model_name text,
  gradient text DEFAULT 'from-zinc-700 to-zinc-900',
  span text DEFAULT 'square',
  media_url text,
  is_featured boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Admins manage gallery" ON public.gallery_items FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ASSET MANAGER
CREATE TABLE public.asset_manager (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  asset_type text DEFAULT 'image',
  file_url text,
  thumbnail_url text,
  size_bytes bigint DEFAULT 0,
  source text DEFAULT 'upload',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.asset_manager ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own assets" ON public.asset_manager FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Users insert own assets" ON public.asset_manager FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own assets" ON public.asset_manager FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own assets" ON public.asset_manager FOR DELETE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_asset_manager_updated BEFORE UPDATE ON public.asset_manager FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Indexes
CREATE INDEX idx_posts_created ON public.posts(created_at DESC);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published_at DESC);
CREATE INDEX idx_challenges_status ON public.challenges(status);
CREATE INDEX idx_model_catalog_active ON public.model_catalog(is_active, sort_order);
CREATE INDEX idx_gallery_featured ON public.gallery_items(is_featured, sort_order);
CREATE INDEX idx_asset_manager_user ON public.asset_manager(user_id, created_at DESC);
