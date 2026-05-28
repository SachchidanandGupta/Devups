import React from 'react';
import useDashboard from '../hooks/useDashboard';

const XPbar = () => {
  const { xp, level } = useDashboard();
  
  const xpInCurrentLevel = xp % 100;
  const progressPercentage = Math.floor((xpInCurrentLevel / 100) * 100);
  const xpToNextLevel = 100 - xpInCurrentLevel;

  return (
    <div className="bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl w-full max-w-md font-sans">
      
      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
            Current Level
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-100">{level}</span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
            Total Experience
          </p>
          <p className="text-2xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            {xp} <span className="text-sm font-bold text-cyan-500/70">XP</span>
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm font-bold text-slate-300">
          <span>Level Progress</span>
          <span className="text-cyan-400">{progressPercentage}%</span>
        </div>

        <div className="w-full bg-zinc-900 rounded-full h-3 overflow-hidden border border-zinc-800/50">
          <div 
            className=" bg-gradient-to-r from-blue-600 to-cyan-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="pt-2 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Earn <span className="font-bold text-slate-300">{xpToNextLevel} more XP</span> to reach Level {level + 1}
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default XPbar;