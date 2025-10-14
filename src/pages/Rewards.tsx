import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button3D } from '@/components/ui/Button3D';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Flame, Gift, Trophy, Star, Coins, 
  TrendingUp, Calendar, Award
} from 'lucide-react';
import { toast } from 'sonner';

export default function Rewards() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [streakData, setStreakData] = useState<any>(null);
  const [userStats, setUserStats] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [boxes, setBoxes] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadRewardsData(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadRewardsData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadRewardsData = async (userId: string) => {
    // Load streak data
    const { data: streak } = await supabase
      .from('daily_streaks')
      .select('*')
      .eq('user_id', userId)
      .single();
    setStreakData(streak);

    // Load user stats
    const { data: stats } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();
    setUserStats(stats);

    // Load recent tasks
    const { data: recentTasks } = await supabase
      .from('social_tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);
    setTasks(recentTasks || []);

    // Load wardrobe boxes
    const { data: userBoxes } = await supabase
      .from('wardrobe_boxes')
      .select('*')
      .eq('user_id', userId)
      .eq('is_opened', false);
    setBoxes(userBoxes || []);
  };

  const claimDailyReward = async () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (streakData?.last_login_date === today) {
      toast.error('Already claimed today!');
      return;
    }

    const newStreak = streakData?.current_streak + 1 || 1;
    const reward = Math.min(5 + (newStreak - 1) * 5, 25);

    const { error } = await supabase
      .from('daily_streaks')
      .update({
        current_streak: newStreak,
        longest_streak: Math.max(newStreak, streakData?.longest_streak || 0),
        last_login_date: today,
        total_fdh_earned: (streakData?.total_fdh_earned || 0) + reward
      })
      .eq('user_id', user.id);

    if (!error) {
      // Grant wardrobe box on day 7
      if (newStreak === 7) {
        await supabase.from('wardrobe_boxes').insert({
          user_id: user.id,
          box_type: 'rare'
        });
        toast.success(`Day 7! +${reward} $FDH + Wardrobe Box! 🎁`);
      } else {
        toast.success(`Day ${newStreak} claimed! +${reward} $FDH`);
      }
      
      loadRewardsData(user.id);
    }
  };

  const openBox = async (boxId: string) => {
    const { error } = await supabase
      .from('wardrobe_boxes')
      .update({ is_opened: true, opened_at: new Date().toISOString() })
      .eq('id', boxId);

    if (!error) {
      toast.success('Box opened! Check your wardrobe!');
      loadRewardsData(user.id);
    }
  };

  const streakReward = Math.min(5 + ((streakData?.current_streak || 0) - 1) * 5, 25);
  const nextLevelXP = (userStats?.level || 1) * 100;
  const xpProgress = ((userStats?.xp || 0) / nextLevelXP) * 100;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => navigate('/')}>
            $FDH Rewards Dashboard
          </h1>
          <Button3D variant="hero" onClick={() => navigate('/')}>
            Back to Home
          </Button3D>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border-primary/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                  <p className="text-3xl font-bold gradient-text">{userStats?.total_fdh_earned || 0}</p>
                  <p className="text-xs text-muted-foreground">$FDH</p>
                </div>
                <Coins className="w-12 h-12 text-yellow-500" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-green-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Level</p>
                  <p className="text-3xl font-bold text-green-400">{userStats?.level || 1}</p>
                  <Progress value={xpProgress} className="h-1 mt-2" />
                </div>
                <TrendingUp className="w-12 h-12 text-green-400" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Style Points</p>
                  <p className="text-3xl font-bold text-purple-400">{userStats?.style_points || 0}</p>
                  <p className="text-xs text-muted-foreground">SP</p>
                </div>
                <Star className="w-12 h-12 text-purple-400" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm border-orange-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-3xl font-bold text-orange-400">{streakData?.current_streak || 0}</p>
                  <p className="text-xs text-muted-foreground">days</p>
                </div>
                <Flame className="w-12 h-12 text-orange-400" />
              </div>
            </Card>
          </div>

          {/* Daily Streak */}
          <Card className="p-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border-orange-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Flame className="w-16 h-16 text-orange-500" />
                <div>
                  <h2 className="text-3xl font-bold">Daily Lucky Streak</h2>
                  <p className="text-muted-foreground">
                    Current Streak: {streakData?.current_streak || 0} days | Longest: {streakData?.longest_streak || 0} days
                  </p>
                  <div className="flex space-x-2 mt-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div
                        key={day}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          (streakData?.current_streak || 0) >= day
                            ? 'bg-orange-500 text-white'
                            : 'bg-background/50 text-muted-foreground'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold gradient-text mb-2">+{streakReward}</p>
                <p className="text-sm text-muted-foreground mb-4">$FDH Today</p>
                <Button3D variant="hero" onClick={claimDailyReward}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Claim Daily Reward
                </Button3D>
              </div>
            </div>
          </Card>

          {/* Wardrobe Boxes */}
          {boxes.length > 0 && (
            <Card className="p-8 bg-card/80 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Gift className="w-6 h-6 mr-2 text-primary" />
                Wardrobe Boxes ({boxes.length})
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                {boxes.map((box) => (
                  <Card key={box.id} className="p-6 text-center bg-gradient-to-br from-primary/20 to-accent/20">
                    <Gift className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <Badge className="mb-4">{box.box_type}</Badge>
                    <Button3D variant="nft" onClick={() => openBox(box.id)} className="w-full">
                      Open Box
                    </Button3D>
                  </Card>
                ))}
              </div>
            </Card>
          )}

          {/* Recent Activity */}
          <Card className="p-8 bg-card/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-primary" />
              Recent Rewards ({tasks.length})
            </h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="capitalize">{task.task_type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-green-400">+{task.fdh_reward}</span>
                    <span className="text-sm text-muted-foreground">$FDH</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
