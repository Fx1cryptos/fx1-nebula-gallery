// src/components/tasks/FashionArtCrush.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { format } from 'date-fns';
import { 
  Zap, 
  Trophy, 
  Timer, 
  Coins, 
  Sparkles,
  Shirt,
  Glasses,
  Watch,
  Gem
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

// Types
interface Tile {
  id: number;
  type: 'shirt' | 'glasses' | 'watch' | 'gem';
  color: string;
  matched: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  type: 'social' | 'web3';
}

const COLORS = {
  royal: '#1e40af',
  gold: '#fbbf24',
  white: '#ffffff',
  navy: '#172554'
};

const TILE_TYPES = [
  { type: 'shirt' as const, icon: Shirt, color: COLORS.royal },
  { type: 'glasses' as const, icon: Glasses, color: COLORS.gold },
  { type: 'watch' as const, icon: Watch, color: COLORS.white },
  { type: 'gem' as const, icon: Gem, color: COLORS.navy }
];

// Mock user tasks (replace with Supabase/Zora API)
const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Follow @fx1_hubs on X',
    description: 'Stay updated with latest fashion drops',
    reward: 50,
    completed: false,
    type: 'social'
  },
  {
    id: '2',
    title: 'Mint 1 FX1 NFT',
    description: 'Join the digital wardrobe revolution',
    reward: 200,
    completed: false,
    type: 'web3'
  },
  {
    id: '3',
    title: 'Stake $FX1_HUBS',
    description: 'Lock tokens in FX1 Flux Vault',
    reward: 150,
    completed: false,
    type: 'web3'
  }
];

