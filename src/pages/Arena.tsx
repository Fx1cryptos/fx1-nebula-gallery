import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button3D } from '@/components/ui/Button3D';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Swords, Heart, Trophy, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function Arena() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [currentBattle, setCurrentBattle] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadArenaData();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadArenaData();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadArenaData = async () => {
    const { data: battle } = await supabase
      .from('arena_battles')
      .select('*')
      .eq('is_active', true)
      .single();

    setCurrentBattle(battle);

    if (battle) {
      const { data: battleSubmissions } = await supabase
        .from('arena_submissions')
        .select(`
          *,
          profiles:user_id (username, avatar_url)
        `)
        .eq('battle_id', battle.id)
        .order('votes_count', { ascending: false });

      setSubmissions(battleSubmissions || []);
    }
  };

  const voteForSubmission = async (submissionId: string) => {
    const { data: existingVote } = await supabase
      .from('arena_votes')
      .select('id')
      .eq('submission_id', submissionId)
      .eq('user_id', user.id)
      .single();

    if (existingVote) {
      toast.error('Already voted for this submission');
      return;
    }

    await supabase.from('arena_votes').insert({
      submission_id: submissionId,
      user_id: user.id
    });

    toast.success('Vote cast! +2 $FDH earned');
    
    await supabase.from('social_tasks').insert({
      user_id: user.id,
      task_type: 'vote',
      fdh_reward: 2
    });

    loadArenaData();
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => navigate('/')}>
            Fashion Arena
          </h1>
          <Button3D variant="hero" onClick={() => navigate('/')}>
            Back to Home
          </Button3D>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Arena Header */}
          <div className="text-center space-y-4">
            <Swords className="w-16 h-16 mx-auto text-primary" />
            <h1 className="text-5xl font-bold gradient-text">Social Fashion Arena</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Battle for Best Dressed. Winners receive exclusive NFTs + $FDH rewards!
            </p>
          </div>

          {currentBattle ? (
            <>
              {/* Current Battle Info */}
              <Card className="p-8 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border-primary/30">
                <div className="text-center space-y-2">
                  <Badge className="text-lg px-4 py-1">Week {currentBattle.week_number}</Badge>
                  <h2 className="text-3xl font-bold">{currentBattle.theme}</h2>
                  <p className="text-muted-foreground">
                    Ends: {new Date(currentBattle.end_date).toLocaleDateString()}
                  </p>
                  <div className="flex justify-center space-x-8 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Prize Pool</p>
                      <p className="text-2xl font-bold gradient-text">1500 $FDH</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submissions</p>
                      <p className="text-2xl font-bold">{submissions.length}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Submissions Grid */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Submissions</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {submissions.map((submission, index) => (
                    <Card key={submission.id} className={`overflow-hidden bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all ${
                      index < 3 ? 'border-primary/30' : ''
                    }`}>
                      {index < 3 && (
                        <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-2 text-center">
                          <Trophy className="w-5 h-5 inline mr-2 text-yellow-500" />
                          <span className="font-bold">Top {index + 1}</span>
                        </div>
                      )}
                      <div className="aspect-square relative">
                        <img
                          src={submission.image_url}
                          alt={submission.outfit_description}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex items-center space-x-2">
                          <img
                            src={submission.profiles?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg'}
                            alt="Avatar"
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-bold">{submission.profiles?.username || 'Anonymous'}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{submission.outfit_description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-5 h-5 text-red-500" />
                            <span className="font-bold">{submission.votes_count}</span>
                          </div>
                          <Button3D
                            variant="nft"
                            size="sm"
                            onClick={() => voteForSubmission(submission.id)}
                          >
                            Vote (+2 $FDH)
                          </Button3D>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Submit Entry */}
              <Card className="p-8 bg-card/80 backdrop-blur-sm text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">Submit Your Look</h3>
                <p className="text-muted-foreground mb-6">
                  Show off your NFT wearables and compete for the top spot!
                </p>
                <Button3D variant="hero" onClick={() => navigate('/runway')}>
                  Go to Fashion Runway
                </Button3D>
              </Card>
            </>
          ) : (
            <Card className="p-12 text-center bg-card/80 backdrop-blur-sm">
              <Swords className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">No Active Battle</h2>
              <p className="text-muted-foreground">Check back soon for the next Fashion Arena!</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
