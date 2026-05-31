import React from "react";
import { FiCalendar, FiClock } from "react-icons/fi";

const ContestCard = ({ contest }) => {
  const { 
    platform = "Unknown", 
    title = "Upcoming Contest", 
    startTime, 
    duration 
  } = contest || {};

  
  
  const formattedStartTime = startTime ? new Date(startTime).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).replace(",", " •") : "TBA";

 
  const formatDuration = (val) => {
    if (!val) return "Unknown";
    const num = Number(val);
    if (isNaN(num)) return val; 

    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours} Hour${hours > 1 ? 's' : ''}`;
    return `${minutes} Mins`;
  };


  const normalizedPlatform = platform.toLowerCase();
  let badgeStyles = "bg-zinc-800 text-slate-400 border border-zinc-700"; 
  
  if (normalizedPlatform.includes("leetcode")) {
    badgeStyles = "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]";
  } else if (normalizedPlatform.includes("codeforces")) {
    badgeStyles = "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]";
  }

  return (
    <div className="flex flex-col justify-between bg-zinc-900/40 p-5 sm:p-6 rounded-2xl border border-zinc-800/60 hover:bg-zinc-900 hover:border-zinc-700/80 transition-all duration-300 group h-full">
      
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-md tracking-wider uppercase ${badgeStyles}`}>
          {platform}
        </span>
        
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] mt-1.5 opacity-70 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-200 group-hover:text-white transition-colors line-clamp-2">
          {title}
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mt-auto border-t border-zinc-800/60 pt-4">
        
        <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-300 transition-colors">
          <FiCalendar className="text-slate-500" size={16} />
          <span className="text-sm font-semibold tracking-wide">
            {formattedStartTime}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-300 transition-colors">
          <FiClock className="text-slate-500" size={16} />
          <span className="text-sm font-semibold tracking-wide">
            {formatDuration(duration)}
          </span>
        </div>

      </div>
      
    </div>
  );
};

export default ContestCard;