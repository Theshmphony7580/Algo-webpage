import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { products, Product } from '@/data/products';
import { ProductCard } from './ProductCard';

interface RelatedProductsProps {
  currentProduct: Product;
}

export const RelatedProducts = ({ currentProduct }: RelatedProductsProps) => {
  const related = products
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 flex items-center gap-3"
      >
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold">You May Also Like</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};
