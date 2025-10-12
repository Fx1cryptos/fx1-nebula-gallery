import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button3D } from '@/components/ui/Button3D';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users, Copy, Gift, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function Referrals() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [referralCode, setReferralCode] = useState('');
  const [referrals, setReferrals] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, rewards: 0 });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadReferralData(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadReferralData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadReferralData = async (userId: string) => {
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', userId);

    if (error) {
      console.error('Error loading referrals:', error);
    } else {
      setReferrals(data || []);
      if (data && data.length > 0) {
        setReferralCode(data[0].referral_code);
        setStats({
          total: data.length,
          rewards: data.reduce((sum, r) => sum + parseFloat((r.reward_amount || 0).toString()), 0),
        });
      }
    }
  };

  const generateReferralCode = async () => {
    if (!user) return;

    const code = `FX1-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const { error } = await supabase
      .from('referrals')
      .insert({
        referrer_id: user.id,
        referral_code: code,
      });

    if (error) {
      toast.error('Failed to generate code');
    } else {
      setReferralCode(code);
      toast.success('Referral code generated!');
      loadReferralData(user.id);
    }
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast.success('Referral link copied!');
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => navigate('/')}>
            FX1 Referrals
          </h1>
          <Button3D variant="hero" onClick={() => navigate('/')}>
            Back to Home
          </Button3D>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Gift className="w-10 h-10 text-primary" />
              <h1 className="text-5xl font-bold gradient-text">Invite & Earn</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Earn $FDH by inviting friends to FX1 Digital Hubs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Referrals</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Rewards</p>
                  <p className="text-2xl font-bold">{stats.rewards} $FDH</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-green-500/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Gift className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Per Referral</p>
                  <p className="text-2xl font-bold">10 $FDH</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-card/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">Your Referral Link</h2>
            {referralCode ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={`${window.location.origin}?ref=${referralCode}`}
                    readOnly
                  />
                  <Button3D variant="hero" onClick={copyReferralLink}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button3D>
                </div>
                <p className="text-sm text-muted-foreground">
                  Share this link with friends to earn 10 $FDH for each signup!
                </p>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <p className="text-muted-foreground">
                  Generate your unique referral code to start earning
                </p>
                <Button3D variant="hero" onClick={generateReferralCode}>
                  Generate Referral Code
                </Button3D>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
