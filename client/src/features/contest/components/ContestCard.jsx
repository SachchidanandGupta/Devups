import React, { useEffect, useState } from "react";

const ContestCard = ({ contest }) => {
  const { duration, title, platform, startTime } = contest || {};
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calc = () => {
      const diff = new Date(startTime) - new Date();
      if (diff <= 0) {
        setTimeLeft("LIVE_NOW");
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  function truncateFromEnd(str, maxLength) {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + "...";
  }
  const formatDuration = (mins) => {
    if (!mins) return "N/A";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  };

  const normalizedPlatform = platform?.toLowerCase() || "";
  const platformBadge = normalizedPlatform.includes("leetcode")
    ? "border-accent text-accent h-8 w-22 "
    : normalizedPlatform.includes("codeforces")
      ? "border-warning text-warning h-8 w-22"
      : "border-border text-text-muted";

  const contestUrl = normalizedPlatform.includes("leetcode")
    ? "https://leetcode.com/contest/"
    : normalizedPlatform.includes("codeforces")
      ? "https://codeforces.com/contests"
      : null;

  return (
    <div className="flex items-center px-4 py-3 border border-border hover:bg-surface-2 transition-colors font-sans">
  
  <div className="w-24 shrink-0">
    {timeLeft === "LIVE_NOW" ? (
      <div className="h-8 w-20 text-xs text-accent border border-accent flex items-center justify-center">
        LIVE
      </div>
    ) : (
      <div className="h-8 w-20 text-xs text-text-secondary border border-border flex items-center justify-center">
        UPCOMING
      </div>
    )}
  </div>

  <div className="flex-1 min-w-0 pr-4">
    <span className="text-text-primary text-sm uppercase font-bold truncate block">
      {truncateFromEnd(title,36)}
    </span>
    
  </div>

  <div className="flex items-center shrink-0">
    
    <span className="w-32 shrink-0 text-accent text-sm truncate pr-2">
      {timeLeft === "LIVE_NOW" ? "LIVE_NOW" : timeLeft}
    </span>

    <span className="w-32 shrink-0 text-text-secondary text-sm">
      {formatDuration(duration)}
    </span>

    <div className="w-32 shrink-0 flex  justify-center">
      <span className={`border text-xs flex items-center justify-center uppercase tracking-widest ${platformBadge}`}>
        {platform}
      </span>
    </div>

    <div className="w-24 shrink-0 flex justify-end">
      {contestUrl && (
        <a
          href={contestUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-text-primary text-text-primary text-xs font-bold flex justify-center items-center h-8 w-20 hover:border-accent hover:bg-accent hover:text-black transition-colors"
        >
          OPEN →
        </a>
      )}
    </div>

  </div>
</div>
  );
};

export default ContestCard;
