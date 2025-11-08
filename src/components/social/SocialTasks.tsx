// FX1 Nebula Gallery: Social Quest Hub
// Earn $FX1_HUBS by Following, Joining, & Engaging | Weekly NFT Leaderboard

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useWriteContract } from 'wagmi';
import { 
  Twitter, 
  User, 
  Users, 
  Zap, 
  Trophy, 
  Crown, 
  Star, 
  Calendar, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

// $FX1_HUBS Contract (for reward minting)
const FX1_HUBS_CA = "0x24c42adfb620f3835fcb31fbdf3c1773fac76970" as const;
const FX1_HUBS_ABI = [
  {
    name: 'mintReward',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'proof', type: 'string' }  // Social proof (e.g., "twitter-follow")
    ],
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

// Social Links
const SOCIAL_LINKS = {
  x1: 'https://x.com/fx1_hubs',
  x2: 'https://x.com/digita_wardrobe',
  farcaster: 'https://warpcast.com/fx1-hubs',
  zora: 'https://zora.co/@fx1_hubs',
  discord: 'https://discord.gg/vGDSwjeq',
  telegram: 'https://t.me/fx1digitalhubs'
} as const;

// Rewards (in $FX1_HUBS tokens)
const TASK_REWARDS = {
  x1: 50,
  x2: 50,
  farcaster: 75,
  zora: 100,
  discord: 25,
  telegram: 25
} as const;

// Leaderboard (mock – replace with Supabase or onchain)
interface LeaderboardEntry {
  rank: number;
  address: string;
  points: number;
  nftsEarned: number;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, address: '0x5f18...a620', points: 450, nftsEarned: 2 },
  { rank: 2, address: '0x9a2f...3d8e', points: 320, nftsEarned: 1 },
  { rank: 3, address: '0x3d8e...7e5f', points: 280, nftsEarned: 1 }
];

