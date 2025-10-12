import { useNavigate } from 'react-router-dom';
import { Button3D } from '@/components/ui/Button3D';
import { Card } from '@/components/ui/card';
import { ExternalLink, Coins, Users, Zap, Trophy } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  const links = [
    { name: 'Zora Collection', url: 'https://zora.co/', icon: '🎨' },
    { name: 'Manifold', url: 'https://manifold.xyz/', icon: '⚡' },
    { name: 'Blog', url: '#', icon: '📝' },
  ];

  const features = [
    {
      icon: <Coins className="w-8 h-8" />,
      title: '$FDH Token',
      description: 'Native token on Base chain for staking, rewards, and governance',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Creator Economy',
      description: 'Launch creator coins, NFTs, and build your community',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Wear to Earn',
      description: 'Equip wearable NFTs and earn passive rewards',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Fashion Runway',
      description: 'Weekly competitions with prizes and exclusive mints',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => navigate('/')}>
            About FX1
          </h1>
          <Button3D variant="hero" onClick={() => navigate('/')}>
            Back to Home
          </Button3D>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold gradient-text">FX1 Digital Hubs</h1>
            <p className="text-2xl text-muted-foreground">
              NFT Fashion, Wear-to-Earn & Creator Economy on Base
            </p>
          </div>

          <Card className="p-8 bg-card/80 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              FX1 Digital Hubs is pioneering the convergence of fashion, NFTs, and the creator economy. 
              Built on Base, we're creating a sustainable ecosystem where creators can monetize their work, 
              collectors can earn passive income, and communities can thrive through shared ownership.
            </p>
          </Card>

          <div>
            <h2 className="text-3xl font-bold mb-6 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all">
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-8 bg-card/80 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6">Tokenomics</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex justify-between items-center">
                <span>Total Supply</span>
                <span className="font-bold text-foreground">100,000,000 $FDH</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Network</span>
                <span className="font-bold text-foreground">Base (Layer 2)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Staking APR</span>
                <span className="font-bold text-green-500">12.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Contract Address</span>
                <span className="font-bold text-foreground text-sm">0xFDHTOKENADDRESS...</span>
              </div>
            </div>
          </Card>

          <div>
            <h2 className="text-3xl font-bold mb-6 text-center">Important Links</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {links.map((link, index) => (
                <Button3D
                  key={index}
                  variant="nft"
                  className="w-full h-24 text-lg"
                  onClick={() => window.open(link.url, '_blank')}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-3xl">{link.icon}</span>
                    <span>{link.name}</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </Button3D>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
