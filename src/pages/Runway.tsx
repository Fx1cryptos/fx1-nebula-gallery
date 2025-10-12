import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button3D } from '@/components/ui/Button3D';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Heart, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function Runway() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    loadSubmissions();
    return () => subscription.unsubscribe();
  }, []);

  const loadSubmissions = async () => {
    const { data, error } = await supabase
      .from('fashion_runway_submissions')
      .select('*, profiles(username, avatar_url)')
      .order('votes', { ascending: false })
      .limit(12);

    if (error) {
      console.error('Error loading submissions:', error);
    } else {
      setSubmissions(data || []);
    }
  };

  const handleVote = async (submissionId: string) => {
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    const submission = submissions.find(s => s.id === submissionId);
    if (!submission) return;

    const { error } = await supabase
      .from('fashion_runway_submissions')
      .update({ votes: submission.votes + 1 })
      .eq('id', submissionId);

    if (error) {
      toast.error('Failed to vote');
    } else {
      toast.success('Vote submitted!');
      loadSubmissions();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => navigate('/')}>
            FX1 Runway
          </h1>
          <div className="flex gap-3">
            {user && (
              <Button3D variant="creator" onClick={() => navigate('/create')}>
                <Upload className="w-4 h-4 mr-2" />
                Submit Entry
              </Button3D>
            )}
            <Button3D variant="hero" onClick={() => navigate('/')}>
              Back to Home
            </Button3D>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Trophy className="w-10 h-10 text-yellow-500" />
              <h1 className="text-5xl font-bold gradient-text">Onchain Fashion Runway</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Submit your wearable NFTs and compete for weekly prizes
            </p>
          </div>

          <Card className="p-8 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border-primary/30">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold gradient-text">500 $FDH</p>
                <p className="text-muted-foreground mt-2">Weekly Prize</p>
              </div>
              <div>
                <p className="text-4xl font-bold gradient-text">{submissions.length}</p>
                <p className="text-muted-foreground mt-2">Total Entries</p>
              </div>
              <div>
                <p className="text-4xl font-bold gradient-text">Week 1</p>
                <p className="text-muted-foreground mt-2">Current Round</p>
              </div>
            </div>
          </Card>

          <div>
            <h2 className="text-3xl font-bold mb-6">Current Submissions</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {submissions.map((submission) => (
                <Card key={submission.id} className="overflow-hidden bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all">
                  <div className="aspect-square relative">
                    <img
                      src={submission.image_url}
                      alt={submission.title}
                      className="w-full h-full object-cover"
                    />
                    {submission.is_winner && (
                      <Badge className="absolute top-4 right-4 bg-yellow-500">
                        <Trophy className="w-3 h-3 mr-1" />
                        Winner
                      </Badge>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold text-lg">{submission.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {submission.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          {submission.profiles?.avatar_url ? (
                            <img src={submission.profiles.avatar_url} alt="" className="w-full h-full rounded-full" />
                          ) : (
                            <span className="text-xs">{submission.profiles?.username?.[0] || 'U'}</span>
                          )}
                        </div>
                        <span className="text-sm">{submission.profiles?.username || 'Anonymous'}</span>
                      </div>
                      <Button3D
                        variant="nft"
                        size="sm"
                        onClick={() => handleVote(submission.id)}
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        {submission.votes}
                      </Button3D>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
