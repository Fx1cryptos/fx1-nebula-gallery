import { useNavigate } from 'react-router-dom';
import { Button3D } from '@/components/ui/Button3D';
import { ZoraEmbed } from '@/components/ZoraEmbed';
import { Card } from '@/components/ui/card';
import { ExternalLink, TrendingUp, Twitter, Image } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Trade() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [tweets, setTweets] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);

  // FX1 Token on Base
  const mainTokenAddress = '0x1f85705d939Bb6Fa1AEbE99d7105AdCee75CE380';

  const collections = [
    {
      name: 'FX1 Token',
      address: mainTokenAddress,
      url: `https://zora.co/collect/base:${mainTokenAddress}`,
      description: 'Official FX1 token on Base chain',
    },
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      
      // Fetch Zora data
      try {
        const { data, error } = await supabase.functions.invoke('fetch-zora-nfts', {
          body: { contractAddress: mainTokenAddress }
        });
        if (error) throw error;
        console.log('Zora data:', data);
      } catch (error) {
        console.error('Error fetching Zora data:', error);
      }

      // Fetch Twitter feed
      try {
        const { data, error } = await supabase.functions.invoke('fetch-twitter-feed');
        if (error) throw error;
        setTweets(data?.data || []);
      } catch (error) {
        console.error('Error fetching Twitter feed:', error);
        toast({
          title: 'Error',
          description: 'Failed to load Twitter feed',
          variant: 'destructive',
        });
      }

      // Fetch OpenSea NFTs
      try {
        const { data, error } = await supabase.functions.invoke('fetch-opensea-nfts', {
          body: { walletAddress: '0x17af2b27d43fa612aab0698214ef2c44b08845ee' }
        });
        if (error) throw error;
        setNfts(data?.nfts || []);
      } catch (error) {
        console.error('Error fetching OpenSea NFTs:', error);
        toast({
          title: 'Error',
          description: 'Failed to load OpenSea NFTs',
          variant: 'destructive',
        });
      }

      setIsLoading(false);
    };

    fetchAllData();
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => navigate('/')}>
            FX1 Trade
          </h1>
          <Button3D variant="hero" onClick={() => navigate('/')}>
            Back to Home
          </Button3D>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <TrendingUp className="w-10 h-10 text-primary" />
              <h1 className="text-5xl font-bold gradient-text">Creator Market</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Trade NFTs, view Twitter feed, and explore OpenSea collections
            </p>
          </div>

          <Tabs defaultValue="zora" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="zora">Zora Collections</TabsTrigger>
              <TabsTrigger value="twitter">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter Feed
              </TabsTrigger>
              <TabsTrigger value="opensea">
                <Image className="w-4 h-4 mr-2" />
                OpenSea NFTs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="zora" className="space-y-8 mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                {collections.map((collection, index) => (
                  <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">{collection.name}</h3>
                      <p className="text-muted-foreground">{collection.description}</p>
                    </div>
                    <ZoraEmbed collectionUrl={collection.url} />
                    <Button3D
                      variant="hero"
                      className="w-full"
                      onClick={() => window.open(collection.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Trade on Zora
                    </Button3D>
                  </Card>
                ))}
              </div>

              <Card className="p-8 bg-gradient-primary text-white">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold">Launch Your Creator Coin</h2>
                  <p className="text-lg opacity-90">
                    Join the FX1 creator economy and mint your own tradeable tokens
                  </p>
                  <Button3D variant="wallet" className="mt-4">
                    Apply Now
                  </Button3D>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="twitter" className="space-y-6 mt-8">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading tweets...</p>
                </div>
              ) : tweets.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tweets found</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {tweets.map((tweet: any) => (
                    <Card key={tweet.id} className="p-6 bg-card/80 backdrop-blur-sm">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Twitter className="w-8 h-8 text-primary" />
                            <div>
                              <p className="font-semibold">@FX1_CRYPTO</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(tweet.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Button3D
                            variant="social"
                            size="sm"
                            onClick={() => window.open(`https://twitter.com/i/web/status/${tweet.id}`, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button3D>
                        </div>
                        <p className="text-foreground whitespace-pre-wrap">{tweet.text}</p>
                        {tweet.public_metrics && (
                          <div className="flex space-x-6 text-sm text-muted-foreground">
                            <span>❤️ {tweet.public_metrics.like_count}</span>
                            <span>🔁 {tweet.public_metrics.retweet_count}</span>
                            <span>💬 {tweet.public_metrics.reply_count}</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="opensea" className="space-y-6 mt-8">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading NFTs...</p>
                </div>
              ) : nfts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No NFTs found</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {nfts.slice(0, 12).map((nft: any, index: number) => (
                    <Card key={index} className="p-4 bg-card/80 backdrop-blur-sm space-y-3">
                      {nft.image_url && (
                        <img 
                          src={nft.image_url} 
                          alt={nft.name || 'NFT'} 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                      <div className="space-y-2">
                        <h3 className="font-bold truncate">{nft.name || 'Unnamed NFT'}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {nft.collection || 'Unknown Collection'}
                        </p>
                        {nft.permalink && (
                          <Button3D
                            variant="nft"
                            size="sm"
                            className="w-full"
                            onClick={() => window.open(nft.permalink, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View on OpenSea
                          </Button3D>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
