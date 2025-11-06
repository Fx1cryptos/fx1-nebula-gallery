// src/components/game/NFTMintCrush.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
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
  Gem,
  Crown,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

// ABI for $FX1_HUBS ERC20 (mintWithFee function)
const FX1_HUBS_ABI = [
  {
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "amount", "type": "uint256" },
      { "name": "feeMultiplier", "type": "uint256" }
    ],
    "name": "mintWithFee",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
] as const;

const FX1_HUBS_CA = "0x24c42adfb620f3835fcb31fbdf3c1773fac76970"; // Your creator coin

interface Tile {
  id: number;
  type: 'shirt' | 'glasses' | 'watch' | 'gem' | 'crown';
  color: string;
  matched: boolean;
  isMintable: boolean;
}

const COLORS = {
  royal: '#1e40af',
  gold: '#fbbf24',
  white: '#ffffff',
  navy: '#172554',
  crown: '#f59e0b'
};

const TILE_TYPES = [
  { type: 'shirt' as const, icon: Shirt, color: COLORS.royal },
  { type: 'glasses' as const, icon: Glasses, color: COLORS.gold },
  { type: 'watch' as const, icon: Watch, color: COLORS.white },
  { type: 'gem' as const, icon: Gem, color: COLORS.navy },
  { type: 'crown' as const, icon: Crown, color: COLORS.crown }
];

