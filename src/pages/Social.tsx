import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAccount, useWriteContract } from 'wagmi';
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
import { Avatar } from '@/components/ui/avatar';  // Retained for potential use

// $FX1_HUBS Contract for Reward Minting
const FX1_HUBS_CA = "0x24c42adfb620f3835fcb31fbdf3c1773fac76970" as const;
const FX1_HUBS_ABI = [
  {
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "amount", "type": "uint256" },
      { "name": "taskType", "type": "string" }  // e.g., "social-follow"
    ],
    "name": "mintSocialReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// Social Tasks Configuration
const SOCIAL_TASKS = [
  {
    id: 'x_fx1_hubs',
    title: 'Follow @fx1_hubs on X',
    description: 'Get latest drops & quests',
    url: 'https://x.com/fx1_hubs',
    icon: Twitter,
    reward: 50
  },
  {
    id: 'x_digita_wardrobe',
    title: 'Follow @digita_wardrobe on X',
    description: 'Digital fashion updates',
    url: 'https://x.com/digita_wardrobe',
    icon: Twitter,
    reward: 50
  },
  {
    id: 'farcaster',
    title: 'Follow fx1-hubs on Farcaster',
    description: 'Join the onchain fashion feed',
    url: 'https://warpcast.com/fx1-hubs',
    icon: User,
    reward: 75
  },
  {
    id: 'zora_buy',
    title: 'Buy $FX1_HUBS on Zora',
    description: 'Support the creator coin',
    url: 'https://zora.co/@fx1_hubs',
    icon: Zap,
    reward: 100
  },
  {
    id: 'discord',
    title: 'Join FX1 Discord',
    description: 'Community chats & events',
    url: 'https://discord.gg/vGDSwjeq',
    icon: Users,
    reward: 25
  },
  {
    id: 'telegram',
    title: 'Join FX1 Telegram',
    description: 'Fast updates & alerts',
    url: 'https://t.me/fx1digitalhubs',
    icon: Users,
    reward: 25
  }
] as const;

type TaskId = (typeof SOCIAL_TASKS)[number]['id'];

// Weekly Leaderboard (Mock – Integrate with onchain or API for real-time)
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

