import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap, Trophy, Gem } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MintCrush() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-royal-900 to-navy-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-gold-400 to-royal-400 bg-clip-text text-transparent">
            Mint Crush
          </h1>
          <p className="text-xl text-white/80">
            Crush blocks, earn $FX1_HUBS, mint exclusive wearables
          </p>
        </div>

        <Card className="card-royal p-8 text-center">
          <Gem className="w-24 h-24 mx-auto mb-6 text-gold-400 animate-pulse" />
          <h2 className="text-3xl font-bold text-white mb-4">Coming Soon</h2>
          <p className="text-white/70 mb-6">
            Match-3 game with onchain mints. Stake $FX1_HUBS to boost scores.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate('/')} className="btn-royal">
              <Trophy className="w-4 h-4 mr-2" />
              Back to Hub
            </Button>
            <Button variant="outline" onClick={() => navigate('/stake')}>
              <Zap className="w-4 h-4 mr-2" />
              Stake $FX1_HUBS
            </Button>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <Card className="p-6 bg-royal-900/50">
            <Zap className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
            <h3 className="font-bold text-gold-400">Play-to-Mint</h3>
            <p className="text-sm text-white/70">Score → Mint NFTs</p>
          </Card>
          <Card className="p-6 bg-royal-900/50">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-platinum-400" />
            <h3 className="font-bold text-gold-400">Weekly Leaderboard</h3>
            <p className="text-sm text-white/70">Top 10 = Rare Drops</p>
          </Card>
          <Card className="p-6 bg-royal-900/50">
            <Gem className="w-12 h-12 mx-auto mb-3 text-purple-400" />
            <h3 className="font-bold text-gold-400">Stake Boost</h3>
            <p className="text-sm text-white/70">+APY = +Score Multiplier</p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}