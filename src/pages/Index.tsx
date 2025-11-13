import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FloatingGeometry } from '@/components/3D/FloatingGeometry';
import { WalletConnect } from '@/components/WalletConnect';
import { NFTCard } from '@/components/NFTCard';
import { Sparkles, Zap, Trophy, Users, ExternalLink, Twitter, MessageSquare } from 'lucide-react';

// Featured Digital Wardrobe NFTs
const featuredNFTs = [
  {
    image: "/IMG_4868.png",
    title: "FX1 Fashion #001",
    tokenId: "0x001",
    price: "0.001 ETH",
    creator: "@fx1_hubs",
    rarity: "Limited"
  },
  {
    image: "/IMG_4880.png",
    title: "FX1 Fashion #002",
    tokenId: "0x002",
    price: "0.001 ETH",
    creator: "@fx1_hubs",
    rarity: "Limited"
  },
  {
    image: "/IMG_4910.jpeg",
    title: "FX1 Fashion #003",
    tokenId: "0x003",
    price: "0.001 ETH",
    creator: "@fx1_hubs",
    rarity: "Limited"
  },
  {
    image: "/IMG_4911.jpeg",
    title: "FX1 Fashion #004",
    tokenId: "0x004",
    price: "0.001 ETH",
    creator: "@fx1_hubs",
    rarity: "Limited"
  }
];