export default function Social() {
  const navigate = useNavigate();
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  // State
  const [completedTasks, setCompletedTasks] = useState<Set<TaskId>>(new Set());
  const [totalEarned, setTotalEarned] = useState(0);
  const [weeklyPoints, setWeeklyPoints] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  // Load Completed Tasks from LocalStorage
  useEffect(() => {
    if (address) {
      const saved = localStorage.getItem(`fx1-social-tasks-${address}`);
      if (saved) {
        const parsed = new Set(JSON.parse(saved) as TaskId[]);
        setCompletedTasks(parsed);
        const earned = Array.from(parsed).reduce((sum, id) => {
          const task = SOCIAL_TASKS.find(t => t.id === id);
          return sum + (task ? task.reward : 0);
        }, 0);
        setTotalEarned(earned);
        setWeeklyPoints(earned);  // Mock weekly – Reset via cron or onchain for production
      }
    }
  }, [address]);

  // Save Task Completion
  const saveTask = (id: TaskId) => {
    const newCompleted = new Set(completedTasks);
    newCompleted.add(id);
    localStorage.setItem(`fx1-social-tasks-${address}`, JSON.stringify(Array.from(newCompleted)));
    setCompletedTasks(newCompleted);
    const task = SOCIAL_TASKS.find(t => t.id === id);
    if (task) {
      const reward = task.reward;
      setTotalEarned(prev => prev + reward);
      setWeeklyPoints(prev => prev + reward);
      toast.success(`+${reward} $FX1_HUBS earned!`, {
        description: 'Task complete – Check your wallet',
        duration: 4000
      });
    }
  };

  // Claim Reward (Onchain Mint)
  const claimReward = async (id: TaskId) => {
    if (!address || completedTasks.has(id) || isClaiming) return;
    setIsClaiming(true);
    try {
      const task = SOCIAL_TASKS.find(t => t.id === id);
      if (!task) return;
      const rewardAmount = BigInt(task.reward * 10**18);  // Assuming 18 decimals

      await writeContract({
        address: FX1_HUBS_CA,
        abi: FX1_HUBS_ABI,
        functionName: 'mintSocialReward',
        args: [address, rewardAmount, id]
      });
      saveTask(id);
    } catch (error) {
      toast.error('Claim failed – Check gas or wallet');
    } finally {
      setIsClaiming(false);
    }
  };

  // All Tasks Complete Check
  const allTasksComplete = completedTasks.size === SOCIAL_TASKS.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-royal-900 to-navy-900 p-4">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => navigate('/')}>
            FX1 Social Hub
          </h1>
          <Button variant="hero" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
        {/* Progress Overview */}
        <div className="text-center space-y-2">
          <Progress value={(completedTasks.size / SOCIAL_TASKS.length) * 100} className="w-full max-w-md mx-auto" />
          <p className="text-sm text-white/70">
            {completedTasks.size}/{SOCIAL_TASKS.length} Tasks Complete | Earned: {totalEarned} $FX1_HUBS
          </p>
        </div>

        {/* Tasks List */}
        <div className="grid md:grid-cols-2 gap-6">
          {SOCIAL_TASKS.map((task, index) => (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={cn(
                "card-royal p-6",
                completedTasks.has(task.id) && "border-gold-500 bg-gold-900/20"
              )}>
                <CardHeader className="flex flex-row items-center gap-3 p-0 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-royal-600 to-navy-600">
                    <task.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <CardDescription>{task.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  <Button 
                    onClick={() => window.open(task.url, '_blank')}
                    disabled={completedTasks.has(task.id)}
                    className={cn(
                      "w-full btn-royal",
                      completedTasks.has(task.id) && "bg-green-600 hover:bg-green-700"
                    )}
                  >
                    {completedTasks.has(task.id) ? (
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                    ) : (
                      <Zap className="w-4 h-4 mr-2" />
                    )}
                    {completedTasks.has(task.id) ? 'Completed' : 'Go Now'}
                  </Button>
                  {!completedTasks.has(task.id) && (
                    <Button 
                      onClick={() => claimReward(task.id)}
                      variant="outline"
                      className="w-full"
                      disabled={isClaiming}
                    >
                      Claim {task.reward} $FX1_HUBS
                    </Button>
                  )}
                  <Badge className="badge-gated">+{task.reward} $FX1_HUBS</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bonus on Completion */}
        {allTasksComplete && (
          <motion.div 
            initial={ { scale: 0 } }
            animate={{ scale: 1 }}
            className="text-center max-w-md mx-auto mt-8"
          >
            <Crown className="w-16 h-16 text-gold-400 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-gold-400 mb-2">Quest Legend!</h2>
            <p className="text-white/80 mb-4">All tasks complete – Claim 50 bonus $FX1_HUBS</p>
            <Button className="btn-royal text-lg px-8" onClick={() => claimReward('bonus')}>
              Claim Bonus
            </Button>
          </motion.div>
        )}

        {/* Weekly NFT Leaderboard */}
        <Card className="card-royal">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-gold-400" />
              <div>
                <CardTitle>Weekly NFT Leaderboard</CardTitle>
                <CardDescription>Top 3 earn FREE Base NFTs every Sunday</CardDescription>
              </div>
            </div>
            <Button variant="ghost" onClick={() => setShowLeaderboard(!showLeaderboard)}>
              {showLeaderboard ? 'Hide' : 'View'}
            </Button>
          </CardHeader>
          <CardContent className={cn('space-y-3', !showLeaderboard && 'hidden')}>
            {MOCK_LEADERBOARD.map((entry) => (
              <div key={entry.rank} className="flex items-center justify-between p-3 bg-navy-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className={cn(
                    "w-6 h-6",
                    entry.rank === 1 ? "text-gold-400" : entry.rank === 2 ? "text-gray-400" : "text-bronze-400"
                  )} />
                  <Avatar className="w-8 h-8">
                    <span className="text-xs">{entry.address}</span>
                  </Avatar>
                </div>
                <div className="text-right">
                  <div className="text-gold-400 font-bold">{entry.points} pts</div>
                  <div className="text-sm text-white/70">{entry.nftsEarned} NFTs</div>
                </div>
              </div>
            ))}
            <div className="text-center text-sm text-white/70 mt-4">
              <Calendar className="w-4 h-4 inline mr-1" />
              Resets every Sunday – Your points: {weeklyPoints}
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 bg-gold-900/30 rounded-lg">
                <Crown className="w-6 h-6 text-gold-400 mx-auto mb-1" />
                <p className="font-semibold text-gold-400">1st: Gold NFT + 500 $FX1_HUBS</p>
              </div>
              <div className="text-center p-3 bg-silver-900/30 rounded-lg">
                <Star className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                <p className="font-semibold text-gray-400">2nd: Silver NFT + 300 $FX1_HUBS</p>
              </div>
              <div className="text-center p-3 bg-bronze-900/30 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                <p className="font-semibold text-yellow-600">3rd: Bronze NFT + 200 $FX1_HUBS</p>
              </div>
            </div>
            <p className="text-center text-xs text-white/60 mt-4">
              Points from tasks + daily quests. NFTs are exclusive Base wearables.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}