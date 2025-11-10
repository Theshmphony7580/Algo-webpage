import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useCart();

  const handleCheckout = () => {
    toast.success('Order placed!', {
      description: 'Thank you for shopping with AURA MART! 🎉'
    });
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="glass-card p-12 rounded-3xl max-w-md mx-auto">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <ShoppingBag className="w-20 h-20 text-primary glow" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Discover our amazing products and start shopping!
            </p>
            <Link to="/shop">
              <Button size="lg" className="gap-2 glow">
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">
            {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 flex flex-col sm:flex-row gap-6"
                >
                  {/* Image */}
                  <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                    <p className="text-primary font-semibold mb-4">${item.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-lg">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success('Removed from cart');
                        }}
                        className="ml-auto text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Subtotal</p>
                    <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-primary font-semibold">FREE</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                size="lg"
                className="w-full gap-2 glow mb-4"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Link to="/shop">
                <Button variant="outline" size="lg" className="w-full neon-border">
                  Continue Shopping
                </Button>
              </Link>

              <div className="mt-6 p-4 glass-card rounded-xl">
                <p className="text-sm text-muted-foreground text-center">
                  🔒 Secure checkout powered by AI encryption
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
