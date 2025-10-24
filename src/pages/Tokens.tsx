import { Link } from 'react-router-dom';
import { TokenUtility } from '@/components/TokenUtility';
import { WalletConnect } from '@/components/WalletConnect';

export default function Tokens() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="FX1 Digital Hubs" className="w-12 h-12" />
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  FX1 Digital Hubs
                </h1>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/tokens" className="text-primary font-semibold">
                Tokens
              </Link>
              <Link to="/trade" className="text-foreground hover:text-primary transition-colors">
                Trade
              </Link>
              <Link to="/stake" className="text-foreground hover:text-primary transition-colors">
                Stake
              </Link>
            </div>
            
            <WalletConnect />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <TokenUtility />
      </div>
    </div>
  );
}
