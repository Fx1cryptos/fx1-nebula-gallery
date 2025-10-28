import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button3D } from '@/components/ui/Button3D';
import { Badge } from '@/components/ui/badge';
import nftsData from '@/data/nfts.json'; // Your new JSON file with all CIDs

interface NFTType {
  name: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
}

export function NFTGallery() {
  const [nfts, setNFTs] = useState<NFTType[]>([]);

  useEffect(() => {
    // Load NFTs from JSON
    setNFTs(nftsData);
  }, []);

  return (
    <section className="py-20 relative bg-gradient-to-b from-[#0a1b2b] to-[#001f3f]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
            FX1 Onchain NFT Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-2">
            Explore your $FDH tokens and collectible NFTs in a futuristic Base 3D-inspired gallery.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {nfts.map((nft, index) => {
            const rarity = nft.attributes.find(attr => attr.trait_type === 'Rarity')?.value;

            return (
              <Card
                key={index}
                className="group relative overflow-hidden bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:-translate-y-2"
              >
                {/* 3D-like glow overlay */}
                <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg aspect-square">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                  <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {nft.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{nft.description}</p>
                </CardContent>

                <CardFooter className="p-4 pt-0 space-x-2 relative z-10">
                  <Button3D variant="nft" size="sm" className="flex-1">
                    View NFT
                  </Button3D>
                  <Button3D variant="wallet" size="sm" className="flex-1">
                    Place Bid
                  </Button3D>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}