import React from 'react';
import { Button3D } from '@/components/ui/Button3D';
import {
  Twitter,
  Farcaster,
  MessageCircle,
  Telegram,
  Zap,
  Spiral,
  FileText,
  Diamond
} from 'lucide-react';
import { ExternalLink } from 'lucide-react';

const socialLinks = [
  { name: 'X (Twitter)', url: 'https://x.com/fx1_hubs?s=21', icon: <Twitter size={20} /> },
  { name: 'Farcaster', url: 'https://farcaster.xyz/fx1-faucet', icon: <Farcaster size={20} /> },
  { name: 'Telegram', url: 'https://t.me/fx1digitalhubs', icon: <Telegram size={20} /> },
  { name: 'Discord', url: 'https://discord.gg/wPbsbmnk', icon: <MessageCircle size={20} /> }
];

const platformLinks = [
  { name: 'Zora', url: 'https://zora.co/@fx1_hubs', icon: <Zap size={20} /> },
  { name: 'Manifold', url: 'https://manifold.xyz/@fx1hubs', icon: <Spiral size={20} /> },
  { name: 'Blog', url: 'https://paragraph.com/@fx1hubs/fx1-digital-hubs', icon: <FileText size={20} /> },
  { name: '$FDH Token', url: 'https://rainbow.me/token/base/0x1f85705d939Bb6Fa1AEbE99d7105AdCee75CE380', icon: <Diamond size={20} /> }
];

export function SocialLinks() {
  return (
    <footer className="py-16 border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Join the FX1 Community
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with creators, collectors, and innovators in the Web3 space
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-center">Social Media</h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button3D variant="social" className="w-full justify-between group">
                    <div className="flex items-center space-x-2">
                      {link.icon}
                      <span>{link.name}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button3D>
                </a>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-center">Platforms & Links</h3>
            <div className="grid grid-cols-2 gap-3">
              {platformLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button3D variant="social" className="w-full justify-between group">
                    <div className="flex items-center space-x-2">
                      {link.icon}
                      <span className="text-sm">{link.name}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button3D>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Website Link */}
        <div className="text-center mt-12">
          <a
            href="https://fx1hubs.short.gy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button3D variant="hero" className="text-lg px-8 py-3">
              Visit FX1 Website
            </Button3D>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 pt-8 border-t border-border/20">
          <p className="text-muted-foreground">
            © 2025 FX1 Digital Hubs. Where Creativity Becomes Culture.
          </p>
        </div>
      </div>
    </footer>
  );
}