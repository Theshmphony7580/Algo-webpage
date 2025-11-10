import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, X } from 'lucide-react';
import { Button } from './ui/button';

interface ARPreviewProps {
  productName: string;
  productImage: string;
}

export const ARPreview = ({ productName, productImage }: ARPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Box className="w-5 h-5" />
        View in AR
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 max-w-2xl w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">AR Preview: {productName}</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden">
                <motion.img
                  src={productImage}
                  alt={productName}
                  className="absolute inset-0 w-full h-full object-contain p-8"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                />
                
                <div className="absolute bottom-4 left-4 glass-card px-3 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>AR Mode Active</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-4 text-center">
                Move your device to view the product from different angles
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
