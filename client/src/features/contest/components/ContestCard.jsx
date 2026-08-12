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
    if (!str) return "";
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
    ? "border-accent text-accent h-7 sm:h-8 w-20 sm:w-22"
    : normalizedPlatform.includes("codeforces")
    ? "border-warning text-warning h-7 sm:h-8 w-20 sm:w-22"
    : "border-border text-text-muted h-7 sm:h-8 w-20 sm:w-22";

  const contestUrl = normalizedPlatform.includes("leetcode")
    ? "https://leetcode.com/contest/"
    : normalizedPlatform.includes("codeforces")
    ? "https://codeforces.com/contests"
    : null;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between px-3 sm:px-4 py-3 border border-border bg-black hover:bg-surface-2 transition-colors font-sans rounded-none gap-3 md:gap-0">
      {/* Mobile Header / State Indicator & Title */}
      <div className="flex items-start md:items-center gap-3 flex-1 min-w-0">
        <div className="w-20 shrink-0">
          {timeLeft === "LIVE_NOW" ? (
            <div className="h-7 sm:h-8 w-20 text-[10px] sm:text-xs text-accent border border-accent flex items-center justify-center font-sans font-bold rounded-none">
              LIVE
            </div>
          ) : (
            <div className="h-7 sm:h-8 w-20 text-[10px] sm:text-xs text-text-secondary border border-border flex items-center justify-center font-sans font-bold rounded-none">
              UPCOMING
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <span className="text-text-primary text-xs sm:text-sm uppercase font-bold truncate block font-sans">
            {truncateFromEnd(title, 36)}
          </span>
        </div>
      </div>

      {/* Metadata & Actions */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between md:justify-end gap-2 md:gap-0 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border/50">
        {/* Time Remaining */}
        <div className="w-28 sm:w-32 shrink-0 text-accent text-xs sm:text-sm truncate pr-2 font-sans font-bold">
          <span className="md:hidden text-[10px] text-text-secondary block font-normal">
            STARTS IN:
          </span>
          {timeLeft === "LIVE_NOW" ? "LIVE_NOW" : timeLeft}
        </div>

        {/* Duration */}
        <div className="w-20 sm:w-32 shrink-0 text-text-secondary text-xs sm:text-sm font-sans">
          <span className="md:hidden text-[10px] text-text-muted block font-normal">
            DURATION:
          </span>
          {formatDuration(duration)}
        </div>

        {/* Platform Badge */}
        <div className="w-24 sm:w-32 shrink-0 flex items-center justify-start md:justify-center">
          <span
            className={`border text-[10px] sm:text-xs flex items-center justify-center uppercase tracking-widest font-sans font-bold rounded-none ${platformBadge}`}
          >
            {platform}
          </span>
        </div>

        {/* External Link */}
        <div className="w-20 sm:w-24 shrink-0 flex justify-end">
          {contestUrl && (
            <a
              href={contestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-text-primary text-text-primary text-[10px] sm:text-xs font-bold flex justify-center items-center h-7 sm:h-8 w-full sm:w-20 hover:border-accent hover:bg-accent hover:text-black transition-colors font-sans rounded-none"
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