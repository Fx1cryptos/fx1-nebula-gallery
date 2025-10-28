import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button3D } from '@/components/ui/Button3D';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface NFTCardProps {
  image?: string;
  title: string;
  tokenId: string;
  price: string;
  creator?: string;
  rarity?: string;
  likes?: number;
  isLiked?: boolean;
  creatorAvatar?: string;
  creatorFollowers?: number;
  onToggleLike?: () => void;
}

// Default IPFS CIDs for demo
const DEFAULT_CIDS = [
  'bafybeidj6b3oqqhx345svwuiqelwoti2cxykkf4q26dos7u4kgv5ggh3pa',
  'bafybeifnfusfppbjxwdcor25ze77kdfdtcdmo5b6lgngwkvtyb4jufnh3i',
  'bafybeiduwkmyuotsoyuyjygvpqdod2wzdipb7n4doppn5t25cwaer6tbxi'
];

export function NFTCard({
  image,
  title,
  tokenId,
  price,
  creator,
  rarity,
  likes,
  isLiked,
  creatorAvatar,
  creatorFollowers,
  onToggleLike
}: NFTCardProps) {
  const displayImage = image || `https://ipfs.io/ipfs/${DEFAULT_CIDS[Math.floor(Math.random() * DEFAULT_CIDS.length)]}`;

  return (
    <Card className="group relative overflow-hidden bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:-translate-y-2">
      {/* Glow overlay */}
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* NFT Image */}
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg aspect-square shadow-3d">
          <img
            src={displayImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {rarity && (
            <Badge className="absolute top-3 right-3 bg-accent/80 backdrop-blur-sm text-accent-foreground flex items-center gap-1">
              <Sparkles className="w-4 h-4 animate-pulse" /> {rarity}
            </Badge>
          )}
        </div>
      </CardHeader>

      {/* NFT Info */}
      <CardContent className="p-4 space-y-3 relative z-10">
        <div>
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground">Token ID: {tokenId}</p>

          {creator && (
            <div className="flex items-center space-x-2 mt-2">
              {creatorAvatar && (
                <img
                  src={creatorAvatar}
                  alt={creator}
                  className="w-6 h-6 rounded-full border border-primary/30"
                />
              )}
              <div>
                <p className="text-xs text-muted-foreground">by {creator}</p>
                {creatorFollowers && (
                  <p className="text-xs text-muted-foreground">{creatorFollowers.toLocaleString()} followers</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Price & Likes */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-xl font-bold text-primary">{price}</p>
          </div>

          {likes !== undefined && (
            <div className="flex items-center space-x-1">
              <button
                onClick={onToggleLike}
                className={`transition-colors ${
                  isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                }`}
              >
                <span className="text-lg">{isLiked ? '❤️' : '🤍'}</span>
              </button>
              <span className="text-sm text-muted-foreground">{likes}</span>
            </div>
          )}
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="p-4 pt-0 space-x-2 relative z-10">
        <Button3D variant="nft" size="sm" className="flex-1">
          Buy Now
        </Button3D>
        <Button3D variant="wallet" size="sm" className="flex-1">
          Place Bid
        </Button3D>
      </CardFooter>
    </Card>
  );
}