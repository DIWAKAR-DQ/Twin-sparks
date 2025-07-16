import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Camera from "./pages/Camera";
import Description from "./pages/Description";
import GenerateCatalog from "./pages/GenerateCatalog";
import AIChat from "./pages/AIChat";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Routes with Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/camera" element={<Layout><Camera /></Layout>} />
          <Route path="/description" element={<Layout><Description /></Layout>} />
          <Route path="/generate-catalog" element={<Layout><GenerateCatalog /></Layout>} />
          <Route path="/ai-chat" element={<Layout><AIChat /></Layout>} />
          <Route path="/explore" element={<Layout><Explore /></Layout>} />
          <Route path="/terms" element={<Layout><Terms /></Layout>} />
          
          {/* Auth routes without Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
