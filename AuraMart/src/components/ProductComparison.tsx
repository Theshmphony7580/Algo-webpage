import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductComparisonProps {
  products: Product[];
  onClose: () => void;
  onRemove: (id: number) => void;
}

export const ProductComparison = ({ products, onClose, onRemove }: ProductComparisonProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({ title: 'Added to cart', description: `${product.name} added to your cart` });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-0 left-0 right-0 max-h-[80vh] glass-card rounded-t-3xl p-6 overflow-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Compare Products ({products.length})</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <motion.div
                key={product.id}
                layout
                className="glass-card p-4 space-y-3"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80"
                    onClick={() => onRemove(product.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div>
                  <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span className="text-xs">{product.rating}</span>
                    </div>
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="text-foreground">{product.category}</span>
                  </div>
                  {product.features?.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="line-clamp-2">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
