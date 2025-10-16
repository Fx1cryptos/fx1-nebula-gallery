import { Button3D } from "@/components/ui/Button3D";
import { Card } from "@/components/ui/card";
import { SocialLinks } from "@/components/SocialLinks";
import { Bot, Sparkles, Zap, Brain, MessageSquare, Palette } from "lucide-react";
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
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            FX1 Flux AI Agent
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your intelligent companion for NFT Fashion, Surreal Art, and Digital Identity creation.
            Powered by advanced AI to enhance your creative journey in the FX1 ecosystem.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button3D variant="hero" className="gap-2">
              <MessageSquare className="w-5 h-5" />
              Chat with FX1 Flux
            </Button3D>
            <Button3D variant="creator" className="gap-2">
              <Brain className="w-5 h-5" />
              Learn More
            </Button3D>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:shadow-glow">
            <Palette className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-3">Creative Assistant</h3>
            <p className="text-muted-foreground">
              Get AI-powered suggestions for NFT fashion designs, color palettes, and surreal art concepts.
            </p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/20 hover:border-accent/50 transition-all hover:shadow-glow">
            <Zap className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-xl font-bold mb-3">Smart Automation</h3>
            <p className="text-muted-foreground">
              Automate your wardrobe management, track fashion trends, and optimize your style points.
            </p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:shadow-glow">
            <Brain className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-3">Intelligent Insights</h3>
            <p className="text-muted-foreground">
              Receive personalized recommendations based on your NFT collection and engagement patterns.
            </p>
          </Card>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="container mx-auto px-4 py-12">
        <Card className="p-8 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md border-primary/30">
          <h2 className="text-3xl font-bold mb-6 text-center">What FX1 Flux Can Do</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Fashion Trend Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Analyze trending NFT fashion items and predict upcoming styles
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Wardrobe Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Get suggestions on how to maximize your style points and outfit combinations
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Content Generation</h4>
                  <p className="text-sm text-muted-foreground">
                    Create engaging social posts and descriptions for your NFT collections
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Market Intelligence</h4>
                  <p className="text-sm text-muted-foreground">
                    Track $FDH token trends and suggest optimal trading strategies
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Quest Assistance</h4>
                  <p className="text-sm text-muted-foreground">
                    Help you complete fashion quests and maximize your rewards
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Community Insights</h4>
                  <p className="text-sm text-muted-foreground">
                    Discover trending creators and collaborate on fashion challenges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border-primary/30">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience FX1 Flux?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start leveraging AI to enhance your FX1 Digital Hubs journey. Create better, earn more, and style smarter.
          </p>
          <Button3D variant="hero" className="gap-2">
            <Bot className="w-5 h-5" />
            Launch FX1 Flux
          </Button3D>
        </Card>
      </div>

      <SocialLinks />
    </div>
  );
};

export default FX1Flux;
