import React from "react";
import useAuthStore from "../../auth/store/authStore";
import useDashboard from '../hooks/useDashboard';

const StreakCard = () => {
  const {streak = 0, maxStreak = 0} = useDashboard();


  return (
    <div className="bg-surface p-6 sm:p-7 border border-border  w-full max-w-sm font-mono relative ">
      
      <div className="absolute -top-12 -left-12 w-32 h-32   pointer-events-none group-hover:bg-orange-500/20 transition-all duration-500"></div>

      <div className="flex items-center justify-between relative z-10">
        
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14  bg-surface border border-border  ">
            <span className="text-2xl ">🔥</span>
          </div>
          
          <div>
            <p className="text-sm font-semibold text-text-secondary uppercase">
              Current Streak
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-accent ">{streak}</span>
              <span className="text-sm font-bold text-accent">days</span>
            </div>
          </div>
        </div>

        <div className="h-12 w-px bg-border hidden sm:block"></div>

        <div className="text-right">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-0.5">
            Personal Best
          </p>
          <div className="flex items-baseline gap-1 justify-end">
            <span className="text-xl font-black text-warning ">{maxStreak}</span>
            <span className="text-xs font-bold text-text-primary">days</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default StreakCard;