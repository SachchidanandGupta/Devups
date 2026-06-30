import React from "react";
import useAuthStore from "../../auth/store/authStore";
import useDashboard from "../hooks/useDashboard";
import XPbar from "./XPBar2";
import StreakCard from "./StreakCard";
const StatsCard = () => {
  const { leetcodeSolved } = useDashboard();
  const { easy = 0, medium = 0, hard = 0 } = leetcodeSolved || {};
  const totalSolved = easy + medium + hard;
  return (
      
  <div className="flex flex-col h-full w-full gap-4 font-mono">
  <div>
    <XPbar />
  </div>
  
  <div className="flex flex-col w-full h-full bg-black">
    
    <div className="uppercase bg-surface-2 flex justify-between items-center px-4 py-2 w-full border border-border">
      <span className="text-sm font-bold tracking-widest text-text-primary truncate pr-4">
        Intelligence_wing_metrics
      </span>
      <span className="text-accent animate-pulse text-xs font-bold tracking-widest shrink-0">
        LIVE
      </span>
    </div>
    
    <div className="w-full p-4 border border-t-0 border-border flex flex-col gap-5">
      
      <div className="text-text-secondary pb-2 text-xs uppercase tracking-widest border-b border-border">
        QUERY_RESOLUTION_DISTRIBUTION
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-4 bg-accent"></div>
            <span className="text-sm font-bold text-text-primary uppercase tracking-wider">Easy</span>
          </div>
          <span className="text-xl font-bold text-accent">{easy}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-4 bg-warning"></div>
            <span className="text-sm font-bold text-text-primary uppercase tracking-wider">Medium</span>
          </div>
          <span className="text-xl font-bold text-warning">{medium}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-4 bg-danger"></div>
            <span className="text-sm font-bold text-text-primary uppercase tracking-wider">Hard</span>
          </div>
          <span className="text-xl font-bold text-danger">{hard}</span>
        </div>
      </div>
      
      <div className="mt-2">
        <StreakCard />
      </div>
      
    </div>
  </div>
</div>
   
  
  );
};

export default StatsCard;
