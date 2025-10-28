import React from "react";
import { Button3D } from "@/components/ui/Button3D";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Palette, Coins, Sparkles } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Upload Art",
    description: "Upload your digital artwork directly to FX1 Mini App",
    action: "Upload Now"
  },
  {
    icon: Palette,
    title: "Generate AI Art",
    description: "Create stunning AI-powered artwork with our tools",
    action: "Generate Art"
  },
  {
    icon: Coins,
    title: "Mint NFT",
    description: "Transform your art into unique NFTs on Base blockchain",
    action: "Start Minting"
  }
];

export function CreatorHub() {
  const fx1FluxCID = "bafybeihe3kduugbbj5jrfkjd76bpdbgkpu7725okqn32cjfyipqs3npcfy";
  const IPFS_PREFIX = "https://ipfs.io/ipfs/";

  return (
    <section className="py-20 relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Flux Hero */}
      <div className="text-center mb-12 relative">
        <div className="flex justify-center mb-6">
          <img
            src={`${IPFS_PREFIX}${fx1FluxCID}`}
            alt="FX1 Flux Animation"
            className="w-64 h-64 rounded-xl shadow-glow animate-float"
          />
        </div>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="w-10 h-10 text-primary animate-pulse" />
          <h2 className="text-5xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">
            Creator Hub
          </h2>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create, showcase, and earn with FX1 Digital Hubs on Base.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.title}
              className="group relative overflow-hidden bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader className="text-center relative z-10">
                <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors duration-300 shadow-3d">
                  <Icon className="w-10 h-10 text-primary" />
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

      {/* CTA Footer */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center space-x-3 bg-accent/10 backdrop-blur-sm border border-accent/30 rounded-full px-8 py-4 shadow-3d">
          <Sparkles className="w-6 h-6 text-accent animate-pulse" />
          <span className="text-accent font-semibold text-lg">
            Exclusive FX1 Hub Experience
          </span>
        </div>
      </div>
    </section>
  );
}