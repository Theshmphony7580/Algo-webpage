import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

interface GamificationContextType {
  points: number;
  level: number;
  badges: Badge[];
  addPoints: (amount: number, reason: string) => void;
  checkBadges: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const initialBadges: Badge[] = [
  { id: 'first-purchase', name: 'First Steps', description: 'Make your first purchase', icon: '🎯', earned: false },
  { id: 'five-purchases', name: 'Regular Shopper', description: 'Make 5 purchases', icon: '🛍️', earned: false },
  { id: 'wishlist-master', name: 'Wishlist Master', description: 'Add 10 items to wishlist', icon: '❤️', earned: false },
  { id: 'review-writer', name: 'Reviewer', description: 'Write your first review', icon: '⭐', earned: false },
  { id: 'points-collector', name: 'Points Collector', description: 'Earn 1000 points', icon: '💎', earned: false },
];

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('aura-points');
    return saved ? parseInt(saved) : 0;
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('aura-badges');
    return saved ? JSON.parse(saved) : initialBadges;
  });

  const level = Math.floor(points / 500) + 1;

  useEffect(() => {
    localStorage.setItem('aura-points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('aura-badges', JSON.stringify(badges));
  }, [badges]);

  const addPoints = (amount: number, reason: string) => {
    setPoints(prev => prev + amount);
  };

  const checkBadges = () => {
    // This would check various conditions and unlock badges
    if (points >= 1000) {
      setBadges(prev => prev.map(b => 
        b.id === 'points-collector' ? { ...b, earned: true } : b
      ));
    }
  };

  return (
    <GamificationContext.Provider value={{ points, level, badges, addPoints, checkBadges }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) throw new Error('useGamification must be used within GamificationProvider');
  return context;
};
