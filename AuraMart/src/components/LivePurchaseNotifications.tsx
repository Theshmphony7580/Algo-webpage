import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';

export const LivePurchaseNotifications = () => {
  const [notification, setNotification] = useState<{ name: string; location: string } | null>(null);

  useEffect(() => {
    const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'London', 'Paris', 'Tokyo'];
    
    const showRandomNotification = () => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      
      setNotification({
        name: randomProduct.name,
        location: randomLocation
      });

      setTimeout(() => setNotification(null), 5000);
    };

    const interval = setInterval(showRandomNotification, 10000);
    showRandomNotification();

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          className="fixed bottom-24 left-6 z-40 glass-card p-4 max-w-sm md:bottom-8"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Someone in {notification.location}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">just purchased {notification.name}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
