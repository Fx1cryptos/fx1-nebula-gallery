import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FloatingGeometry } from '@/components/3D/FloatingGeometry';
import { Button3D } from '@/components/ui/Button3D';
import { WalletConnect } from '@/components/WalletConnect';
import { NFTCard } from '@/components/NFTCard';
import { CreatorHub } from '@/components/CreatorHub';
import { HowItWorks } from '@/components/HowItWorks';
import { SocialLinks } from '@/components/SocialLinks';
import fx1Logo from '@/assets/fx1-logo.png';
import fx1Hero from '@/assets/fx1-hero.jpeg';

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
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/social" className="text-foreground hover:text-primary transition-colors">
                Social
              </Link>
              <Link to="/rewards" className="text-foreground hover:text-primary transition-colors">
                Rewards
              </Link>
              <Link to="/arena" className="text-foreground hover:text-primary transition-colors">
                Arena
              </Link>
              <Link to="/leaderboard" className="text-foreground hover:text-primary transition-colors">
                Leaderboard
              </Link>
            </div>
            
            <WalletConnect />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={fx1Hero} 
            alt="FX1 Digital Hubs" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <Suspense fallback={<div />}>
          <FloatingGeometry />
        </Suspense>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-4" style={{ 
              background: 'linear-gradient(135deg, #FFD700 0%, #FFF 50%, #00A8FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              FX1 DIGITAL HUBS
            </h1>
            
            <p className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
              Your Web3 Hub for NFTs, Social Impact, & $FDH Rewards
            </p>
            
            <p className="text-xl md:text-2xl text-foreground/90 font-medium max-w-3xl mx-auto">
              Earn $FDH. Stake $FDH. Level Up Your Score.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <a href="https://zora.co/@fx1_hubs" target="_blank" rel="noopener noreferrer">
                <Button3D variant="hero" size="lg" className="text-lg px-8 py-4">
                  🔗 Explore NFTs on Zora
                </Button3D>
              </a>
              <a href="https://rainbow.me/token/base/0x1f85705d939Bb6Fa1AEbE99d7105AdCee75CE380" target="_blank" rel="noopener noreferrer">
                <Button3D variant="wallet" size="lg" className="text-lg px-8 py-4">
                  💰 Buy $FDH on Base
                </Button3D>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
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
            <Link to="/gallery">
              <Button3D variant="hero" size="lg">
                View All NFTs
              </Button3D>
            </Link>
          </div>
        </div>
      </section>

      {/* Gamification Features */}
      <section className="py-20 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Earn $FDH & Level Up
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Engage, create, and compete to earn rewards in the FX1 ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Link to="/social">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 hover:border-blue-500/60 transition-all hover:scale-105 cursor-pointer">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-2xl font-bold mb-3 text-blue-400">Social Hub</h3>
                <p className="text-muted-foreground mb-4">
                  Post, like, comment & follow creators to earn $FDH rewards
                </p>
                <div className="text-sm font-bold text-blue-400">+10 $FDH per post</div>
              </div>
            </Link>

            <Link to="/rewards">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 hover:border-yellow-500/60 transition-all hover:scale-105 cursor-pointer">
                <div className="text-5xl mb-4">🔥</div>
                <h3 className="text-2xl font-bold mb-3 text-yellow-400">Daily Streaks</h3>
                <p className="text-muted-foreground mb-4">
                  Login daily to build your streak and earn increasing rewards
                </p>
                <div className="text-sm font-bold text-yellow-400">Day 7 = Wardrobe Box!</div>
              </div>
            </Link>

            <Link to="/arena">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:border-purple-500/60 transition-all hover:scale-105 cursor-pointer">
                <div className="text-5xl mb-4">⚔️</div>
                <h3 className="text-2xl font-bold mb-3 text-purple-400">Fashion Arena</h3>
                <p className="text-muted-foreground mb-4">
                  Battle for Best Dressed and win exclusive NFTs + rewards
                </p>
                <div className="text-sm font-bold text-purple-400">Weekly competitions</div>
              </div>
            </Link>

            <Link to="/leaderboard">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 hover:border-green-500/60 transition-all hover:scale-105 cursor-pointer">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold mb-3 text-green-400">Leaderboards</h3>
                <p className="text-muted-foreground mb-4">
                  Compete to reach the top and claim massive $FDH prizes
                </p>
                <div className="text-sm font-bold text-green-400">1st = 1000 $FDH</div>
              </div>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-6">
            <Link to="/wear-to-earn">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 hover:border-indigo-500/60 transition-all hover:scale-105 cursor-pointer">
                <div className="text-5xl mb-4">👗</div>
                <h3 className="text-2xl font-bold mb-3 text-indigo-400">Wear to Earn</h3>
                <p className="text-muted-foreground">
                  Equip NFT wearables and earn passive $FDH rewards
                </p>
              </div>
            </Link>

            <Link to="/stake">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 hover:border-red-500/60 transition-all hover:scale-105 cursor-pointer">
                <div className="text-5xl mb-4">💎</div>
                <h3 className="text-2xl font-bold mb-3 text-red-400">Stake $FDH</h3>
                <p className="text-muted-foreground">
                  Stake your $FDH tokens and earn staking rewards
                </p>
              </div>
            </Link>

            <Link to="/referrals">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 hover:border-teal-500/60 transition-all hover:scale-105 cursor-pointer">
                <div className="text-5xl mb-4">🎁</div>
                <h3 className="text-2xl font-bold mb-3 text-teal-400">Referrals</h3>
                <p className="text-muted-foreground">
                  Invite friends and earn bonus $FDH for each signup
                </p>
              </div>
            </Link>
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