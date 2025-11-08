// FX1 Nebula: $FX1_HUBS + $FDH Rewards Hub
// Daily Streak, Wardrobe Boxes, Social Tasks, BaseApp Follow, Weekly NFTs

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useWriteContract } from 'wagmi';
import { motion } from 'framer-motion';
import { 
  Flame, Gift, Trophy, Star, Coins, 
  TrendingUp, Calendar, Award, Users, Zap,
  CheckCircle2, Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

// $FX1_HUBS Contract
const FX1_HUBS_CA = "0x24c42adfb620f3835fcb31fbdf3c1773cac76970" as const;
const FX1_HUBS_ABI = [
  {
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "amount", "type": "uint256" },
      { "name": "task", "type": "string" }
    ],
    "name": "mintReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// BaseApp Follow Task
const BASEAPP_PROFILE = "https://base.app/profile/olamsfx1" as const;
const BASEAPP_REWARD = 25; // $FX1_HUBS

// Mock User Stats (Replace with onchain or localStorage)
interface UserStats {
  totalEarned: number;
  level: number;
  xp: number;
  stylePoints: number;
  streak: number;
  longestStreak: number;
  lastLogin: string;
  boxes: { id: string; type: 'rare' | 'epic' }[];
  recentTasks: { id: string; type: string; reward: number; date: string }[];
}

const MOCK_STATS: UserStats = {
  totalEarned: 1250,
  level: 7,
  xp: 680,
  stylePoints: 420,
  streak: 5,
  longestStreak: 12,
  lastLogin: new Date().toISOString().split('T')[0],
  boxes: [
    { id: '1', type: 'rare' },
    { id: '2', type: 'epic' }
  ],
  recentTasks: [
    { id: '1', type: 'daily-login', reward: 20, date: '2025-11-05' },
    { id: '2', type: 'post', reward: 10, date: '2025-11-05' },
    { id: '3', type: 'follow-baseapp', reward: 25, date: '2025-11-04' }
  ]
};

export default function Rewards() {
  const navigate = useNavigate();
  const { address, chain } = useAccount();
  const { writeContract } = useWriteContract();

  // State
  const [stats, setStats] = useState<UserStats>(MOCK_STATS);
  const [claimedToday, setClaimedToday] = useState(false);
  const [baseAppFollowed, setBaseAppFollowed] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  // Load from localStorage
  useEffect(() => {
    if (address) {
      const saved = localStorage.getItem(`fx1-rewards-${address}`);
      if (saved) {
        const data = JSON.parse(saved);
        setStats(data.stats);
        setClaimedToday(data.claimedToday);
        setBaseAppFollowed(data.baseAppFollowed);
      }
    }
  }, [address]);

  // Save to localStorage
  const saveState = () => {
    localStorage.setItem(`fx1-rewards-${address}`, JSON.stringify({
      stats,
      claimedToday,
      baseAppFollowed
    }));
  };

  // Daily Streak Claim
  const claimDailyReward = async () => {
    if (claimedToday || !address) return;
    const today = new Date().toISOString().split('T')[0];
    const newStreak = stats.streak + 1;
    const reward = Math.min(5 + (newStreak - 1) * 5, 25);

    setIsClaiming(true);
    try {
      const amount = BigInt(reward * 10**18);
      await writeContract({
        address: FX1_HUBS_CA,
        abi: FX1_HUBS_ABI,
        functionName: 'mintReward',
        args: [address as `0x${string}`, amount, 'daily-streak'],
        account: address,
        chain
      });

      const newStats = {
        ...stats,
        streak: newStreak,
        longestStreak: Math.max(newStreak, stats.longestStreak),
        lastLogin: today,
        totalEarned: stats.totalEarned + reward
      };
      if (newStreak === 7) {
        newStats.boxes.push({ id: Date.now().toString(), type: 'rare' });
        toast.success(`Day 7! +${reward} $FX1_HUBS + Rare Wardrobe Box!`);
      } else {
        toast.success(`Day ${newStreak}! +${reward} $FX1_HUBS`);
      }
      setStats(newStats);
      setClaimedToday(true);
      saveState();
    } catch (error) {
      toast.error('Claim failed – Try again');
    } finally {
      setIsClaiming(false);
    }
  };

  // BaseApp Follow Task
  const followBaseApp = async () => {
    if (baseAppFollowed || !address) return;
    window.open(BASEAPP_PROFILE, '_blank');
    setIsClaiming(true);
    try {
      const amount = BigInt(BASEAPP_REWARD * 10**18);
      await writeContract({
        address: FX1_HUBS_CA,
        abi: FX1_HUBS_ABI,
        functionName: 'mintReward',
        args: [address as `0x${string}`, amount, 'follow-baseapp'],
        account: address,
        chain
      });
      setBaseAppFollowed(true);
      setStats(prev => ({
        ...prev,
        totalEarned: prev.totalEarned + BASEAPP_REWARD,
        recentTasks: [{
          id: Date.now().toString(),
          type: 'follow-baseapp',
          reward: BASEAPP_REWARD,
          date: new Date().toISOString().split('T')[0]
        }, ...prev.recentTasks]
      }));
      toast.success(`+${BASEAPP_REWARD} $FX1_HUBS! Thanks for following on BaseApp`);
      saveState();
    } catch (error) {
      toast.error('Claim failed');
    } finally {
      setIsClaiming(false);
    }
  };

  // Open Wardrobe Box
  const openBox = (boxId: string) => {
    setStats(prev => ({
      ...prev,
      boxes: prev.boxes.filter(b => b.id !== boxId)
    }));
    toast.success('Box opened! Check your wardrobe');
    saveState();
  };

  // XP Progress
  const nextLevelXP = stats.level * 100;
  const xpProgress = (stats.xp / nextLevelXP) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-royal-900 to-navy-900 p-4">
      {/* Nav */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-white bg-clip-text text-transparent cursor-pointer" onClick={() => navigate('/')}>
            $FX1_HUBS Rewards
          </h1>
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-7xl space-y-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-royal-600/30 to-navy-600/30 border-royal-500/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Total Earned</p>
                <p className="text-3xl font-bold text-gold-400">{stats.totalEarned}</p>
                <p className="text-xs text-white/60">$FX1_HUBS</p>
              </div>
              <Coins className="w-12 h-12 text-gold-400" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-green-500/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Level</p>
                <p className="text-3xl font-bold text-green-400">{stats.level}</p>
                <Progress value={xpProgress} className="h-1 mt-2 bg-navy-700" />
              </div>
              <TrendingUp className="w-12 h-12 text-green-400" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-500/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Style Points</p>
                <p className="text-3xl font-bold text-purple-400">{stats.stylePoints}</p>
                <p className="text-xs text-white/60">SP</p>
              </div>
              <Star className="w-12 h-12 text-purple-400" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-500/30 to-red-500/30 border-orange-500/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Streak</p>
                <p className="text-3xl font-bold text-orange-400">{stats.streak}</p>
                <p className="text-xs text-white/60">days</p>
              </div>
              <Flame className="w-12 h-12 text-orange-400" />
            </div>
          </Card>
        </div>

        {/* BaseApp Follow Task */}
        <Card className="card-royal p-6">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-royal-600 to-navy-600 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle>Add @fx1_hubs on BaseApp</CardTitle>
              <CardDescription>Follow olamsfx1 for exclusive drops & updates</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-gold-900/50 text-gold-300">+{BASEAPP_REWARD} $FX1_HUBS</Badge>
              {baseAppFollowed && <CheckCircle2 className="w-5 h-5 text-green-400" />}
            </div>
            <Button 
              onClick={followBaseApp}
              disabled={baseAppFollowed || isClaiming}
              className={cn(
                "btn-royal",
                baseAppFollowed && "bg-green-600 hover:bg-green-700"
              )}
            >
              {baseAppFollowed ? (
                <>Completed</>
              ) : (
                <>Follow & Claim</>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Daily Streak */}
        <Card className="p-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Flame className="w-16 h-16 text-orange-500" />
              <div>
                <h2 className="text-3xl font-bold text-white">Daily Streak</h2>
                <p className="text-white/70">
                  Current: {stats.streak} days | Best: {stats.longestStreak}
                </p>
                <div className="flex space-x-2 mt-3">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div
                      key={day}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                        stats.streak >= day
                          ? 'bg-orange-500 text-white'
                          : 'bg-navy-800 text-white/50 border border-white/20'
                      )}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-gold-400 mb-2">
                +{Math.min(5 + stats.streak * 5, 25)}
              </p>
              <p className="text-sm text-white/70 mb-4">$FX1_HUBS Today</p>
              <Button 
                onClick={claimDailyReward}
                disabled={claimedToday || isClaiming}
                className="btn-royal text-lg px-8"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {claimedToday ? 'Claimed' : 'Claim Now'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Wardrobe Boxes */}
        {stats.boxes.length > 0 && (
          <Card className="card-royal p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gold-400">
              <Gift className="w-6 h-6 mr-2" />
              Wardrobe Boxes ({stats.boxes.length})
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              {stats.boxes.map((box) => (
                <motion.div
                  key={box.id}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <Card className="p-6 bg-gradient-to-br from-royal-900 to-navy-900 border-gold-500/50">
                    <Gift className="w-16 h-16 mx-auto mb-4 text-gold-400" />
                    <Badge className="mb-4 bg-gold-900 text-gold-300">{box.type}</Badge>
                    <Button 
                      onClick={() => openBox(box.id)}
                      className="w-full btn-royal"
                    >
                      Open
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        )}

        {/* Recent Activity */}
        <Card className="card-royal p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-gold-400">
            <Award className="w-6 h-6 mr-2" />
            Recent Rewards
          </h2>
          <div className="space-y-3">
            {stats.recentTasks.slice(0, 10).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-navy-800/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {task.type === 'follow-baseapp' ? (
                    <Users className="w-5 h-5 text-royal-400" />
                  ) : task.type === 'daily-login' ? (
                    <Flame className="w-5 h-5 text-orange-400" />
                  ) : (
                    <Trophy className="w-5 h-5 text-gold-400" />
                  )}
                  <span className="capitalize text-white">{task.type.replace('-', ' ')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-green-400">+{task.reward}</span>
                  <span className="text-sm text-white/70">$FX1_HUBS</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}