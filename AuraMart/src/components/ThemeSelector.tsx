import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, themeVariant, setThemeVariant } = useTheme();

  const variants = [
    { id: 'default', name: 'Neon Blue', colors: ['hsl(199, 95%, 60%)', 'hsl(210, 100%, 70%)'] },
    { id: 'cyberpunk', name: 'Cyberpunk', colors: ['hsl(280, 95%, 65%)', 'hsl(330, 100%, 70%)'] },
    { id: 'synthwave', name: 'Synthwave', colors: ['hsl(330, 100%, 65%)', 'hsl(180, 100%, 60%)'] },
    { id: 'nord', name: 'Nord', colors: ['hsl(213, 32%, 52%)', 'hsl(210, 34%, 63%)'] },
  ];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select theme variant"
        className="relative"
      >
        <Palette className="w-5 h-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-12 w-64 glass-card p-4 z-50 space-y-3"
            >
              <p className="text-sm font-medium mb-3">Choose Theme Variant</p>
              {variants.map((variant) => (
                <motion.button
                  key={variant.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setThemeVariant(variant.id as any);
                    setIsOpen(false);
                  }}
                  className={`w-full p-3 rounded-lg border transition-smooth flex items-center justify-between ${
                    themeVariant === variant.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {variant.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border-2 border-background"
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{variant.name}</span>
                  </div>
                  {themeVariant === variant.id && <Check className="w-4 h-4 text-primary" />}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
