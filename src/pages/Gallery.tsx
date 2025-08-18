import React, { useState } from 'react';
import { NFTCard } from '@/components/NFTCard';
import { Button3D } from '@/components/ui/Button3D';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Grid, List } from 'lucide-react';

// Extended sample data with social features
const galleryNFTs = [
  {
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop",
    title: "Digital Dreamscape #001",
    tokenId: "0x001",
    price: "2.5 ETH",
    creator: "DigitalArtist",
    rarity: "Rare",
    likes: 234,
    isLiked: false,
    creatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    creatorFollowers: 1200
  },
  {
    image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400&h=400&fit=crop",
    title: "Neon Genesis",
    tokenId: "0x002", 
    price: "1.8 ETH",
    creator: "CyberCreator",
    rarity: "Epic",
    likes: 456,
    isLiked: true,
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    creatorFollowers: 850
  },
  {
    image: "https://images.unsplash.com/photo-1641154706848-fe1bdc543e4a?w=400&h=400&fit=crop",
    title: "Quantum Flux",
    tokenId: "0x003",
    price: "3.2 ETH",
    creator: "QuantumArt",
    rarity: "Legendary",
    likes: 789,
    isLiked: false,
    creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    creatorFollowers: 2100
  },
  {
    image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=400&h=400&fit=crop",
    title: "Cyber Punk",
    tokenId: "0x004",
    price: "1.2 ETH",
    creator: "PunkArtist",
    rarity: "Common",
    likes: 123,
    isLiked: true,
    creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    creatorFollowers: 650
  },
  {
    image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=400&h=400&fit=crop",
    title: "Abstract Infinity",
    tokenId: "0x005",
    price: "4.1 ETH",
    creator: "InfiniteArt",
    rarity: "Mythic",
    likes: 892,
    isLiked: false,
    creatorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b932?w=100&h=100&fit=crop&crop=face",
    creatorFollowers: 3200
  },
  {
    image: "https://images.unsplash.com/photo-1640622842223-e1e39787415f?w=400&h=400&fit=crop",
    title: "Digital Vortex",
    tokenId: "0x006",
    price: "2.0 ETH",
    creator: "VortexStudio",
    rarity: "Rare",
    likes: 345,
    isLiked: true,
    creatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    creatorFollowers: 1500
  }
];

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedNFTs, setLikedNFTs] = useState<Set<string>>(new Set(['0x002', '0x004', '0x006']));

  const toggleLike = (tokenId: string) => {
    setLikedNFTs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tokenId)) {
        newSet.delete(tokenId);
      } else {
        newSet.add(tokenId);
      }
      return newSet;
    });
  };

  const filteredNFTs = galleryNFTs.filter(nft => {
    const matchesSearch = nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || nft.rarity.toLowerCase() === filterBy.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'likes':
        return b.likes - a.likes;
      case 'newest':
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            NFT Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover, collect, and trade unique digital artworks from talented creators around the world
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:space-x-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search NFTs or creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary/30 border-border/50 focus:border-primary/50"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-secondary/30 border-border/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="likes">Most Liked</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48 bg-secondary/30 border-border/50">
                <SelectValue placeholder="Filter by rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rarities</SelectItem>
                <SelectItem value="common">Common</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="epic">Epic</SelectItem>
                <SelectItem value="legendary">Legendary</SelectItem>
                <SelectItem value="mythic">Mythic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button3D
              variant={viewMode === 'grid' ? 'nft' : 'wallet'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button3D>
            <Button3D
              variant={viewMode === 'list' ? 'nft' : 'wallet'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button3D>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {sortedNFTs.length} of {galleryNFTs.length} NFTs
          </p>
        </div>

        {/* NFT Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {sortedNFTs.map((nft, index) => (
            <div 
              key={nft.tokenId}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <SocialNFTCard 
                {...nft} 
                isLiked={likedNFTs.has(nft.tokenId)}
                onToggleLike={() => toggleLike(nft.tokenId)}
                viewMode={viewMode}
              />
            </div>
          ))}
        </div>

        {sortedNFTs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No NFTs found matching your criteria</p>
            <Button3D 
              variant="wallet" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setFilterBy('all');
              }}
            >
              Clear Filters
            </Button3D>
          </div>
        )}
      </div>
    </div>
  );
}

// Social NFT Card Component
interface SocialNFTCardProps {
  image: string;
  title: string;
  tokenId: string;
  price: string;
  creator: string;
  rarity: string;
  likes: number;
  isLiked: boolean;
  creatorAvatar: string;
  creatorFollowers: number;
  onToggleLike: () => void;
  viewMode: 'grid' | 'list';
}

function SocialNFTCard({ 
  image, title, tokenId, price, creator, rarity, likes, isLiked, 
  creatorAvatar, creatorFollowers, onToggleLike, viewMode 
}: SocialNFTCardProps) {
  if (viewMode === 'list') {
    return (
      <div className="bg-gradient-card border border-border/50 hover:border-primary/50 rounded-lg p-6 transition-all duration-300 hover:shadow-glow">
        <div className="flex space-x-6">
          <img 
            src={image} 
            alt={title}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">Token ID: {tokenId}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <img 
                src={creatorAvatar} 
                alt={creator}
                className="w-8 h-8 rounded-full border-2 border-primary/30"
              />
              <div>
                <p className="font-medium">{creator}</p>
                <p className="text-xs text-muted-foreground">{creatorFollowers.toLocaleString()} followers</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onToggleLike}
                  className={`flex items-center space-x-1 transition-colors ${
                    isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                  }`}
                >
                  <span className="text-lg">{isLiked ? '❤️' : '🤍'}</span>
                  <span className="text-sm">{likes}</span>
                </button>
                <div className="text-lg font-bold text-primary">{price}</div>
              </div>
              
              <div className="flex space-x-2">
                <Button3D variant="nft" size="sm">Buy Now</Button3D>
                <Button3D variant="wallet" size="sm">Place Bid</Button3D>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <NFTCard 
      image={image}
      title={title}
      tokenId={tokenId}
      price={price}
      creator={creator}
      rarity={rarity}
      likes={likes}
      isLiked={isLiked}
      creatorAvatar={creatorAvatar}
      creatorFollowers={creatorFollowers}
      onToggleLike={onToggleLike}
    />
  );
}