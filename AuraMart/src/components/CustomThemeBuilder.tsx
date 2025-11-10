import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Save, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { toast } from '@/hooks/use-toast';

export const CustomThemeBuilder = () => {
  const [primaryHue, setPrimaryHue] = useState(199);
  const [accentHue, setAccentHue] = useState(210);

  const applyCustomTheme = () => {
    document.documentElement.style.setProperty('--primary', `${primaryHue} 95% 60%`);
    document.documentElement.style.setProperty('--accent', `${accentHue} 100% 70%`);
    localStorage.setItem('custom-theme', JSON.stringify({ primaryHue, accentHue }));
    toast({ title: 'Theme applied', description: 'Your custom theme has been saved' });
  };

  const resetTheme = () => {
    setPrimaryHue(199);
    setAccentHue(210);
    document.documentElement.style.setProperty('--primary', '199 95% 60%');
    document.documentElement.style.setProperty('--accent', '210 100% 70%');
    localStorage.removeItem('custom-theme');
    toast({ title: 'Theme reset', description: 'Default theme restored' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 space-y-6"
    >
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Custom Theme Builder</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Primary Color (Hue: {primaryHue}°)</Label>
          <div className="flex items-center gap-4 mt-2">
            <Input
              type="range"
              min="0"
              max="360"
              value={primaryHue}
              onChange={(e) => setPrimaryHue(Number(e.target.value))}
              className="flex-1"
            />
            <div
              className="w-12 h-12 rounded-lg border-2 border-border"
              style={{ backgroundColor: `hsl(${primaryHue}, 95%, 60%)` }}
            />
          </div>
        </div>

        <div>
          <Label>Accent Color (Hue: {accentHue}°)</Label>
          <div className="flex items-center gap-4 mt-2">
            <Input
              type="range"
              min="0"
              max="360"
              value={accentHue}
              onChange={(e) => setAccentHue(Number(e.target.value))}
              className="flex-1"
            />
            <div
              className="w-12 h-12 rounded-lg border-2 border-border"
              style={{ backgroundColor: `hsl(${accentHue}, 100%, 70%)` }}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={applyCustomTheme} className="flex-1 gap-2">
          <Save className="w-4 h-4" />
          Apply Theme
        </Button>
        <Button onClick={resetTheme} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>
    </motion.div>
  );
};
