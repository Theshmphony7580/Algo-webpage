import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ShoppingCart, ArrowLeft, Sparkles, Check, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';
import { toast } from 'sonner';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ImageGallery } from '@/components/ImageGallery';
import { RelatedProducts } from '@/components/RelatedProducts';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { ARPreview } from '@/components/ARPreview';
import { FrequentlyBoughtTogether } from '@/components/FrequentlyBoughtTogether';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const product = products.find(p => p.id === Number(id));

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

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

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Breadcrumbs />

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-3xl"
          >
            <ImageGallery images={[product.image, product.image]} alt={product.name} />
            {product.aiGenerated && (
              <Badge className="mt-4 bg-primary/90 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Enhanced
              </Badge>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-4">
              <Badge variant="outline" className="neon-border mb-4">
                {product.category.toUpperCase()}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-primary mb-6">
                ${product.price}
              </p>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              {product.description}
            </p>

            {/* Features */}
            <div className="glass-card p-6 mb-8">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Key Features
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="p-1 rounded-full bg-primary/20 shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-auto flex-wrap">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 gap-2 glow"
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
              <Button
                onClick={() => {
                  toggleWishlist(product.id);
                  toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
                }}
                size="lg"
                variant={inWishlist ? "default" : "outline"}
                className={inWishlist ? "glow" : "neon-border"}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </Button>
              <ARPreview productName={product.name} productImage={product.image} />
            </div>
          </motion.div>
        </div>

        {/* Frequently Bought Together */}
        <div className="mt-16">
          <FrequentlyBoughtTogether currentProduct={product} />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts currentProduct={product} />
        </div>

        {/* Recently Viewed */}
        <div className="mt-16">
          <RecentlyViewed />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
