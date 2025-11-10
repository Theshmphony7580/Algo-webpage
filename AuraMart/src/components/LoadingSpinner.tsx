import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <Sparkles className="w-12 h-12 text-primary glow" />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-primary/30"
        />
      </motion.div>
    </div>
  );
};
