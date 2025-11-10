import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Heart, Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast.success('Added to cart!', {
      description: product.name
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4"
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col">
                  <Badge variant="outline" className="neon-border mb-4 w-fit">
                    {product.category.toUpperCase()}
                  </Badge>
                  
                  <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <p className="text-3xl font-bold text-primary mb-4">
                    ${product.price}
                  </p>

                  <p className="text-muted-foreground mb-6">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="glass-card p-4 mb-6">
                    <h3 className="font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="p-1 rounded-full bg-primary/20 shrink-0">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <Button
                      onClick={handleAddToCart}
                      size="lg"
                      className="flex-1 gap-2 glow"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => toggleWishlist(product.id)}
                      className={isInWishlist(product.id) ? 'text-primary' : ''}
                    >
                      <Heart
                        className="w-5 h-5"
                        fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                      />
                    </Button>
                  </div>

                  <Link to={`/product/${product.id}`} onClick={onClose}>
                    <Button variant="ghost" className="w-full mt-3">
                      View Full Details
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
