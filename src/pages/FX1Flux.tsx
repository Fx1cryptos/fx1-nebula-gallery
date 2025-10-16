import { Button3D } from "@/components/ui/Button3D";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SocialLinks } from "@/components/SocialLinks";
import { Bot, Sparkles, Zap, Brain, MessageSquare, Palette, Github, ExternalLink, Blocks, Users, Flame } from "lucide-react";
import { Link } from "react-router-dom";

const FX1Flux = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-primary/5">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="/fx1-logo.png" alt="FX1 Digital Hubs" className="h-12" />
          </Link>
          <Link to="/">
            <Button3D variant="wallet">Back to Home</Button3D>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6">
            <Bot className="w-16 h-16 text-primary animate-pulse" />
            <Sparkles className="w-8 h-8 text-accent animate-bounce" />
          </div>
          
          <div className="flex gap-2 justify-center mb-4">
            <Badge className="bg-primary/20 text-primary border-primary/30">Farcaster MiniApp</Badge>
            <Badge className="bg-accent/20 text-accent border-accent/30">Base Chain</Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">3D Experience</Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            FX1 HUBS MiniApp
          </h1>
          
          <p className="text-2xl font-semibold text-foreground mb-4">
            Styling the Blockchain. Designing the Future.
          </p>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A 3D-powered Farcaster experience connecting fashion, NFTs, and social culture. 
            Built on Base, powered by $FDH — earn onchain streaks while showcasing and minting digital fashion collectibles.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://github.com/Fx1cryptos/FX1-HUBS-MiniApp" target="_blank" rel="noopener noreferrer">
              <Button3D variant="hero" className="gap-2">
                <Github className="w-5 h-5" />
                View on GitHub
              </Button3D>
            </a>
            <a href="https://farcaster.xyz/fx1-faucet" target="_blank" rel="noopener noreferrer">
              <Button3D variant="creator" className="gap-2">
                <Users className="w-5 h-5" />
                Visit Farcaster
              </Button3D>
            </a>
          </div>
        </div>
      </div>

      {/* Core Features Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-primary bg-clip-text text-transparent">
          Core Features
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:shadow-glow">
            <Palette className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-3">NFT Display Gallery</h3>
            <p className="text-muted-foreground">
              Seamless integration with Zora & Manifold APIs to showcase your fashion NFT collections.
            </p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/20 hover:border-accent/50 transition-all hover:shadow-glow">
            <Blocks className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-xl font-bold mb-3">Base Chain Integration</h3>
            <p className="text-muted-foreground">
              Full $FDH token ecosystem with onchain profile support on Base Network.
            </p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/50 transition-all hover:shadow-glow">
            <Flame className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Daily Social Streaks</h3>
            <p className="text-muted-foreground">
              Earn rewards through consistent Farcaster interactions and community engagement.
            </p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all hover:shadow-glow">
            <Sparkles className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">3D Fashion UI</h3>
            <p className="text-muted-foreground">
              Immersive 3D-themed interface merging art, technology, and digital fashion culture.
            </p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-green-500/20 hover:border-green-500/50 transition-all hover:shadow-glow">
            <Users className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Farcaster Native</h3>
            <p className="text-muted-foreground">
              Built specifically for Farcaster Frames & MiniApp SDK for seamless social integration.
            </p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/50 transition-all hover:shadow-glow">
            <Brain className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Creator Tokens</h3>
            <p className="text-muted-foreground">
              Empower creators to earn, connect, and express their digital identity onchain.
            </p>
          </Card>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="container mx-auto px-4 py-12">
        <Card className="p-8 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md border-primary/30">
          <h2 className="text-3xl font-bold mb-8 text-center">Tech Stack & Integration</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary">Core Technologies</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Farcaster Frames & MiniApp SDK</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Next.js / React Framework</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Base Network Integration</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-accent">NFT & Storage</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Zora API Integration</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Manifold NFT Protocol</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Pinata IPFS Storage</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-400">Key Features</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Onchain Identity</h4>
                      <p className="text-sm text-muted-foreground">
                        Base chain profile: olamsfx1.base.eth
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Social Streaks</h4>
                      <p className="text-sm text-muted-foreground">
                        Daily engagement rewards on Farcaster
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">3D Fashion UI</h4>
                      <p className="text-sm text-muted-foreground">
                        Immersive visual experience for digital wearables
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Creator Economy</h4>
                      <p className="text-sm text-muted-foreground">
                        Earn $FDH through content and community participation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Media & Assets
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              All FX1 HUBS assets including 3D visuals, NFT previews, and promotional media are stored on IPFS:
            </p>
            <a 
              href="https://gateway.pinata.cloud/ipfs/bafybeigc6v5wizyuksl6wxninz76irvrfjscuzjgydkctbzirsu6oiro34" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-mono text-primary hover:text-primary/80 transition-colors break-all"
            >
              bafybeigc6v5wizyuksl6wxninz76irvrfjscuzjgydkctbzirsu6oiro34
            </a>
          </div>
        </Card>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 py-12">
        <Card className="p-12 text-center bg-gradient-to-br from-primary/20 via-accent/20 to-blue-500/20 backdrop-blur-md border-primary/30">
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-2xl text-foreground/90 max-w-4xl mx-auto leading-relaxed">
            To empower digital creators and brands to <span className="text-primary font-bold">style the blockchain</span> — 
            merging fashion aesthetics with onchain culture, identity, and social experiences.
          </p>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <Card className="p-8 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border-primary/30">
          <h2 className="text-3xl font-bold mb-4">Get Started with FX1 HUBS MiniApp</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join the FX1 community on Farcaster and start earning $FDH through social engagement, 
            NFT creation, and fashion collaboration.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://github.com/Fx1cryptos/FX1-HUBS-MiniApp" target="_blank" rel="noopener noreferrer">
              <Button3D variant="hero" className="gap-2">
                <Github className="w-5 h-5" />
                Fork on GitHub
              </Button3D>
            </a>
            <a href="https://farcaster.xyz/fx1-faucet" target="_blank" rel="noopener noreferrer">
              <Button3D variant="creator" className="gap-2">
                <Users className="w-5 h-5" />
                Join Farcaster
              </Button3D>
            </a>
            <Link to="/">
              <Button3D variant="wallet" className="gap-2">
                <ExternalLink className="w-5 h-5" />
                Explore FX1 Hubs
              </Button3D>
            </Link>
          </div>
        </Card>
      </div>

      <SocialLinks />
    </div>
  );
};

export default FX1Flux;