export default function NFTMintCrush() {
  const { address, isConnected } = useAccount();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [gameActive, setGameActive] = useState(false);
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [mintableMatches, setMintableMatches] = useState(0);
  const [showWin, setShowWin] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const { writeContract, data: txHash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  // Initialize board with 1-2 mintable crown tiles
  const initializeBoard = useCallback(() => {
    const newTiles: Tile[] = [];
    const types = ['shirt', 'glasses', 'watch', 'gem'];
    let crownCount = 0;

    for (let i = 0; i < 64; i++) {
      let type: Tile['type'];
      let isMintable = false;

      if (crownCount < 2 && Math.random() < 0.03) {
        type = 'crown';
        isMintable = true;
        crownCount++;
      } else {
        type = types[Math.floor(Math.random() * types.length)] as Tile['type'];
      }

      const tileType = TILE_TYPES.find(t => t.type === type)!;
      
      newTiles.push({
        id: i,
        type,
        color: tileType.color,
        matched: false,
        isMintable
      });
    }
    
    setTiles(newTiles);
    setScore(0);
    setTimeLeft(90);
    setMintableMatches(0);
    setShowWin(false);
  }, []);

  // Timer
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
  }, [timeLeft, gameActive]);

  // Handle tx confirmation
  useEffect(() => {
    if (isConfirmed) {
      toast.success(`Minted ${mintableMatches * 100} $FX1_HUBS!`, {
        description: 'Check your wallet',
        duration: 6000
      });
      setIsMinting(false);
    }
  }, [isConfirmed, mintableMatches]);

  const endGame = () => {
    setGameActive(false);
    if (mintableMatches > 0) {
      setShowWin(true);
    }
  };

  const startGame = () => {
    if (!isConnected) {
      toast.error('Connect wallet to play');
      return;
    }
    initializeBoard();
    setGameActive(true);
  };

  const handleTileClick = (tile: Tile) => {
    if (!gameActive || tile.matched) return;

    if (!selectedTile) {
      setSelectedTile(tile);
    } else if (selectedTile.id !== tile.id && selectedTile.type === tile.type) {
      // Match!
      const isMintMatch = tile.isMintable || selectedTile.isMintable;
      
      setTiles(prev => prev.map(t => 
        t.id === selectedTile.id || t.id === tile.id 
          ? { ...t, matched: true }
          : t
      ));
      
      setScore(prev => prev + (isMintMatch ? 500 : 100));
      
      if (isMintMatch) {
        setMintableMatches(prev => prev + 1);
        toast.success('CROWN MATCH! NFT Mint Unlocked!', {
          description: '+500 pts • Mintable!',
          icon: <Crown className="w-5 h-5 text-yellow-400" />
        });
      }
      
      setSelectedTile(null);
    } else {
      setSelectedTile(null);
    }
  };

  const mintNFT = async () => {
    if (!address || mintableMatches === 0) return;
    
    setIsMinting(true);
    
    try {
      const amount = BigInt(mintableMatches * 100 * 10**18); // 100 tokens per match
      const feeMultiplier = BigInt(1); // Default fee multiplier
      
      writeContract({
        address: FX1_HUBS_CA,
        abi: FX1_HUBS_ABI,
        functionName: 'mintWithFee',
        args: [address, amount, feeMultiplier],
        value: BigInt(0) // Payable function, set appropriate value if needed
      });
    } catch (error) {
      toast.error('Mint failed');
      setIsMinting(false);
    }
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gold-400 via-white to-gold-400 bg-clip-text text-transparent">
            NFT Mint Crush
          </h1>
          <p className="text-white/80 mt-2">Match CROWNS → Mint $FX1_HUBS</p>
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
                    <Crown className="w-6 h-6 text-yellow-400" />
                    <span className="text-2xl font-bold text-yellow-400">{mintableMatches}</span>
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
                        "aspect-square rounded-lg flex items-center justify-center transition-all relative overflow-hidden",
                        tile.matched && "opacity-0 scale-0",
                        selectedTile?.id === tile.id && "ring-4 ring-gold-400",
                        tile.isMintable && "ring-2 ring-yellow-400 ring-offset-2 ring-offset-navy-900",
                        !gameActive && "cursor-not-allowed opacity-50"
                      )}
                      style={{ 
                        backgroundColor: tile.matched ? 'transparent' : tile.color,
                      }}
                    >
                      {tile.isMintable && (
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent" />
                      )}
                      <Icon className={cn(
                        "w-6 h-6",
                        tile.type === 'crown' ? "text-yellow-300" : "text-white"
                      )} />
                    </motion.button>
                  );
                })}
              </div>

              {/* Mint Button */}
              {mintableMatches > 0 && !gameActive && (
                <div className="mt-6 text-center">
                  <Button
                    onClick={mintNFT}
                    disabled={isMinting || isConfirming}
                    className="bg-gradient-to-r from-yellow-500 to-gold-600 hover:from-yellow-600 hover:to-gold-700 text-navy-900 font-bold text-lg px-8 py-6"
                  >
                    {isMinting || isConfirming ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Minting {mintableMatches * 100} $FX1_HUBS...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        MINT {mintableMatches * 100} $FX1_HUBS
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Rules & Stats */}
          <div>
            <Card className="bg-navy-800/50 backdrop-blur border-gold-500/20 p-6 h-full">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-gold-400" />
                <h2 className="text-2xl font-bold text-white">How to Mint</h2>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-royal-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Match Any 3 Icons</p>
                    <p className="text-white/70">+100 points per match</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                    <Crown className="w-4 h-4 text-navy-900" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Match CROWNS</p>
                    <p className="text-white/70">+500 pts • Unlocks NFT mint!</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-navy-900 font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">End Game & Mint</p>
                    <p className="text-white/70">100 $FX1_HUBS per CROWN match</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-royal-900/50 to-gold-900/30 rounded-lg">
                <p className="text-sm text-white/80 mb-2">Top Minters Today</p>
                <div className="space-y-1 text-xs">
                  {['0x12..ab', '0x9f..3d', '0x5a..7e'].map((addr, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-white/70">{addr}</span>
                      <span className="text-gold-400 font-bold">{300 - i * 50} $FX1_HUBS</span>
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
                  Mint Unlocked!
                </h2>
                <p className="text-center text-white/80 mb-6">
                  You found {mintableMatches} CROWN{mintableMatches > 1 ? 'S' : ''}!
                </p>
                <div className="bg-gold-900/30 rounded-lg p-4 mb-6">
                  <p className="text-center text-2xl font-bold text-gold-400">
                    +{mintableMatches * 100} $FX1_HUBS
                  </p>
                </div>
                <Button 
                  onClick={mintNFT}
                  disabled={isMinting || isConfirming}
                  className="w-full bg-gradient-to-r from-yellow-500 to-gold-600 hover:from-yellow-600 hover:to-gold-700 text-navy-900 font-bold"
                >
                  {isMinting || isConfirming ? (
                    <>Minting...</>
                  ) : (
                    <>MINT NOW</>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}