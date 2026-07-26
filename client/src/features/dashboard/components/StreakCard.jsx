import React from "react";
import useDashboard from "../hooks/useDashboard";

const StreakCard = () => {
  const { streak = 0 } = useDashboard();

  const totalBoxes = Math.min(streak + 1, 5);
  const filledBoxes = Math.min(streak, 4);

  return (
    <div className="border-t border-border pt-4 mt-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full font-sans min-w-0">
  
  <div className="flex flex-col min-w-0">
    <span className="text-xs text-text-secondary uppercase tracking-widest truncate">
      streak_persistence
    </span>
    <span className="text-accent text-xl font-bold mt-0.5">
      {streak} <span className="text-xs text-text-primary tracking-widest ml-1">DAYS</span>
    </span>
  </div>
  
  <div className="flex flex-wrap gap-1.5 shrink-0">
    {Array.from({ length: totalBoxes }, (_, index) => (
      <div
        key={index}
        className={`w-3 h-3 ${
          index < filledBoxes 
            ? "bg-accent shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.4)]" 
            : "bg-surface-2 border border-border"
        }`}
      />
    ))}
  </div>
  
</div>
  );
};

export default StreakCard;
