import React, { Suspense, useEffect, useState } from 'react';
import { FloatingGeometry } from '@/components/3D/FloatingGeometry';
import { Button3D } from '@/components/ui/Button3D';
import { WalletConnect } from '@/components/WalletConnect';
import { NFTCard } from '@/components/NFTCard';
import { CreatorHub } from '@/components/CreatorHub';
import { HowItWorks } from '@/components/HowItWorks';
import { SocialLinks } from '@/components/SocialLinks';
import fx1Logo from '@/assets/fx1-logo.png';

// Sample NFT data
const sampleNFTs = [
  {
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop",
    title: "Digital Dreamscape #001",
    tokenId: "0x001",
    price: "2.5 ETH",
    creator: "DigitalArtist",
    rarity: "Rare"
  },
  {
    image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400&h=400&fit=crop",
    title: "Neon Genesis",
    tokenId: "0x002", 
    price: "1.8 ETH",
    creator: "CyberCreator",
    rarity: "Epic"
  },
  {
    image: "https://images.unsplash.com/photo-1641154706848-fe1bdc543e4a?w=400&h=400&fit=crop",
    title: "Quantum Flux",
    tokenId: "0x003",
    price: "3.2 ETH",
    creator: "QuantumArt",
    rarity: "Legendary"
  },
  {
    image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=400&h=400&fit=crop",
    title: "Cyber Punk",
    tokenId: "0x004",
    price: "1.2 ETH",
    creator: "PunkArtist",
    rarity: "Common"
  },
  {
    image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=400&h=400&fit=crop",
    title: "Abstract Infinity",
    tokenId: "0x005",
    price: "4.1 ETH",
    creator: "InfiniteArt",
    rarity: "Mythic"
  },
  {
    image: "https://images.unsplash.com/photo-1640622842223-e1e39787415f?w=400&h=400&fit=crop",
    title: "Digital Vortex",
    tokenId: "0x006",
    price: "2.0 ETH",
    creator: "VortexStudio",
    rarity: "Rare"
  }
];

export default function Index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary text-xl">Loading FX1 Digital Hubs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={fx1Logo} alt="FX1 Digital Hubs" className="w-12 h-12" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                FX1 Digital Hubs
              </h1>
            </div>
            <WalletConnect />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center geometric-bg overflow-hidden">
        <Suspense fallback={<div />}>
          <FloatingGeometry />
        </Suspense>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <img 
              src={fx1Logo} 
              alt="FX1 Digital Hubs" 
              className="w-32 h-32 mx-auto mb-8 float-animation"
            />
            
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
              FX1 DIGITAL HUBS
            </h1>
            
            <p className="text-2xl md:text-3xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
              Style the Web3 with NFT Fashion & Surreal Art
            </p>
            
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Where Creativity Becomes Culture. Every Piece Tells a Story. Every Drop is a Vibe.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Button3D variant="hero" size="lg" className="text-lg px-8 py-4">
                Discover Collection
              </Button3D>
              <Button3D variant="wallet" size="lg" className="text-lg px-8 py-4">
                Start Creating
              </Button3D>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* NFT Marketplace Gallery */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Featured NFTs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover unique digital art and collectibles from talented creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sampleNFTs.map((nft, index) => (
              <div 
                key={nft.tokenId}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <NFTCard {...nft} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button3D variant="hero" size="lg">
              View All NFTs
            </Button3D>
          </div>
        </div>
      </section>

      {/* Creator Hub */}
      <CreatorHub />

      {/* How It Works */}
      <HowItWorks />

      {/* Social Links Footer */}
      <SocialLinks />
    </div>
  );
}