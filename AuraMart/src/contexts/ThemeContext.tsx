import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeVariant = 'default' | 'cyberpunk' | 'synthwave' | 'nord';

interface ThemeContextType {
  theme: 'light' | 'dark';
  themeVariant: ThemeVariant;
  toggleTheme: () => void;
  setThemeVariant: (variant: ThemeVariant) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors = {
  default: { primary: '199 95% 60%', accent: '210 100% 70%' },
  cyberpunk: { primary: '280 95% 65%', accent: '330 100% 70%' },
  synthwave: { primary: '330 100% 65%', accent: '180 100% 60%' },
  nord: { primary: '213 32% 52%', accent: '210 34% 63%' },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [themeVariant, setThemeVariantState] = useState<ThemeVariant>('default');

  useEffect(() => {
    const storedTheme = localStorage.getItem('aura-theme') as 'light' | 'dark' | null;
    const storedVariant = localStorage.getItem('aura-theme-variant') as ThemeVariant | null;
    
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    
    if (storedVariant) {
      setThemeVariantState(storedVariant);
      applyThemeVariant(storedVariant);
    }
  }, []);

  const applyThemeVariant = (variant: ThemeVariant) => {
    const colors = themeColors[variant];
    document.documentElement.style.setProperty('--primary', colors.primary);
    document.documentElement.style.setProperty('--accent', colors.accent);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('aura-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const setThemeVariant = (variant: ThemeVariant) => {
    setThemeVariantState(variant);
    localStorage.setItem('aura-theme-variant', variant);
    applyThemeVariant(variant);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeVariant, toggleTheme, setThemeVariant }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
