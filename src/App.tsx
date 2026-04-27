import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/Navbar";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chatbot/ChatWidget";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import ProjectIntake from "./pages/ProjectIntake";
import ClientPortal from "./pages/ClientPortal";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project-intake" element={<ProjectIntake />} />
          <Route path="/client-portal" element={<ClientPortal />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ChatWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
