import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BaseProvider } from "@/providers/BaseProvider";
import { Suspense, lazy } from "react";

// Pages – Token-Gated Fashion Ecosystem (lazy-loaded to avoid unused deps at startup)
const Index = lazy(() => import("./pages/Index"));
const Gallery = lazy(() => import("./pages/Gallery"));
const CreateArt = lazy(() => import("./pages/CreateArt"));
const Auth = lazy(() => import("./pages/Auth"));
const Stake = lazy(() => import("./pages/Stake"));
const Trade = lazy(() => import("./pages/Trade"));
const Runway = lazy(() => import("./pages/Runway"));
const WearToEarn = lazy(() => import("./pages/WearToEarn"));
const Referrals = lazy(() => import("./pages/Referrals"));
const About = lazy(() => import("./pages/About"));
const Social = lazy(() => import("./pages/Social"));
const Rewards = lazy(() => import("./pages/Rewards"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Arena = lazy(() => import("./pages/Arena"));
const FX1Flux = lazy(() => import("./pages/FX1Flux"));
const Tokens = lazy(() => import("./pages/Tokens"));
const MintCrush = lazy(() => import("./pages/MintCrush")); // New: NFT Mint Game
const CreatorDashboard = lazy(() => import("./pages/CreatorDashboard")); // New: Creator Hub
const FarcasterConnect = lazy(() => import("./pages/FarcasterConnect")); // New: Farcaster Integration
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <BaseProvider>
      <TooltipProvider>
        {/* Toast Notifications – Gold Glow */}
        <Toaster />
        <Sonner />

        {/* Royal Router – Metaverse Navigation */}
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-pulse text-primary text-xl">Loading FX1 Digital Hubs...</div>
              </div>
            }
          >
            <Routes>
              {/* Core Journey */}
              <Route path="/" element={<Index />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/create" element={<CreateArt />} />
              <Route path="/auth" element={<Auth />} />

              {/* $FX1_HUBS Utility Hub */}
              <Route path="/stake" element={<Stake />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/runway" element={<Runway />} />
              <Route path="/wear-to-earn" element={<WearToEarn />} />
              <Route path="/referrals" element={<Referrals />} />

              {/* Play-to-Mint Game – NFT Mining */}
              <Route path="/mint-crush" element={<MintCrush />} />

              {/* Creator & Social Hub */}
              <Route path="/creator-dashboard" element={<CreatorDashboard />} />
              <Route path="/farcaster" element={<FarcasterConnect />} />

              {/* Community & Rewards */}
              <Route path="/about" element={<About />} />
              <Route path="/social" element={<Social />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/arena" element={<Arena />} />
              <Route path="/fx1-flux" element={<FX1Flux />} />
              <Route path="/tokens" element={<Tokens />} />

              {/* 404 – Royal Void */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </BaseProvider>
  );
};

export default App;