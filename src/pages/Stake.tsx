import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button3D } from '@/components/ui/Button3D';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Coins, TrendingUp, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Stake() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [stakeData, setStakeData] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadStakeData(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadStakeData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadStakeData = async (userId: string) => {
    const { data, error } = await supabase
      .from('staking')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error loading stake data:', error);
    } else {
      setStakeData(data);
    }
  };

  const handleStake = async () => {
    if (!user || !amount || parseFloat(amount) <= 0) return;
    
    setLoading(true);
    const stakeAmount = parseFloat(amount);

    const { data: existing } = await supabase
      .from('staking')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('staking')
        .update({
          staked_amount: parseFloat(existing.staked_amount.toString()) + stakeAmount,
        })
        .eq('user_id', user.id);

      if (error) {
        toast.error('Failed to stake');
      } else {
        toast.success(`Staked ${amount} $FDH`);
        loadStakeData(user.id);
        setAmount('');
      }
    } else {
      const { error } = await supabase
        .from('staking')
        .insert({
          staked_amount: stakeAmount,
        } as any);

      if (error) {
        toast.error('Failed to stake');
      } else {
        toast.success(`Staked ${amount} $FDH`);
        loadStakeData(user.id);
        setAmount('');
      }
    }

    setLoading(false);
  };

  const handleClaim = async () => {
    if (!user || !stakeData) return;

    setLoading(true);
    const { error } = await supabase
      .from('staking')
      .update({
        rewards_earned: 0,
        last_claim_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    if (error) {
      toast.error('Failed to claim rewards');
    } else {
      toast.success(`Claimed ${stakeData.rewards_earned} $FDH`);
      loadStakeData(user.id);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => navigate('/')}>
            FX1 Stake
          </h1>
          <Button3D variant="hero" onClick={() => navigate('/')}>
            Back to Home
          </Button3D>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold gradient-text">Stake $FDH</h1>
            <p className="text-xl text-muted-foreground">
              Earn rewards by staking your $FDH tokens
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Staked</p>
                  <p className="text-2xl font-bold">
                    {stakeData?.staked_amount || '0'} $FDH
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Coins className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rewards</p>
                  <p className="text-2xl font-bold">
                    {stakeData?.rewards_earned || '0'} $FDH
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-green-500/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">APR</p>
                  <p className="text-2xl font-bold">12.5%</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-card/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">Stake Tokens</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount ($FDH)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex gap-4">
                <Button3D
                  variant="hero"
                  onClick={handleStake}
                  disabled={loading || !amount}
                  className="flex-1"
                >
                  Stake
                </Button3D>
                <Button3D
                  variant="creator"
                  onClick={handleClaim}
                  disabled={loading || !stakeData?.rewards_earned || parseFloat(stakeData.rewards_earned) <= 0}
                  className="flex-1"
                >
                  Claim Rewards
                </Button3D>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
