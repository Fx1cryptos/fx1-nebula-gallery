import { useNavigate } from 'react-router-dom';
import { Button3D } from '@/components/ui/Button3D';
import { ZoraEmbed } from '@/components/ZoraEmbed';
import { Card } from '@/components/ui/card';
import { ExternalLink, TrendingUp } from 'lucide-react';

export default function Trade() {
  const navigate = useNavigate();

  const collections = [
    {
      name: 'FX1 Creator Coins',
      url: 'https://zora.co/collect/base:0x...',
      description: 'Trade creator economy tokens',
    },
    {
      name: 'FX1 Fashion NFTs',
      url: 'https://zora.co/collect/base:0x...',
      description: 'Exclusive fashion wearables',
    },
  ];

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
              Trade NFTs and creator coins on Zora
            </p>
          </div>

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
        </div>
      </div>
    </div>
  );
}
