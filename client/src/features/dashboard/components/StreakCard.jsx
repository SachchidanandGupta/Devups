import React from "react";
import useAuthStore from "../../auth/store/authStore";
import useDashboard from '../hooks/useDashboard';

const StreakCard = () => {
  const {streak = 0, maxStreak = 0} = useDashboard();


  return (
    <div className="bg-zinc-950 p-6 sm:p-7 rounded-3xl border border-zinc-800 shadow-2xl w-full max-w-sm font-sans relative overflow-hidden group hover:border-zinc-700 transition-colors duration-300">
      
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/20 transition-all duration-500"></div>

      <div className="flex items-center justify-between relative z-10">
        
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-[0_0_15px_rgba(249,115,22,0.15)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-300">
            <span className="text-2xl drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">🔥</span>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-0.5">
              Current Streak
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">{streak}</span>
              <span className="text-sm font-bold text-slate-400">days</span>
            </div>
          </div>
        </div>

        <div className="h-12 w-px bg-zinc-800 hidden sm:block"></div>

        <div className="text-right">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-0.5">
            Personal Best
          </p>
          <div className="flex items-baseline gap-1 justify-end">
            <span className="text-xl font-black text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">{maxStreak}</span>
            <span className="text-xs font-bold text-purple-500/70">days</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default StreakCard;