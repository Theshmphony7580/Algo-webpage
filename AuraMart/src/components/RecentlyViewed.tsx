import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';
import { products } from '@/data/products';
import { ProductCard } from './ProductCard';

export const RecentlyViewed = () => {
  const { recentlyViewed } = useRecentlyViewed();
  const recentProducts = products.filter((p) => recentlyViewed.includes(p.id)).slice(0, 4);

  if (recentProducts.length === 0) return null;

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-3"
      >
        <Clock className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold">Recently Viewed</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};
