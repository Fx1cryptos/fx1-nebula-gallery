import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Zap, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TokenBalance {
  symbol: string;
  balance: string;
  address: string;
}

export function TokenUtility() {
  const [tokens, setTokens] = useState<TokenBalance[]>([
    { symbol: '$FX1_HUBS', balance: '0', address: '0x...' },
    { symbol: '$FDH', balance: '0', address: '0x...' }
  ]);
  const { toast } = useToast();

  const handleStake = (symbol: string) => {
    toast({
      title: "Staking Coming Soon",
      description: `Stake your ${symbol} tokens to earn rewards and unlock exclusive features.`,
    });
  };

  const handleTrade = (symbol: string) => {
    toast({
      title: "Trade on Base",
      description: `Trade ${symbol} on Uniswap or your favorite Base DEX.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-gradient">Token Utilities</h2>
        <p className="text-muted-foreground">
          Unlock exclusive features with $FX1_HUBS & $FDH tokens
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tokens.map((token) => (
          <Card key={token.symbol} className="p-6 glass-card hover-glow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Coins className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">{token.symbol}</h3>
                  <p className="text-sm text-muted-foreground">Balance: {token.balance}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => handleStake(token.symbol)}
                className="w-full"
                variant="default"
              >
                <Zap className="w-4 h-4 mr-2" />
                Stake to Earn
              </Button>
              <Button 
                onClick={() => handleTrade(token.symbol)}
                className="w-full"
                variant="outline"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Trade on Base
              </Button>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="text-sm font-semibold mb-2">Token Utilities:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Access exclusive NFT drops</li>
                <li>• Vote on community decisions</li>
                <li>• Unlock premium features</li>
                <li>• Earn rewards through activity</li>
              </ul>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 glass-card">
        <h3 className="text-xl font-bold mb-4">How to Get Started</h3>
        <div className="space-y-3 text-sm">
          <p>1. Connect your Base wallet using the button in the navigation</p>
          <p>2. Purchase tokens on Zora or your favorite Base DEX</p>
          <p>3. Return here to stake, trade, and unlock utilities</p>
          <p>4. Participate in the community to earn more rewards</p>
        </div>
      </Card>
    </div>
  );
}
