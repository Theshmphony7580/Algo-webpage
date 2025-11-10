import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuraAssistant } from "@/components/AuraAssistant";
import { BottomNav } from "@/components/BottomNav";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { BackToTop } from "@/components/BackToTop";
import { LivePurchaseNotifications } from "@/components/LivePurchaseNotifications";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = {
  duration: 0.3
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
            <Home />
          </motion.div>
        } />
        <Route path="/shop" element={
          <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
            <Shop />
          </motion.div>
        } />
        <Route path="/product/:id" element={
          <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
            <ProductDetail />
          </motion.div>
        } />
        <Route path="/cart" element={
          <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
            <Cart />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
            <About />
          </motion.div>
        } />
        <Route path="*" element={
          <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
            <NotFound />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <GamificationProvider>
        <CartProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <ScrollProgressBar />
                  <div className="flex flex-col min-h-screen pb-16 md:pb-0">
                    <Navbar />
                    <main className="flex-1">
                      <AnimatedRoutes />
                    </main>
                    <Footer />
                    <AuraAssistant />
                    <BottomNav />
                    <BackToTop />
                    <LivePurchaseNotifications />
                    <PWAInstallPrompt />
                  </div>
                </BrowserRouter>
              </TooltipProvider>
            </RecentlyViewedProvider>
          </WishlistProvider>
        </CartProvider>
      </GamificationProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
