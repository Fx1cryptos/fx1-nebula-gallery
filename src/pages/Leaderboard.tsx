import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button3D } from '@/components/ui/Button3D';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Trophy, Crown, Medal, Star } from 'lucide-react';

export default function Leaderboard() {
  const navigate = useNavigate();
  const [creators, setCreators] = useState<any[]>([]);
  const [collectors, setCollectors] = useState<any[]>([]);
  const [fashionistas, setFashionistas] = useState<any[]>([]);

  useEffect(() => {
    loadLeaderboards();
  }, []);

  const loadLeaderboards = async () => {
    const currentWeek = Math.ceil((new Date().getTime() - new Date().getFullYear()) / (7 * 24 * 60 * 60 * 1000));
    const currentYear = new Date().getFullYear();

    // Load all categories
    const { data: creatorsData } = await supabase
      .from('leaderboard_entries')
      .select(`
        *,
        profiles:user_id (username, avatar_url)
      `)
      .eq('category', 'creator')
      .eq('week_number', currentWeek)
      .eq('year', currentYear)
      .order('score', { ascending: false })
      .limit(10);

    const { data: collectorsData } = await supabase
      .from('leaderboard_entries')
      .select(`
        *,
        profiles:user_id (username, avatar_url)
      `)
      .eq('category', 'collector')
      .eq('week_number', currentWeek)
      .eq('year', currentYear)
      .order('score', { ascending: false })
      .limit(10);

    const { data: fashionistasData } = await supabase
      .from('leaderboard_entries')
      .select(`
        *,
        profiles:user_id (username, avatar_url)
      `)
      .eq('category', 'fashionista')
      .eq('week_number', currentWeek)
      .eq('year', currentYear)
      .order('score', { ascending: false })
      .limit(10);

    setCreators(creatorsData || []);
    setCollectors(collectorsData || []);
    setFashionistas(fashionistasData || []);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-700" />;
    return <Star className="w-5 h-5 text-muted-foreground" />;
  };

  const getRankReward = (rank: number) => {
    if (rank === 1) return '1000 $FDH';
    if (rank === 2) return '750 $FDH';
    if (rank === 3) return '500 $FDH';
    return '—';
  };

  const LeaderboardList = ({ entries }: { entries: any[] }) => (
    <div className="space-y-4">
      {entries.map((entry, index) => (
        <Card key={entry.id} className={`p-6 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all ${
          index < 3 ? 'border-primary/30' : ''
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 text-center">
                {getRankIcon(index + 1)}
              </div>
              <Avatar className="w-12 h-12">
                <img 
                  src={entry.profiles?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg'} 
                  alt="Avatar"
                />
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{entry.profiles?.username || 'Anonymous'}</h3>
                <p className="text-sm text-muted-foreground">Score: {entry.score}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold gradient-text">#{index + 1}</p>
              <p className="text-sm text-green-400">{getRankReward(index + 1)}</p>
            </div>
          </div>
        </Card>
      ))}
      {entries.length === 0 && (
        <Card className="p-12 text-center bg-card/80 backdrop-blur-sm">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-xl text-muted-foreground">No entries yet this week</p>
        </Card>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => navigate('/')}>
            FX1 Leaderboards
          </h1>
          <Button3D variant="hero" onClick={() => navigate('/')}>
            Back to Home
          </Button3D>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-5xl font-bold gradient-text mb-4">Weekly Leaderboards</h1>
            <p className="text-xl text-muted-foreground">
              Top performers earn $FDH rewards every week!
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">🥇 1st</p>
                <p className="text-sm text-muted-foreground">1000 $FDH</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-400">🥈 2nd</p>
                <p className="text-sm text-muted-foreground">750 $FDH</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-700">🥉 3rd</p>
                <p className="text-sm text-muted-foreground">500 $FDH</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="creators" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="creators">Top Creators</TabsTrigger>
              <TabsTrigger value="collectors">Top Collectors</TabsTrigger>
              <TabsTrigger value="fashionistas">Top Fashionistas</TabsTrigger>
            </TabsList>
            <TabsContent value="creators">
              <LeaderboardList entries={creators} />
            </TabsContent>
            <TabsContent value="collectors">
              <LeaderboardList entries={collectors} />
            </TabsContent>
            <TabsContent value="fashionistas">
              <LeaderboardList entries={fashionistas} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
