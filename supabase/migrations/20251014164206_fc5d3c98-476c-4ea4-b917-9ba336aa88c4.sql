-- Social Posts System
CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  image_url text,
  nft_id uuid REFERENCES public.nfts(id) ON DELETE SET NULL,
  wearable_id uuid REFERENCES public.wearables(id) ON DELETE SET NULL,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  reposts_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.post_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

CREATE TABLE public.comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.reposts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Daily Streaks System
CREATE TABLE public.daily_streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_login_date date,
  total_fdh_earned numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Social Tasks System
CREATE TABLE public.social_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_type text NOT NULL, -- 'post', 'like', 'comment', 'repost', 'follow'
  fdh_reward numeric NOT NULL,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- User Levels & Style Points
CREATE TABLE public.user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  level integer DEFAULT 1,
  xp integer DEFAULT 0,
  style_points integer DEFAULT 0,
  total_fdh_earned numeric DEFAULT 0,
  total_posts integer DEFAULT 0,
  total_likes_received integer DEFAULT 0,
  total_followers integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Wardrobe Boxes (Loot System)
CREATE TABLE public.wardrobe_boxes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  box_type text NOT NULL, -- 'common', 'rare', 'epic', 'legendary'
  is_opened boolean DEFAULT false,
  opened_at timestamptz,
  reward_nft_id uuid REFERENCES public.wearables(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Fashion Quests
CREATE TABLE public.fashion_quests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  quest_type text NOT NULL, -- 'outfit', 'collab', 'share'
  fdh_reward numeric NOT NULL,
  requirements jsonb NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.quest_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quest_id uuid NOT NULL REFERENCES public.fashion_quests(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_at timestamptz DEFAULT now(),
  UNIQUE(quest_id, user_id)
);

-- Leaderboards
CREATE TABLE public.leaderboard_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category text NOT NULL, -- 'creator', 'collector', 'fashionista'
  score numeric NOT NULL,
  week_number integer NOT NULL,
  year integer NOT NULL,
  rank integer,
  reward_claimed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, category, week_number, year)
);

-- Badges & Achievements
CREATE TABLE public.badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  requirement jsonb NOT NULL,
  fdh_reward numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id uuid NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Fashion Arena (PvP)
CREATE TABLE public.arena_battles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_number integer NOT NULL,
  year integer NOT NULL,
  theme text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.arena_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  battle_id uuid NOT NULL REFERENCES public.arena_battles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  outfit_description text NOT NULL,
  image_url text NOT NULL,
  wearable_ids uuid[] NOT NULL,
  votes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(battle_id, user_id)
);

CREATE TABLE public.arena_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid NOT NULL REFERENCES public.arena_submissions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(submission_id, user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reposts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wardrobe_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fashion_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quest_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arena_battles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arena_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arena_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Posts
CREATE POLICY "Posts viewable by everyone" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON public.posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON public.posts FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Post Likes
CREATE POLICY "Post likes viewable by everyone" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage own post likes" ON public.post_likes FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for Comments
CREATE POLICY "Comments viewable by everyone" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON public.comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Reposts
CREATE POLICY "Reposts viewable by everyone" ON public.reposts FOR SELECT USING (true);
CREATE POLICY "Users can manage own reposts" ON public.reposts FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for Daily Streaks
CREATE POLICY "Users can view own streaks" ON public.daily_streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own streaks" ON public.daily_streaks FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for Social Tasks
CREATE POLICY "Users can view own tasks" ON public.social_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own tasks" ON public.social_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for User Stats
CREATE POLICY "User stats viewable by everyone" ON public.user_stats FOR SELECT USING (true);
CREATE POLICY "Users can manage own stats" ON public.user_stats FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for Wardrobe Boxes
CREATE POLICY "Users can view own boxes" ON public.wardrobe_boxes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own boxes" ON public.wardrobe_boxes FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for Fashion Quests
CREATE POLICY "Quests viewable by everyone" ON public.fashion_quests FOR SELECT USING (true);
CREATE POLICY "Admins can manage quests" ON public.fashion_quests FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for Quest Completions
CREATE POLICY "Quest completions viewable by everyone" ON public.quest_completions FOR SELECT USING (true);
CREATE POLICY "Users can complete quests" ON public.quest_completions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for Leaderboards
CREATE POLICY "Leaderboards viewable by everyone" ON public.leaderboard_entries FOR SELECT USING (true);
CREATE POLICY "Users can update own leaderboard entries" ON public.leaderboard_entries FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for Badges
CREATE POLICY "Badges viewable by everyone" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Admins can manage badges" ON public.badges FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for User Badges
CREATE POLICY "User badges viewable by everyone" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "Users can view own badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for Arena
CREATE POLICY "Arena battles viewable by everyone" ON public.arena_battles FOR SELECT USING (true);
CREATE POLICY "Admins can manage battles" ON public.arena_battles FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Arena submissions viewable by everyone" ON public.arena_submissions FOR SELECT USING (true);
CREATE POLICY "Users can create submissions" ON public.arena_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own submissions" ON public.arena_submissions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Arena votes viewable by everyone" ON public.arena_votes FOR SELECT USING (true);
CREATE POLICY "Users can manage own votes" ON public.arena_votes FOR ALL USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_daily_streaks_updated_at BEFORE UPDATE ON public.daily_streaks
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON public.user_stats
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_leaderboard_entries_updated_at BEFORE UPDATE ON public.leaderboard_entries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Initialize user stats on new user signup
CREATE OR REPLACE FUNCTION public.initialize_user_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id);
  
  INSERT INTO public.daily_streaks (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_user_created_init_stats
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.initialize_user_stats();