export default function SocialTasks() {
  const { address, chain } = useAccount();
  const { writeContract } = useWriteContract();

  // State
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [totalEarned, setTotalEarned] = useState(0);
  const [weeklyPoints, setWeeklyPoints] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  // Load completed tasks from localStorage
  useEffect(() => {
    if (address) {
      const saved = localStorage.getItem(`fx1-social-tasks-${address}`);
      if (saved) {
        const parsed = JSON.parse(saved) as Set<string>;
        setCompletedTasks(parsed);
        const earned = Array.from(parsed).reduce((sum, task) => sum + (TASK_REWARDS[task as keyof typeof TASK_REWARDS] || 0), 0);
        setTotalEarned(earned);
        setWeeklyPoints(earned);  // Mock weekly – reset via cron or onchain
      }
    }
  }, [address]);

  // Save to localStorage
  const saveTask = (task: string) => {
    const newCompleted = new Set(completedTasks);
    newCompleted.add(task);
    localStorage.setItem(`fx1-social-tasks-${address}`, JSON.stringify(Array.from(newCompleted)));
    setCompletedTasks(newCompleted);
    const reward = TASK_REWARDS[task as keyof typeof TASK_REWARDS];
    setTotalEarned(prev => prev + reward);
    setWeeklyPoints(prev => prev + reward);
    toast.success(`+${reward} $FX1_HUBS earned!`, {
      description: 'Check your wallet',
      duration: 4000
    });
  };

  // Claim Reward (onchain mint)
  const claimReward = async (task: string) => {
    if (!address || completedTasks.has(task) || isClaiming) return;
    setIsClaiming(true);
    try {
      const rewardAmount = BigInt(TASK_REWARDS[task as keyof typeof TASK_REWARDS] * 10**18);
      await writeContract({
        address: FX1_HUBS_CA,
        abi: FX1_HUBS_ABI,
        functionName: 'mintReward',
        args: [address as `0x${string}`, rewardAmount, task],
        account: address,
        chain
      });
      saveTask(task);
    } catch (error) {
      toast.error('Claim failed – try again or check gas');
    } finally {
      setIsClaiming(false);
    }
  };

  // Check if all tasks complete
  const allTasksComplete = completedTasks.size === Object.keys(TASK_REWARDS).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-royal-900 to-navy-900 p-4 space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gold-400 via-white to-gold-400 bg-clip-text text-transparent mb-2">
          FX1 Social Quests
        </h1>
        <p className="text-white/80 text-lg">Follow, Join, Earn $FX1_HUBS • Weekly NFT Drops</p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <Badge variant="secondary" className="bg-gold-900/50 text-gold-300">
            Total Earned: {totalEarned} $FX1_HUBS
          </Badge>
          <Badge variant="outline" className="border-gold-500 text-gold-400">
            Weekly Points: {weeklyPoints}
          </Badge>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto">
        <Progress value={(completedTasks.size / Object.keys(TASK_REWARDS).length) * 100} className="w-full" />
        <p className="text-sm text-white/70 text-center mt-2">
          {completedTasks.size}/{Object.keys(TASK_REWARDS).length} Tasks Complete
        </p>
      </div>

      {/* Tasks Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* X Follow 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={cn(
            "card-royal p-6",
            completedTasks.has('x1') && "border-gold-500 bg-gold-900/20"
          )}>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-royal-600 to-navy-600 rounded-lg">
                <Twitter className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Follow @fx1_hubs on X</CardTitle>
                <CardDescription>Get latest drops & quests</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <Button 
                onClick={() => window.open(SOCIAL_LINKS.x1, '_blank')}
                disabled={completedTasks.has('x1')}
                className={cn(
                  "w-full btn-royal",
                  completedTasks.has('x1') && "bg-green-600 hover:bg-green-700"
                )}
              >
                {completedTasks.has('x1') ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <Zap className="w-4 h-4 mr-2" />
                )}
                {completedTasks.has('x1') ? 'Completed' : 'Follow Now'}
              </Button>
              {!completedTasks.has('x1') && (
                <Button 
                  onClick={() => claimReward('x1')}
                  variant="outline"
                  className="w-full"
                  disabled={isClaiming}
                >
                  Claim {TASK_REWARDS.x1} $FX1_HUBS
                </Button>
              )}
              <Badge className="badge-gated">+{TASK_REWARDS.x1} $FX1_HUBS</Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* X Follow 2 */}
        <motion.div 
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className={cn(
            "card-royal p-6",
            completedTasks.has('x2') && "border-gold-500 bg-gold-900/20"
          )}>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-royal-600 to-navy-600 rounded-lg">
                <Twitter className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Follow @digita_wardrobe on X</CardTitle>
                <CardDescription>Digital fashion updates</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <Button 
                onClick={() => window.open(SOCIAL_LINKS.x2, '_blank')}
                disabled={completedTasks.has('x2')}
                className={cn(
                  "w-full btn-royal",
                  completedTasks.has('x2') && "bg-green-600 hover:bg-green-700"
                )}
              >
                {completedTasks.has('x2') ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <Zap className="w-4 h-4 mr-2" />
                )}
                {completedTasks.has('x2') ? 'Completed' : 'Follow Now'}
              </Button>
              {!completedTasks.has('x2') && (
                <Button 
                  onClick={() => claimReward('x2')}
                  variant="outline"
                  className="w-full"
                  disabled={isClaiming}
                >
                  Claim {TASK_REWARDS.x2} $FX1_HUBS
                </Button>
              )}
              <Badge className="badge-gated">+{TASK_REWARDS.x2} $FX1_HUBS</Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* Farcaster Follow */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className={cn(
            "card-royal p-6",
            completedTasks.has('farcaster') && "border-gold-500 bg-gold-900/20"
          )}>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Follow fx1-hubs on Farcaster</CardTitle>
                <CardDescription>Join the onchain fashion feed</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <Button 
                onClick={() => window.open(SOCIAL_LINKS.farcaster, '_blank')}
                disabled={completedTasks.has('farcaster')}
                className={cn(
                  "w-full btn-royal",
                  completedTasks.has('farcaster') && "bg-green-600 hover:bg-green-700"
                )}
              >
                {completedTasks.has('farcaster') ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <Zap className="w-4 h-4 mr-2" />
                )}
                {completedTasks.has('farcaster') ? 'Completed' : 'Follow Now'}
              </Button>
              {!completedTasks.has('farcaster') && (
                <Button 
                  onClick={() => claimReward('farcaster')}
                  variant="outline"
                  className="w-full"
                  disabled={isClaiming}
                >
                  Claim {TASK_REWARDS.farcaster} $FX1_HUBS
                </Button>
              )}
              <Badge className="badge-gated">+{TASK_REWARDS.farcaster} $FX1_HUBS</Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* Zora Buy */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className={cn(
            "card-royal p-6",
            completedTasks.has('zora') && "border-gold-500 bg-gold-900/20"
          )}>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Buy $FX1_HUBS on Zora</CardTitle>
                <CardDescription>Support the creator coin</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <Button 
                onClick={() => window.open(SOCIAL_LINKS.zora, '_blank')}
                disabled={completedTasks.has('zora')}
                className={cn(
                  "w-full btn-royal",
                  completedTasks.has('zora') && "bg-green-600 hover:bg-green-700"
                )}
              >
                {completedTasks.has('zora') ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <Zap className="w-4 h-4 mr-2" />
                )}
                {completedTasks.has('zora') ? 'Completed' : 'Buy Now'}
              </Button>
              {!completedTasks.has('zora') && (
                <Button 
                  onClick={() => claimReward('zora')}
                  variant="outline"
                  className="w-full"
                  disabled={isClaiming}
                >
                  Claim {TASK_REWARDS.zora} $FX1_HUBS
                </Button>
              )}
              <Badge className="badge-gated">+{TASK_REWARDS.zora} $FX1_HUBS</Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* Discord Join */}
        <motion.div 
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className={cn(
            "card-royal p-6",
            completedTasks.has('discord') && "border-gold-500 bg-gold-900/20"
          )}>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Join FX1 Discord</CardTitle>
                <CardDescription>Community chats & events</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <Button 
                onClick={() => window.open(SOCIAL_LINKS.discord, '_blank')}
                disabled={completedTasks.has('discord')}
                className={cn(
                  "w-full btn-royal",
                  completedTasks.has('discord') && "bg-green-600 hover:bg-green-700"
                )}
              >
                {completedTasks.has('discord') ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <Zap className="w-4 h-4 mr-2" />
                )}
                {completedTasks.has('discord') ? 'Joined' : 'Join Now'}
              </Button>
              {!completedTasks.has('discord') && (
                <Button 
                  onClick={() => claimReward('discord')}
                  variant="outline"
                  className="w-full"
                  disabled={isClaiming}
                >
                  Claim {TASK_REWARDS.discord} $FX1_HUBS
                </Button>
              )}
              <Badge className="badge-gated">+{TASK_REWARDS.discord} $FX1_HUBS</Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* Telegram Join */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className={cn(
            "card-royal p-6",
            completedTasks.has('telegram') && "border-gold-500 bg-gold-900/20"
          )}>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Join FX1 Telegram</CardTitle>
                <CardDescription>Fast updates & alerts</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <Button 
                onClick={() => window.open(SOCIAL_LINKS.telegram, '_blank')}
                disabled={completedTasks.has('telegram')}
                className={cn(
                  "w-full btn-royal",
                  completedTasks.has('telegram') && "bg-green-600 hover:bg-green-700"
                )}
              >
                {completedTasks.has('telegram') ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <Zap className="w-4 h-4 mr-2" />
                )}
                {completedTasks.has('telegram') ? 'Joined' : 'Join Now'}
              </Button>
              {!completedTasks.has('telegram') && (
                <Button 
                  onClick={() => claimReward('telegram')}
                  variant="outline"
                  className="w-full"
                  disabled={isClaiming}
                >
                  Claim {TASK_REWARDS.telegram} $FX1_HUBS
                </Button>
              )}
              <Badge className="badge-gated">+{TASK_REWARDS.telegram} $FX1_HUBS</Badge>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* All Complete Bonus */}
      {allTasksComplete && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center max-w-md mx-auto mt-8"
        >
          <Crown className="w-16 h-16 text-gold-400 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold text-gold-400 mb-2">Quest Master!</h2>
          <p className="text-white/80 mb-4">All tasks complete – +50 bonus $FX1_HUBS incoming</p>
          <Button className="btn-royal text-lg px-8" onClick={() => claimReward('bonus')}>
            Claim Bonus
          </Button>
        </motion.div>
      )}

      {/* Weekly Leaderboard */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto mt-12"
      >
        <Card className="card-royal">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-gold-400" />
              <div>
                <CardTitle>Weekly NFT Leaderboard</CardTitle>
                <CardDescription>Top 3 earn FREE Base NFTs every Sunday!</CardDescription>
              </div>
            </div>
            <Button variant="ghost" onClick={() => setShowLeaderboard(!showLeaderboard)}>
              {showLeaderboard ? 'Hide' : 'View'}
            </Button>
          </CardHeader>
          <CardContent className={!showLeaderboard ? 'hidden' : ''}>
            <div className="space-y-3">
              {MOCK_LEADERBOARD.map((entry, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-navy-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Star className={cn(
                      "w-6 h-6",
                      i === 0 ? "text-gold-400" : i === 1 ? "text-gray-400" : "text-bronze-400"
                    )} />
                    <span className="font-bold text-white">{entry.address}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-gold-400 font-bold">{entry.points} pts</div>
                    <div className="text-sm text-white/70">{entry.nftsEarned} NFTs</div>
                  </div>
                </div>
              ))}
              <div className="text-center text-sm text-white/70 mt-4">
                <Calendar className="w-4 h-4 inline mr-1" />
                Resets every Sunday – Your rank: #{Math.floor(Math.random() * 10) + 1}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* How It Works */}
      <Card className="card-royal max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">How Weekly NFTs Work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-white/80">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-gold-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <Crown className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Top 1st</h3>
              <p>Exclusive Crown NFT + 500 $FX1_HUBS</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-silver-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">2nd Place</h3>
              <p>Silver Edition NFT + 300 $FX1_HUBS</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-bronze-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-white mb-1">3rd Place</h3>
              <p>Bronze Edition NFT + 200 $FX1_HUBS</p>
            </div>
          </div>
          <div className="text-center mt-6 p-4 bg-royal-900/30 rounded-lg">
            <p className="text-gold-400 font-semibold">Points = Tasks Completed + Daily Quests</p>
            <p className="text-white/70 text-xs mt-1">NFTs minted on Base – Collectible fashion wearables</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}