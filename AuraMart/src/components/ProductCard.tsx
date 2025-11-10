import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ShoppingCart, Sparkles, Heart, Star, Eye, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
}

export const ProductCard = ({ product, index = 0, onQuickView }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="glass-card overflow-hidden h-full transition-smooth hover:shadow-xl hover:shadow-primary/20">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-smooth group-hover:scale-110"
              whileHover={{ scale: 1.1 }}
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.trending && (
                <Badge className="trending-badge bg-gradient-to-r from-primary to-accent text-primary-foreground relative">
                  <TrendingUp className="w-3 h-3 mr-1 relative z-10" />
                  <span className="relative z-10">Trending</span>
                </Badge>
              )}
              {product.aiGenerated && (
                <Badge className="bg-primary/90 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Enhanced
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive" className="backdrop-blur-sm">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
              onClick={handleWishlist}
              className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-smooth"
            >
              <Heart
                className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-primary text-primary' : 'text-foreground'}`}
              />
            </motion.button>

            {/* Hover Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end justify-center p-4 gap-2"
            >
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleQuickView}
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
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
              <span className="text-xs text-muted-foreground ml-1">
                ({product.reviews})
              </span>
            </div>

            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-smooth">
                {product.name}
              </h3>
              <Badge variant="outline" className="neon-border shrink-0">
                ${product.price}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {product.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
