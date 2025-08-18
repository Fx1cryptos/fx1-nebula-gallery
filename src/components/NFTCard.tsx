import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button3D } from '@/components/ui/Button3D';
import { Badge } from '@/components/ui/badge';

interface NFTCardProps {
  image: string;
  title: string;
  tokenId: string;
  price: string;
  creator?: string;
  rarity?: string;
}

export function NFTCard({ image, title, tokenId, price, creator, rarity }: NFTCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg aspect-square">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {rarity && (
            <Badge className="absolute top-3 right-3 bg-accent/80 backdrop-blur-sm text-accent-foreground">
              {rarity}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3 relative z-10">
        <div>
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">Token ID: {tokenId}</p>
          {creator && (
            <p className="text-xs text-muted-foreground mt-1">by {creator}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-xl font-bold text-primary">{price}</p>
          </div>
        </div>
      </CardContent>

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