import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { sdk } from "@farcaster/miniapp-sdk"; // Base Mini App SDK

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
import NotFound from "./pages/NotFound";

const App = () => {
  useEffect(() => {
    // Signal to Base Mini App that the app is ready
    sdk.actions
      .ready()
      .then(() => console.log("FX1 Mini App is ready on Base!"))
      .catch((err) => console.error("Mini App ready error:", err));
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/create" element={<CreateArt />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/runway" element={<Runway />} />
          <Route path="/wear-to-earn" element={<WearToEarn />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/about" element={<About />} />
          <Route path="/social" element={<Social />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/fx1-flux" element={<FX1Flux />} />
          <Route path="/tokens" element={<Tokens />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;