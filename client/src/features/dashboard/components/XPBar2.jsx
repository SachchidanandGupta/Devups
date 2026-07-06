import React from "react";
import useDashboard from "../hooks/useDashboard";
import { getLevelTitle } from "../../../shared/constants/levelTitles";
const XPbar = ({ user }) => {
  const { xp, level, currentXP, requiredXP } = user || {};
  const progressPercentage = Math.floor((currentXP / requiredXP) * 100);
  const xpToNextLevel = requiredXP - currentXP;

  return (
    <div className="w-full flex flex-col font-mono gap-2 p-4 border border-border bg-black">
      <div className="flex items-end justify-between gap-4 min-w-0">
        <span className="uppercase text-accent font-bold text-base sm:text-lg truncate flex-1 block">
          LVL {level}_Stability_uplink
        </span>
        <span className="text-xs sm:text-sm text-text-secondary font-bold shrink-0 mb-0.5">
          {currentXP} / {requiredXP} XP
        </span>
      </div>

      <div className="w-full h-2 sm:h-2.5 bg-surface-2 border border-border overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="text-[10px] sm:text-xs text-text-muted uppercase tracking-widest truncate block mt-0.5">
        NEXT_TIER: {getLevelTitle(level)}
      </div>
    </div>
  );
};

export default XPbar;
