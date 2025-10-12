import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
