import { useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Trash2, Heart } from 'lucide-react';
import { CartItem } from '@/contexts/CartContext';

interface SwipeableCartItemProps {
  item: CartItem;
  onDelete: () => void;
  onWishlist: () => void;
  children: React.ReactNode;
}

export const SwipeableCartItem = ({ item, onDelete, onWishlist, children }: SwipeableCartItemProps) => {
  const x = useMotionValue(0);
  const constraintsRef = useRef(null);
  
  const leftActionOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0]);
  const rightActionOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x < -100) {
      onDelete();
    } else if (info.offset.x > 100) {
      onWishlist();
    }
    x.set(0);
  };

  return (
    <div className="relative overflow-hidden rounded-lg" ref={constraintsRef}>
      {/* Left Action (Delete) */}
      <motion.div
        className="absolute inset-y-0 left-0 w-24 flex items-center justify-center bg-destructive"
        style={{ opacity: leftActionOpacity }}
      >
        <Trash2 className="w-6 h-6 text-white" />
      </motion.div>

      {/* Right Action (Wishlist) */}
      <motion.div
        className="absolute inset-y-0 right-0 w-24 flex items-center justify-center bg-primary"
        style={{ opacity: rightActionOpacity }}
      >
        <Heart className="w-6 h-6 text-white" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -150, right: 150 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="relative bg-background"
      >
        {children}
      </motion.div>
    </div>
  );
};
