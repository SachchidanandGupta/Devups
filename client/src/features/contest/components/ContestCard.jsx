import React from "react";

const ContestCard = ({ contest }) => {
  const { 
    platform = "Unknown", 
    title = "Upcoming Contest", 
    startTime, 
    duration 
  } = contest || {};

  // Preserve existing formatting logic
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

  // Derive live status
  const now = new Date();
  const start = new Date(startTime);
  const diffMins = (start - now) / 60000;
  const liveStatus = diffMins < 0 ? "LIVE_NOW" : diffMins < 60 ? "STARTING_SOON" : null;

  // Determine platform badge styles
  const normalizedPlatform = platform.toLowerCase();
  let badgeStyles = "border-border text-text-muted"; 
  if (normalizedPlatform.includes("leetcode")) {
    badgeStyles = "border-accent text-accent";
  } else if (normalizedPlatform.includes("codeforces")) {
    badgeStyles = "border-warning text-warning";
  }

  return (
    <div className="flex justify-between items-center gap-4 border-b border-border py-3 px-4 hover:bg-surface-2 font-mono transition-colors">
      
      {/* LEFT: Title & Status */}
      <div className="flex flex-col gap-1 w-[40%] min-w-0">
        {liveStatus && (
          <span className="text-accent text-xs animate-pulse font-bold">
            {liveStatus}
          </span>
        )}
        <span className="text-text-primary text-sm uppercase truncate">
          {title}
        </span>
      </div>

      {/* MIDDLE: Schedule Info */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <span className="text-text-muted text-xs truncate">
          START: {formattedStartTime}
        </span>
        <span className="text-text-muted text-xs truncate">
          DURATION: {formatDuration(duration)}
        </span>
      </div>

      {/* RIGHT: Platform Badge */}
      <div className="shrink-0 flex justify-end">
        <span className={`border text-xs px-2 py-1 uppercase tracking-widest ${badgeStyles}`}>
          {platform}
        </span>
      </div>
      
    </div>
  );
};

export default ContestCard;