import React from 'react';
import useDashboard from '../hooks/useDashboard';

const XPbar = () => {
  const { xp, level } = useDashboard();

  const xpInCurrentLevel = xp % 100;
  const progressPercentage = Math.floor((xpInCurrentLevel / 100) * 100);
  const xpToNextLevel = 100 - xpInCurrentLevel;

  return (
    <div className="w-full flex flex-col gap-1 font-mono">
      <div className="flex justify-between items-center text-xs text-text-secondary uppercase">
        <span>LVL_{level}</span>
        <span>{xpInCurrentLevel}/100 XP — {xpToNextLevel} TO NEXT</span>
      </div>
      <div className="w-full h-3 bg-surface-2 border border-border">
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default XPbar;