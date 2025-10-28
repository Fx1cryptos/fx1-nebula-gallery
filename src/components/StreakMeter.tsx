import React from 'react';
import { Flame } from 'lucide-react';

interface StreakMeterProps {
  currentStreak: number;
  maxStreak?: number;
}

export function StreakMeter({ currentStreak, maxStreak = 30 }: StreakMeterProps) {
  const progress = Math.min((currentStreak / maxStreak) * 100, 100);
  
  return (
    <div className="my-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Flame className={`w-8 h-8 ${currentStreak > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
        <h4 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {currentStreak} Day Streak
        </h4>
      </div>
      
      <div className="relative w-full h-6 bg-background rounded-full overflow-hidden border border-border">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-3">
        Complete tasks daily to build your streak! 🔥
      </p>
      
      {currentStreak >= 7 && (
        <div className="mt-3 text-center">
          <span className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-xs text-accent-foreground font-semibold">
            🎉 {currentStreak >= 30 ? 'Legendary Streak!' : currentStreak >= 14 ? 'Epic Streak!' : 'Great Streak!'}
          </span>
        </div>
      )}
    </div>
  );
}
