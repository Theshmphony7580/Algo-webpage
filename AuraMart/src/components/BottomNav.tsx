import { Home, ShoppingBag, Heart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

export const BottomNav = () => {
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistIds } = useWishlist();

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/shop', icon: ShoppingBag, label: 'Shop' },
    { to: '/cart', icon: ShoppingBag, label: 'Cart', badge: cartCount },
    { to: '/about', icon: User, label: 'About' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-white/10 z-40 safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              className="relative flex flex-col items-center justify-center flex-1 h-full group"
              aria-label={item.label}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Icon
                  className={`w-6 h-6 transition-smooth ${
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                  }`}
                />
                {item.badge && item.badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold"
                  >
                    {item.badge}
                  </motion.span>
                )}
              </motion.div>
              <span
                className={`text-xs mt-1 transition-smooth ${
                  isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-b-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
