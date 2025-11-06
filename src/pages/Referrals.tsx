FX1 Nebula Gallery: $FX1_HUBS Referral System
// Invite Friends → Earn 50 $FX1_HUBS per Valid Referral | Onchain Rewards

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useWriteContract } from 'wagmi';
import { motion } from 'framer-motion';
import { 
  Users, 
  Copy, 
  Gift, 
  TrendingUp, 
  Share2, 
  Zap,
  Crown,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// $FX1_HUBS Contract
const FX1_HUBS_CA = "0x24c42adfb620f3835fcb31fbdf3c1773fac76970" as const;
const FX1_HUBS_ABI = [
  {
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "amount", "type": "uint256" },
      { "name": "referrer", "type": "address" }
    ],
    "name": "mintReferralReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// Reward per valid referral
const REWARD_PER_REF = 50; // $FX1_HUBS

export default function Referrals() {
  const navigate = useNavigate();
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  // State
  const [referralCode, setReferralCode] = useState('');
  const [referrals, setReferrals] = useState<{ address: string; claimed: boolean }[]>([]);
  const [totalEarned, setTotalEarned] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  // Load from localStorage
  useEffect(() => {
    if (address) {
      const saved = localStorage.getItem(`fx1-referral-${address}`);
      if (saved) {
        const data = JSON.parse(saved);
        setReferralCode(data.code || '');
        setReferrals(data.referrals || []);
        setTotalEarned(data.earned || 0);
      } else {
        generateCode();
      }
    }
  }, [address]);

  // Save to localStorage
  const saveState = () => {
    localStorage.setItem(`fx1-referral-${address}`, JSON.stringify({
      code: referralCode,
      referrals,
      earned: totalEarned
    }));
  };

  // Generate Referral Code
  const generateCode = async () => {
    if (!address || isGenerating) return;
    setIsGenerating(true);
    const code = `FX1-${address.slice(2, 8).toUpperCase()}`;
    setReferralCode(code);
    toast.success('Referral code generated!', { description: 'Share to earn $FX1_HUBS' });
    setIsGenerating(false);
    saveState();
  };

  // Copy Referral Link
  const copyLink = () => {
    const link = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast.success('Referral link copied!');
  };

  // Share via Web Share API
  const shareReferral = async () => {
    const link = `${window.location.origin}?ref=${referralCode}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join FX1 Nebula Gallery',
          text: 'Mint $FX1_HUBS, play games, earn NFTs on Base!',
          url: link
        });
      } catch {}
    } else {
      copyLink();
    }
  };

  // Simulate Referral Claim (onchain mint)
  const claimReferral = async (refAddress: string) => {
    if (!address || isClaiming) return;
    setIsClaiming(true);
    try {
      const amount = BigInt(REWARD_PER_REF * 10**18);
      await writeContract({
        address: FX1_HUBS_CA,
        abi: FX1_HUBS_ABI,
        functionName: 'mintReferralReward',
        args: [address, amount, refAddress]
      });
      setReferrals(prev => prev.map(r => 
        r.address === refAddress ? { ...r, claimed: true } : r
      ));
      setTotalEarned(prev => prev + REWARD_PER_REF);
      toast.success(`+${REWARD_PER_REF} $FX1_HUBS minted!`);
      saveState();
    } catch (error) {
      toast.error('Claim failed – Try again');
    } finally {
      setIsClaiming(false);
    }
  };

  // Mock: Add a referral (for demo – in prod, handle via backend)
  const addMockReferral = () => {
    const mockAddr = `0x${Math.random().toString(16).slice(2, 10)}...`;
    setReferrals(prev => [...prev, { address: mockAddr, claimed: false }]);
    saveState();
  };

  const referralLink = `${window.location.origin}?ref=${referralCode}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-royal-900 to-navy-900 p-4">
      {/* Nav */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-white bg-clip-text text-transparent cursor-pointer" onClick={() => navigate('/')}>
            FX1 Referrals
          </h1>
          <Button variant="hero" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        {/* Hero */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <Gift className="w-12 h-12 text-gold-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gold-400 via-white to-gold-400 bg-clip-text text-transparent">
              Invite & Earn
            </h1>
          </div>
          <p className="text-xl text-white/80">
            Earn <strong className="text-gold-400">50 $FX1_HUBS</strong> for every friend who joins and mints
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-royal-600/30 to-navy-600/30 border-royal-500/50">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-royal-600/50 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/70">Total Referrals</p>
                <p className="text-2xl font-bold text-white">{referrals.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-green-500/50">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-600/50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/70">Total Earned</p>
                <p className="text-2xl font-bold text-green-400">{totalEarned} $FX1_HUBS</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-gold-500/30 to-yellow-500/30 border-gold-500/50">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gold-600/50 rounded-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/70">Per Referral</p>
                <p className="text-2xl font-bold text-gold-400">50 $FX1_HUBS</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Referral Link */}
        <Card className="card-royal p-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Your Referral Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={referralLink}
                readOnly
                className="font-mono text-sm"
              />
              <Button onClick={copyLink} className="btn-royal">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button onClick={shareReferral} variant="outline">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-white/70">
              Share this link — when your friend connects wallet and mints, you both earn!
            </p>
          </CardContent>
        </Card>

        {/* Referral List */}
        {referrals.length > 0 && (
          <Card className="card-royal p-6">
            <CardHeader>
              <CardTitle>Your Referrals ({referrals.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {referrals.map((ref, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-4 bg-navy-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-royal-600/50 flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-mono text-sm text-white">{ref.address}</p>
                        <p className="text-xs text-white/60">Joined via your link</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {ref.claimed ? (
                        <Badge className="bg-green-600">Claimed</Badge>
                      ) : (
                        <>
                          <Badge className="bg-gold-900 text-gold-300">
                            +{REWARD_PER_REF} $FX1_HUBS
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => claimReferral(ref.address)}
                            disabled={isClaiming}
                            className="btn-royal"
                          >
                            {isClaiming ? '...' : 'Claim'}
                          </Button>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* How It Works */}
        <Card className="card-royal p-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-gold-400" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                <span>Share your unique <code className="bg-navy-800 px-1 rounded">?ref=FX1-XXXX</code> link</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                <span>Friend clicks, connects wallet, and mints $FX1_HUBS</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                <span>You earn <strong>50 $FX1_HUBS</strong> onchain instantly</span>
              </li>
            </ol>
            <p className="text-xs text-white/60 mt-4">
              *Referral must mint at least 10 $FX1_HUBS to qualify
            </p>
          </CardContent>
        </Card>

        {/* Debug: Add Mock Referral */}
        {process.env.NODE_ENV === 'development' && (
          <Button onClick={addMockReferral} variant="outline" className="w-full">
            [DEV] Add Mock Referral
          </Button>
        )}
      </div>
    </div>
  );
}