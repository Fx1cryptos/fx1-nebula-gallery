import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BaseProvider } from "@/providers/BaseProvider";

// Pages – Token-Gated Fashion Ecosystem
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import CreateArt from "./pages/CreateArt";
import Auth from "./pages/Auth";
import Stake from "./pages/Stake";
import Trade from "./pages/Trade";
import Runway from "./pages/Runway";
import WearToEarn from "./pages/WearToEarn";
import Referrals from "./pages/Referrals";
import About from "./pages/About";
import Social from "./pages/Social";
import Rewards from "./pages/Rewards";
import Leaderboard from "./pages/Leaderboard";
import Arena from "./pages/Arena";
import FX1Flux from "./pages/FX1Flux";
import Tokens from "./pages/Tokens";
import MintCrush from "./pages/MintCrush"; // New: NFT Mint Game
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BaseProvider>
      <TooltipProvider>
        {/* Toast Notifications – Gold Glow */}
        <Toaster />
        <Sonner />

        {/* Royal Router – Metaverse Navigation */}
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </BaseProvider>
  );
};

export default App;