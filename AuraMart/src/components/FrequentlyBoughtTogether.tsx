import { motion } from 'framer-motion';
import { Plus, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Product, products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface FrequentlyBoughtTogetherProps {
  currentProduct: Product;
}

export const FrequentlyBoughtTogether = ({ currentProduct }: FrequentlyBoughtTogetherProps) => {
  const { addToCart } = useCart();
  
  // Get 2 random related products from the same category
  const relatedProducts = products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 2);

  if (relatedProducts.length === 0) return null;

  const totalPrice = currentProduct.price + relatedProducts.reduce((sum, p) => sum + p.price, 0);
  const savings = Math.round(totalPrice * 0.1);

  const handleAddAllToCart = () => {
    addToCart(currentProduct);
    relatedProducts.forEach(p => addToCart(p));
    toast({
      title: 'Bundle added to cart',
      description: `Saved $${savings}! All items added successfully.`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <h3 className="text-xl font-bold mb-4">Frequently Bought Together</h3>
      
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-border">
          <img src={currentProduct.image} alt={currentProduct.name} className="w-full h-full object-cover" />
        </div>
        
        {relatedProducts.map((product, idx) => (
          <div key={product.id} className="flex items-center gap-4">
            <Plus className="w-5 h-5 text-muted-foreground" />
            <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-border">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">${totalPrice - savings}</span>
            <span className="text-lg text-muted-foreground line-through">${totalPrice}</span>
          </div>
          <p className="text-sm text-green-500">Save ${savings} when bought together</p>
        </div>
        
        <Button onClick={handleAddAllToCart} size="lg" className="gap-2">
          <ShoppingCart className="w-5 h-5" />
          Add Bundle to Cart
        </Button>
      </div>
    </motion.div>
  );
};
