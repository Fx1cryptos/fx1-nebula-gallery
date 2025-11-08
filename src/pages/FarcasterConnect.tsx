import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, CheckCircle2, ExternalLink, Users, MessageSquare, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { 
  getFarcasterUser, 
  shareToFarcaster,
  openFarcasterProfile,
  isFarcasterContext,
  type FarcasterUser 
} from '@/lib/farcaster';

export default function FarcasterConnect() {
  const navigate = useNavigate();
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [castText, setCastText] = useState('');

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    const savedFid = localStorage.getItem('fx1-farcaster-fid');
    if (savedFid) {
      setLoading(true);
      const userData = await getFarcasterUser(parseInt(savedFid));
      if (userData) {
        setUser(userData);
        setConnected(true);
      }
      setLoading(false);
    }
  };

  const connectFarcaster = async () => {
    setLoading(true);
    try {
      // Simulate connection - in prod, integrate with Farcaster Auth
      const mockFid = 123456;
      const userData = await getFarcasterUser(mockFid);
      
      if (userData) {
        setUser(userData);
        setConnected(true);
        localStorage.setItem('fx1-farcaster-fid', userData.fid.toString());
        toast.success(`Welcome, @${userData.username}!`);
      } else {
        toast.error('User not found');
      }
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect');
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    localStorage.removeItem('fx1-farcaster-fid');
    setUser(null);
    setConnected(false);
    toast.success('Disconnected from Farcaster');
  };

  const handleShare = () => {
    if (!castText.trim()) return;
    shareToFarcaster(castText, 'https://fx1-hubs-nebula.onrender.com');
    toast.success('Opening Warpcast composer...');
    setCastText('');
  };

  const followFX1 = () => {
    openFarcasterProfile('fx1_hubs');
    toast.success('Opening @fx1_hubs profile...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-royal-900 to-navy-900 p-4">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate('/')}
          >
            Farcaster Connect
          </h1>
          <Button variant="outline" onClick={() => navigate('/')}>
            Home
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-2xl space-y-8">
        {/* Connection Card */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card className="card-royal p-8">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl">Farcaster Integration</CardTitle>
              <CardDescription className="text-lg">
                Connect your Farcaster identity to unlock social features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!connected ? (
                <>
                  <Button 
                    onClick={connectFarcaster} 
                    disabled={loading}
                    className="w-full btn-royal text-lg py-6"
                  >
                    {loading ? 'Connecting...' : (
                      <>
                        <User className="w-5 h-5 mr-2" />
                        Connect Farcaster
                      </>
                    )}
                  </Button>
                  
                  <p className="text-center text-sm text-white/60">
                    Or{' '}
                    <button 
                      onClick={() => window.open('https://warpcast.com/fx1-hubs', '_blank')}
                      className="text-purple-400 hover:underline"
                    >
                      follow @fx1_hubs on Warpcast
                    </button>
                  </p>
                  
                  <div className="bg-navy-900/50 rounded-lg p-6 space-y-3">
                    <h4 className="font-semibold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      What you get:
                    </h4>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Post casts directly from FX1 MiniApp</li>
                      <li>• Like and comment on fashion NFTs</li>
                      <li>• Follow @fx1_hubs for exclusive drops</li>
                      <li>• Earn bonus $FX1_HUBS for social engagement</li>
                      <li>• Join the onchain fashion community</li>
                    </ul>
                  </div>
                </>
              ) : user ? (
                <>
                  {/* User Profile */}
                  <div className="flex items-center gap-4 p-6 bg-navy-900/50 rounded-lg">
                    <Avatar className="w-16 h-16">
                      {user.pfpUrl ? (
                        <img src={user.pfpUrl} alt={user.username} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-purple-600 flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{user.displayName}</h3>
                      <p className="text-white/70">@{user.username}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-white/60">
                          <Users className="w-4 h-4 inline mr-1" />
                          {user.followerCount} followers
                        </span>
                        <span className="text-white/60">{user.followingCount} following</span>
                      </div>
                    </div>
                    <Badge className="bg-green-600">Connected</Badge>
                  </div>

                  {/* Post Cast */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white">
                      <MessageSquare className="w-4 h-4 inline mr-1" />
                      Share to Warpcast
                    </label>
                    <textarea
                      value={castText}
                      onChange={(e) => setCastText(e.target.value)}
                      placeholder="Share your FX1 NFT experience..."
                      className="w-full p-4 bg-navy-900/50 rounded-lg text-white border border-border focus:border-purple-500 outline-none resize-none"
                      rows={4}
                      maxLength={280}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/60">{castText.length}/280</span>
                      <Button 
                        onClick={handleShare} 
                        disabled={!castText.trim() || loading}
                        className="btn-royal"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share to Warpcast
                      </Button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={followFX1} disabled={loading} variant="outline">
                      Follow @fx1_hubs
                    </Button>
                    <Button onClick={disconnect} variant="destructive">
                      Disconnect
                    </Button>
                  </div>
                </>
              ) : null}
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 bg-purple-900/30 border-purple-500/50">
            <h3 className="font-bold text-white mb-2">Social Rewards</h3>
            <p className="text-sm text-white/70">
              Earn $FX1_HUBS for every cast, like, and follow related to FX1 fashion
            </p>
          </Card>
          <Card className="p-6 bg-indigo-900/30 border-indigo-500/50">
            <h3 className="font-bold text-white mb-2">Exclusive Drops</h3>
            <p className="text-sm text-white/70">
              Farcaster-only NFT airdrops and early access to new collections
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}