export default function FashionArtCrush() {
  const { address } = useAccount();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [showWin, setShowWin] = useState(false);

  // Initialize game board
  const initializeBoard = useCallback(() => {
    const newTiles: Tile[] = [];
    const types = ['shirt', 'glasses', 'watch', 'gem'];
    
    for (let i = 0; i < 64; i++) {
      const type = types[Math.floor(Math.random() * types.length)] as Tile['type'];
      const tileType = TILE_TYPES.find(t => t.type === type)!;
      
      newTiles.push({
        id: i,
        type,
        color: tileType.color,
        matched: false
      });
    }
    
    setTiles(newTiles);
    setScore(0);
    setTimeLeft(60);
    setShowWin(false);
  }, []);

  // Game timer
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
  }, [timeLeft, gameActive]);

  const endGame = () => {
    setGameActive(false);
    if (score >= 1000) {
      setShowWin(true);
      claimReward(Math.floor(score / 10));
    }
  };

  const startGame = () => {
    initializeBoard();
    setGameActive(true);
  };

  const handleTileClick = (tile: Tile) => {
    if (!gameActive || tile.matched) return;

    if (!selectedTile) {
      setSelectedTile(tile);
    } else if (selectedTile.id !== tile.id && selectedTile.type === tile.type) {
      // Match found!
      setTiles(prev => prev.map(t => 
        t.id === selectedTile.id || t.id === tile.id 
          ? { ...t, matched: true }
          : t
      ));
      setScore(prev => prev + 100);
      setSelectedTile(null);
      
      toast.success('Match! +100 points', {
        description: `${tile.type} combo completed`
      });
    } else {
      setSelectedTile(null);
    }
  };

  const completeTask = async (taskId: string) => {
    // In real app: verify on-chain/social proof
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      claimReward(task.reward);
    }
  };

  const claimReward = async (amount: number) => {
    // Mock reward - replace with actual token transfer
    toast.success(`🎉 ${amount} $FX1_HUBS earned!`, {
      description: 'Rewards added to your wallet',
      duration: 5000
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-royal-900 to-navy-900 p-4">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gold-400 to-white bg-clip-text text-transparent">
            FX1 Fashion Art Crush
          </h1>
          <p className="text-white/80 mt-2">Match fashion icons • Earn $FX1_HUBS</p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <Card className="bg-navy-800/50 backdrop-blur border-gold-500/20 p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-gold-400" />
                    <span className="text-2xl font-bold text-white">{score}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="w-6 h-6 text-royal-400" />
                    <span className="text-2xl font-bold text-white">
                      {format(new Date(timeLeft * 1000), 'mm:ss')}
                    </span>
                  </div>
                </div>
                
                {!gameActive ? (
                  <Button 
                    onClick={startGame}
                    className="bg-gradient-to-r from-royal-600 to-gold-600 hover:from-royal-700 hover:to-gold-700"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Start Game
                  </Button>
                ) : (
                  <Button 
                    onClick={endGame}
                    variant="destructive"
                  >
                    End Game
                  </Button>
                )}
              </div>

              {/* Game Grid */}
              <div className="grid grid-cols-8 gap-1 p-4 bg-navy-900/50 rounded-xl">
                {tiles.map((tile) => {
                  const Icon = TILE_TYPES.find(t => t.type === tile.type)!.icon;
                  return (
                    <motion.button
                      key={tile.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTileClick(tile)}
                      disabled={!gameActive || tile.matched}
                      className={cn(
                        "aspect-square rounded-lg flex items-center justify-center transition-all",
                        tile.matched && "opacity-0 scale-0",
                        selectedTile?.id === tile.id && "ring-4 ring-gold-400",
                        !gameActive && "cursor-not-allowed opacity-50"
                      )}
                      style={{ 
                        backgroundColor: tile.matched ? 'transparent' : tile.color,
                        opacity: tile.matched ? 0 : 1
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Tasks Panel */}
          <div>
            <Card className="bg-navy-800/50 backdrop-blur border-gold-500/20 p-6 h-full">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-gold-400" />
                <h2 className="text-2xl font-bold text-white">Earn $FX1_HUBS</h2>
              </div>

              <div className="space-y-4">
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: tasks.indexOf(task) * 0.1 }}
                  >
                    <Card className={cn(
                      "p-4 border",
                      task.completed 
                        ? "bg-gold-900/20 border-gold-500/50" 
                        : "bg-navy-900/50 border-royal-500/30"
                    )}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white flex items-center gap-2">
                            {task.type === 'social' ? '🌐' : '⛓️'} {task.title}
                          </h3>
                          <p className="text-sm text-white/70 mt-1">{task.description}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Coins className="w-5 h-5 text-gold-400" />
                          <span className="font-bold text-gold-400">{task.reward}</span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => completeTask(task.id)}
                        disabled={task.completed}
                        className={cn(
                          "mt-3 w-full",
                          task.completed 
                            ? "bg-gold-600/20 text-gold-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-royal-600 to-gold-600"
                        )}
                      >
                        {task.completed ? '✓ Completed' : 'Complete Task'}
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Leaderboard Preview */}
              <div className="mt-6 p-4 bg-royal-900/30 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Top Stylists</h3>
                <div className="space-y-2 text-sm">
                  {[1, 2, 3].map((rank) => (
                    <div key={rank} className="flex items-center justify-between">
                      <span className="text-white/80">Player {rank}</span>
                      <span className="text-gold-400 font-bold">{1500 - rank * 100} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Win Modal */}
        <AnimatePresence>
          {showWin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-gradient-to-br from-royal-900 to-navy-900 p-8 rounded-2xl border-2 border-gold-500 max-w-md w-full"
              >
                <Trophy className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-center text-white mb-2">
                  Fashion Champion!
                </h2>
                <p className="text-center text-white/80 mb-6">
                  You crushed {Math.floor(score / 100)} matches in 60 seconds!
                </p>
                <div className="bg-gold-900/30 rounded-lg p-4 mb-6">
                  <p className="text-center text-2xl font-bold text-gold-400">
                    +{Math.floor(score / 10)} $FX1_HUBS
                  </p>
                </div>
                <Button 
                  onClick={() => setShowWin(false)}
                  className="w-full bg-gradient-to-r from-royal-600 to-gold-600"
                >
                  Play Again
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}