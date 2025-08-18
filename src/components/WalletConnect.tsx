import React, { useState } from 'react';
import { Button3D } from '@/components/ui/Button3D';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Wallet, ExternalLink } from 'lucide-react';

const wallets = [
  {
    name: 'MetaMask',
    icon: '🦊',
    description: 'Connect using browser wallet'
  },
  {
    name: 'Coinbase Wallet',
    icon: '🔵',
    description: 'Connect using Coinbase'
  },
  {
    name: 'Nightly',
    icon: '🌙',
    description: 'Connect using Nightly wallet'
  }
];

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');

  const handleConnect = (walletName: string) => {
    // Simulate wallet connection
    setAddress('0x742d...4e95');
    setIsConnected(true);
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-3">
        <div className="bg-secondary/50 backdrop-blur-sm border border-primary/30 rounded-lg px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">{address}</span>
          </div>
        </div>
        <Button3D 
          variant="wallet" 
          size="sm" 
          onClick={() => setIsConnected(false)}
        >
          Disconnect
        </Button3D>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button3D variant="wallet" className="flex items-center space-x-2">
          <Wallet className="w-4 h-4" />
          <span>Connect Wallet</span>
        </Button3D>
      </DialogTrigger>
      
      <DialogContent className="bg-card border border-border/50 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Connect Your Wallet</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 mt-6">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleConnect(wallet.name)}
              className="w-full p-4 bg-secondary/30 hover:bg-secondary/50 border border-border/50 hover:border-primary/50 rounded-lg transition-all duration-300 hover:shadow-glow group"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{wallet.icon}</div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {wallet.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{wallet.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}