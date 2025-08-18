import React from 'react';
import { Wallet, Palette, ShoppingCart } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Wallet,
    title: 'Connect Wallet',
    description: 'Link your crypto wallet to start your NFT journey'
  },
  {
    number: '02',
    icon: Palette,
    title: 'Create or Mint NFT',
    description: 'Upload your art or generate AI artwork and mint as NFT'
  },
  {
    number: '03',
    icon: ShoppingCart,
    title: 'List & Sell in Marketplace',
    description: 'Set your price and let the world discover your creations'
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with FX1 Digital Hubs in just three simple steps
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.number}
                  className="text-center relative"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Step number badge */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-card border-2 border-primary/30 rounded-full flex items-center justify-center relative z-10 group-hover:border-primary transition-colors duration-300">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}