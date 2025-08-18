import React from 'react';
import { Button3D } from '@/components/ui/Button3D';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Palette, Coins, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Upload Art',
    description: 'Upload your digital artwork directly to the platform',
    action: 'Upload Now'
  },
  {
    icon: Palette,
    title: 'Generate AI Art',
    description: 'Create stunning AI-powered artwork with our tools',
    action: 'Generate Art'
  },
  {
    icon: Coins,
    title: 'Mint NFT',
    description: 'Transform your art into unique NFTs on the blockchain',
    action: 'Start Minting'
  }
];

export function CreatorHub() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Creator Hub
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create. Post. Earn with FX1
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="group relative overflow-hidden bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="text-center relative z-10">
                  <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-center space-y-6 relative z-10">
                  <p className="text-muted-foreground">{feature.description}</p>
                  
                  <Button3D variant="creator" className="w-full">
                    {feature.action}
                  </Button3D>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-accent/10 backdrop-blur-sm border border-accent/30 rounded-full px-6 py-3">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-accent font-semibold text-lg">Create. Post. Earn with FX1</span>
          </div>
        </div>
      </div>
    </section>
  );
}