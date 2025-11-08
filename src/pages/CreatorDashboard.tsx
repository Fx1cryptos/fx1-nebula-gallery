import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import {
  TrendingUp,
  DollarSign,
  Image,
  Users,
  Award,
  Zap,
  ExternalLink,
  Palette,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { fetchUserCollections, type ZoraCollection } from '@/lib/zora';

interface CreatorStats {
  totalMinted: number;
  totalEarnings: string;
  staked: string;
  level: number;
  nftsOwned: number;
  followers: number;
}

export default function CreatorDashboard() {
  const navigate = useNavigate();
  const { address } = useAccount();
  
  const [collections, setCollections] = useState<ZoraCollection[]>([]);
  const [stats, setStats] = useState<CreatorStats>({
    totalMinted: 0,
    totalEarnings: '0',
    staked: '0',
    level: 1,
    nftsOwned: 0,
    followers: 0
  });
  const [loading, setLoading] = useState(true);

  // Load creator data
  useEffect(() => {
    if (address) {
      loadCreatorData();
    }
  }, [address]);

  const loadCreatorData = async () => {
    if (!address) return;
    
    setLoading(true);
    try {
      // Fetch Zora collections
      const userCollections = await fetchUserCollections(address);
      setCollections(userCollections);
      
      // Load stats from localStorage (in prod, use onchain data)
      const savedStats = localStorage.getItem(`fx1-creator-${address}`);
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    } catch (error) {
      toast.error('Failed to load creator data');
    } finally {
      setLoading(false);
    }
  };

  const levelProgress = ((stats.totalMinted % 10) / 10) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-royal-900 to-navy-900 p-4">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-white bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate('/')}
          >
            Creator Dashboard
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/create-art')}>
              <Palette className="w-4 h-4 mr-2" />
              Create Art
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-2"
        >
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-10 h-10 text-gold-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gold-400 via-white to-gold-400 bg-clip-text text-transparent">
              Creator Hub
            </h1>
          </div>
          <p className="text-xl text-white/80">
            Your FX1 Fashion Empire – NFTs, Earnings & Onchain Style
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border-purple-500/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Total Minted</p>
                <p className="text-3xl font-bold text-purple-300">{stats.totalMinted}</p>
                <p className="text-xs text-white/60">NFTs</p>
              </div>
              <Image className="w-12 h-12 text-purple-400" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-green-500/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Total Earnings</p>
                <p className="text-3xl font-bold text-green-300">{stats.totalEarnings}</p>
                <p className="text-xs text-white/60">ETH</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-400" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-gold-500/30 to-yellow-500/30 border-gold-500/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Staked</p>
                <p className="text-3xl font-bold text-gold-300">{stats.staked}</p>
                <p className="text-xs text-white/60">$FX1_HUBS</p>
              </div>
              <Zap className="w-12 h-12 text-gold-400" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-royal-600/30 to-navy-600/30 border-royal-500/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Creator Level</p>
                <p className="text-3xl font-bold text-royal-300">{stats.level}</p>
                <Progress value={levelProgress} className="h-1 mt-2" />
              </div>
              <Award className="w-12 h-12 text-royal-400" />
            </div>
          </Card>
        </div>

        {/* Collections Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gold-400 flex items-center gap-2">
              <Image className="w-8 h-8" />
              My Collections
            </h2>
            <Button onClick={() => navigate('/create-art')} className="btn-royal">
              <Palette className="w-4 h-4 mr-2" />
              Create New
            </Button>
          </div>

          {loading ? (
            <p className="text-center text-white/70 py-12">Loading collections...</p>
          ) : collections.length === 0 ? (
            <Card className="p-12 text-center">
              <Palette className="w-16 h-16 mx-auto mb-4 text-white/50" />
              <h3 className="text-xl font-bold text-white mb-2">No Collections Yet</h3>
              <p className="text-white/70 mb-6">Start creating digital fashion NFTs on Base</p>
              <Button onClick={() => navigate('/create-art')} className="btn-royal">
                Create Your First NFT
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {collections.map((collection, i) => (
                <motion.div
                  key={collection.address}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="overflow-hidden hover:scale-105 transition-transform">
                    <div className="aspect-square bg-gradient-to-br from-royal-900 to-navy-900 relative">
                      {collection.image ? (
                        <img 
                          src={collection.image} 
                          alt={collection.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Image className="w-16 h-16 text-white/30" />
                        </div>
                      )}
                      <Badge className="absolute top-2 right-2 bg-gold-900/90 text-gold-300">
                        {collection.totalSupply} minted
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg text-white mb-1">{collection.name}</h3>
                      <p className="text-sm text-white/70 mb-3 line-clamp-2">
                        {collection.description}
                      </p>
                      {collection.floorPrice && (
                        <p className="text-green-400 font-semibold mb-3">
                          Floor: {collection.floorPrice} ETH
                        </p>
                      )}
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(`https://zora.co/collections/${collection.address}`, '_blank')}
                      >
                        View on Zora
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/stake')}>
            <Zap className="w-12 h-12 text-gold-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Stake Tokens</h3>
            <p className="text-white/70 text-sm">Earn APY & boost mint rewards</p>
          </Card>

          <Card className="p-6 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/referrals')}>
            <Users className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Referrals</h3>
            <p className="text-white/70 text-sm">Invite creators & earn tokens</p>
          </Card>

          <Card className="p-6 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/mint-crush')}>
            <TrendingUp className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Play & Mint</h3>
            <p className="text-white/70 text-sm">Match-3 game with NFT rewards</p>
          </Card>
        </div>
      </div>
    </div>
  );
}