import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export const ImageGallery = ({ images, alt }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <motion.div 
          className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 group"
          whileHover={{ scale: 1.02 }}
        >
          <motion.img
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={images[selectedImage]}
            alt={alt}
            className="w-full h-full object-cover"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-smooth"
            onClick={() => setIsZoomed(true)}
            aria-label="Zoom image"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-smooth ${
                  selectedImage === index
                    ? 'border-primary shadow-[0_0_15px_rgba(56,189,248,0.5)]'
                    : 'border-border hover:border-primary/50'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <img src={image} alt={`${alt} ${index + 1}`} className="w-full h-full object-cover" />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 text-white hover:bg-white/10"
              onClick={() => setIsZoomed(false)}
              aria-label="Close zoom"
            >
              <X className="w-6 h-6" />
            </Button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={images[selectedImage]}
              alt={alt}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
