import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';
import { useGamification } from '@/contexts/GamificationContext';
import { Progress } from './ui/progress';

export const GamificationDisplay = () => {
  const { points, level, badges } = useGamification();
  const nextLevelPoints = level * 500;
  const currentLevelProgress = (points % 500) / 500 * 100;
  const earnedBadges = badges.filter(b => b.earned);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 mb-6"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Level {level}</span>
              <span className="text-sm text-muted-foreground">{points} pts</span>
            </div>
            <p className="text-xs text-muted-foreground">{nextLevelPoints - points} pts to next level</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {earnedBadges.slice(0, 3).map(badge => (
            <div
              key={badge.id}
              className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-lg"
              title={badge.name}
            >
              {badge.icon}
            </div>
          ))}
          {earnedBadges.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">
              +{earnedBadges.length - 3}
            </div>
          )}
        </div>
      </div>

      <Progress value={currentLevelProgress} className="h-2" />
    </motion.div>
  );
};
