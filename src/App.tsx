
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import DatabaseConnections from "./pages/DatabaseConnections";
import RuleManagement from "./pages/RuleManagement";
import ClaimsSearch from "./pages/ClaimsSearch";
import ClaimDetail from "./pages/ClaimDetail";
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
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/database" element={<DatabaseConnections />} />
          <Route path="/admin/rules" element={<RuleManagement />} />
          <Route path="/claims/search" element={<ClaimsSearch />} />
          <Route path="/claims/detail/:claimId" element={<ClaimDetail />} />
          <Route path="/demo" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Demo page - Coming Soon</h1></div>} />
          <Route path="/features" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Features page - Coming Soon</h1></div>} />
          <Route path="/documentation" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Documentation page - Coming Soon</h1></div>} />
          <Route path="/support" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Support page - Coming Soon</h1></div>} />
          <Route path="/about" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">About page - Coming Soon</h1></div>} />
          <Route path="/privacy" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Privacy Policy - Coming Soon</h1></div>} />
          <Route path="/terms" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Terms of Service - Coming Soon</h1></div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