export default function Index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="animate-pulse text-gold text-xl font-display">Loading FX1 Nebula Gallery...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-foreground">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-royal opacity-90"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-royal/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <FloatingGeometry />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-navy/80 backdrop-blur-xl border-b border-gold/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="FX1" className="w-12 h-12 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
              <h1 className="text-2xl font-bold text-gold font-display">
                FX1 Digital Hubs
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/tokens" className="text-white hover:text-gold transition-colors font-medium">
                Tokens
              </Link>
              <Link to="/social" className="text-white hover:text-gold transition-colors font-medium">
                Social
              </Link>
              <Link to="/arena" className="text-white hover:text-gold transition-colors font-medium">
                Arena
              </Link>
              <Link to="/leaderboard" className="text-white hover:text-gold transition-colors font-medium">
                Leaderboard
              </Link>
            </div>

            <WalletConnect />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display">
              <span className="text-white">FX1 Nebula Gallery:</span>
              <br />
              <span className="bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent animate-pulse-glow">
                Where Fashion Meets the Blockchain
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Discover, collect, and trade NFT fashion on Base Chain
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/gallery"
                className="group relative px-8 py-4 bg-gold text-navy font-bold rounded-xl text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)]"
              >
                <Sparkles className="inline-block mr-2 w-5 h-5" />
                Explore Marketplace
              </Link>
              <a
                href="https://zora.co/@fx1_hubs"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-gold text-gold font-bold rounded-xl text-lg hover:bg-gold hover:text-navy transition-all duration-300"
              >
                Mint on Zora
                <ExternalLink className="inline-block ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection - Digital Wardrobe */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white font-display">
              Digital Wardrobe
            </h2>
            <p className="text-xl text-gray-300">
              Exclusive FX1 fashion pieces on Base Chain
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredNFTs.map((nft, index) => (
              <div 
                key={index}
                className="group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={nft.image} 
                      alt={nft.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{nft.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{nft.creator}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gold font-bold">{nft.price}</span>
                      <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">{nft.rarity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              to="/gallery"
              className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm border border-gold/40 text-gold rounded-lg hover:bg-gold hover:text-navy transition-all duration-300 font-medium"
            >
              View Full Collection →
            </Link>
          </div>
        </div>
      </section>

      {/* Live NFT Feed */}
      <section className="relative py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white font-display">
              Latest Mints
            </h2>
            <p className="text-xl text-gray-300">
              Fresh drops from the FX1 collection
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-navy/80 backdrop-blur-sm border border-gold/20 rounded-2xl p-8 text-center">
              <Zap className="w-16 h-16 text-gold mx-auto mb-4 animate-pulse" />
              <p className="text-gray-300 mb-6">
                Follow the latest NFT drops and mints from our Zora creator page
              </p>
              <a
                href="https://zora.co/@fx1_hubs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-gold text-navy font-bold rounded-xl hover:scale-105 transition-all duration-300"
              >
                Visit @fx1_hubs on Zora
                <ExternalLink className="inline-block ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Feed Integration */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white font-display">
              Community Hub
            </h2>
            <p className="text-xl text-gray-300">
              Connect with FX1 across Web3
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Farcaster */}
            <div className="bg-white/5 backdrop-blur-sm border border-gold/20 rounded-2xl p-8 hover:border-gold/60 transition-all duration-300">
              <MessageSquare className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Farcaster</h3>
              <p className="text-gray-300 mb-6">
                Join the conversation on Farcaster for exclusive updates and community discussions
              </p>
              <Link
                to="/farcaster"
                className="inline-block px-6 py-2 bg-gold/20 border border-gold text-gold rounded-lg hover:bg-gold hover:text-navy transition-all duration-300 font-medium"
              >
                Connect on Farcaster →
              </Link>
            </div>

            {/* X (Twitter) */}
            <div className="bg-white/5 backdrop-blur-sm border border-gold/20 rounded-2xl p-8 hover:border-gold/60 transition-all duration-300">
              <Twitter className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">X / Twitter</h3>
              <p className="text-gray-300 mb-6">
                Follow @fx1_hubs for the latest drops, announcements, and fashion blockchain news
              </p>
              <a
                href="https://x.com/fx1_hubs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-gold/20 border border-gold text-gold rounded-lg hover:bg-gold hover:text-navy transition-all duration-300 font-medium"
              >
                Follow on X →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display">
              About FX1 Digital Hubs
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              FX1 Digital Hubs is pioneering the intersection of fashion and blockchain technology. 
              We're building a vibrant ecosystem where creators and collectors unite to celebrate 
              digital fashion, NFT art, and onchain culture. Powered by $FDH token, our platform 
              enables gamified experiences, social engagement, and exclusive access to limited-edition 
              digital wardrobe pieces on Base Chain.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-navy/80 backdrop-blur-sm border border-gold/20 rounded-xl p-6">
                <Sparkles className="w-10 h-10 text-gold mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">NFT Fashion</h3>
                <p className="text-sm text-gray-400">Exclusive digital wardrobe on Base Chain</p>
              </div>
              <div className="bg-navy/80 backdrop-blur-sm border border-gold/20 rounded-xl p-6">
                <Trophy className="w-10 h-10 text-gold mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">$FDH Token</h3>
                <p className="text-sm text-gray-400">Earn rewards through gamified experiences</p>
              </div>
              <div className="bg-navy/80 backdrop-blur-sm border border-gold/20 rounded-xl p-6">
                <Users className="w-10 h-10 text-gold mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Community</h3>
                <p className="text-sm text-gray-400">Join the fashion-forward Web3 movement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white font-display">
              $FDH Puzzle Leaderboard
            </h2>
            <p className="text-xl text-gray-300">
              Compete, earn, and climb the ranks
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-gold/20 rounded-2xl p-8 text-center">
              <Trophy className="w-16 h-16 text-gold mx-auto mb-4" />
              <p className="text-gray-300 mb-6">
                Track your progress and compete with the FX1 community. Complete challenges, earn $FDH, and unlock exclusive rewards.
              </p>
              <Link
                to="/leaderboard"
                className="inline-block px-8 py-3 bg-gold text-navy font-bold rounded-xl hover:scale-105 transition-all duration-300"
              >
                View Leaderboard →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Wallet Section */}
      <section className="relative py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display">
              Ready to Join?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Connect your wallet to start collecting, trading, and earning rewards in the FX1 ecosystem
            </p>
            <div className="flex justify-center">
              <WalletConnect />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-gold/20 bg-navy/90 backdrop-blur-sm">
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.png" alt="FX1" className="w-10 h-10" />
                <span className="text-xl font-bold text-gold font-display">FX1 Digital Hubs</span>
              </div>
              <p className="text-sm text-gray-400">
                Where fashion meets the blockchain. Built on Base Chain.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/gallery" className="text-gray-400 hover:text-gold transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/tokens" className="text-gray-400 hover:text-gold transition-colors">
                    $FDH Token
                  </Link>
                </li>
                <li>
                  <Link to="/arena" className="text-gray-400 hover:text-gold transition-colors">
                    Arena
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="text-gray-400 hover:text-gold transition-colors">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://zora.co/@fx1_hubs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold transition-colors flex items-center"
                  >
                    Zora Creator Coin
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://discord.gg/yNKumEGd" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold transition-colors flex items-center"
                  >
                    Join Discord
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://x.com/fx1_hubs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold transition-colors flex items-center"
                  >
                    Follow on X
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://base.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold transition-colors flex items-center"
                  >
                    Base App Profile
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-gold transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/social" className="text-gray-400 hover:text-gold transition-colors">
                    Social Hub
                  </Link>
                </li>
                <li>
                  <Link to="/rewards" className="text-gray-400 hover:text-gold transition-colors">
                    Rewards
                  </Link>
                </li>
                <li>
                  <Link to="/creator-dashboard" className="text-gray-400 hover:text-gold transition-colors">
                    Creator Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gold/20 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 FX1 Digital Hubs. All rights reserved. Built with 💛 on Base Chain.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}