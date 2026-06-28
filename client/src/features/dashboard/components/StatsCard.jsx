import React from "react";
import useAuthStore from "../../auth/store/authStore";
import useDashboard from "../hooks/useDashboard";
// import XPbar from "./XPBar2";
import StreakCard from "./StreakCard";
const StatsCard = () => {
  const { leetcodeSolved } = useDashboard();
  const { easy = 0, medium = 0, hard = 0 } = leetcodeSolved || {};
  const totalSolved = easy + medium + hard;
  console.log("statsrendered")
  return (
   
      <div className="flex flex-col justify-between items-center w-full h-full">
        <div className="uppercase bg-surface-2 flex justify-between items-center p-2 w-full border-2 border-border ">
          <span className="text-sm">Intelligence_wing_metrics</span>{" "}
          <span className="text-accent animate-pulse text-xs">LIVE</span>
        </div>
        <div className="w-full p-2 border border-border flex flex-col gap-2 ">
          <div className="text-text-secondary text-sm ">
            QUERY_RESOLUTION_DISTRIBUTION
          </div>
          <div className="flex justify-between items-center p-2 ">
            <div className="flex items-center gap-3 h-full">
              <div className="w-2 h-full bg-accent "></div>
              <span className="text-lg font-semibold  text-text-primary">Easy</span>
            </div>
            <span className="text-xl font-bold text-accent ">
              {easy}
            </span>
          </div>
          <div className="flex justify-between items-center p-2  ">
            <div className="flex items-center gap-3 h-full">
              <div className="w-2 h-full bg-warning"></div>
              <span className="text-sm font-bold text-text-primary">Medium</span>
            </div>
            <span className="text-xl font-bold text-warning">
              {medium}
            </span>
          </div>
          <div className="flex justify-between items-center p-2">
            <div className="flex items-center gap-3 h-full">
              <div className="w-2 h-full bg-danger "></div>
              <span className="text-lg font-semibold text-text-primary">Hard</span>
            </div>
            <span className="text-xl font-bold text-danger ">
              {hard}
            </span>
          </div>
          <StreakCard/>
        </div>
      </div>

   
  
  );
};

export default StatsCard;
