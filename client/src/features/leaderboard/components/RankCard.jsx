import React from "react";

const RankCard = ({ rank, user, isCurrentUser }) => {
  const { username = "Unknown", avatar, xp = 0, level = 1 } = user || {};

  let rankTitle = "";
  if (rank === 1) rankTitle = "TOP_CONTRIBUTOR_V1";
  else if (rank === 2) rankTitle = "KERNEL_PANIC_PREVENTER";
  else if (rank === 3) rankTitle = "ALGO_WARRIOR";

  const isTop3 = rank <= 3;
  const isRank1 = rank === 1;

  // Rank 1 gets accent colors everywhere. Everyone else gets standard text.
  const rankNumColor = isTop3 ? "text-accent" : "text-text-secondary";
  const primaryTextColor = isRank1 ? "text-accent" : "text-text-primary";

  return (
    <div
      className={`flex items-center justify-between p-4 border-b hover:border-border transition-all duration-300 group font-mono ${
        isRank1 ? "hover:bg-accent-dim/40" : "hover:bg-text-muted/40"
      } ${
        isCurrentUser
          ? "bg-surface-2 border-l-2 border-accent"
          : "bg-black border-border border-l-transparent"
      }`}
    >
      {/* LEFT AREA: Rank, Avatar, and User Info */}
      <div className="flex flex-1 items-center min-w-0 pr-4">
        
        {/* RANK NUMBER & INDICATOR */}
        <div className="flex items-center w-16 shrink-0 gap-2">
          <span className={`text-lg sm:text-xl font-mono ${rankNumColor}`}>
            {rank < 10 ? `0${rank}` : rank}
          </span>
          {/* Small green square indicator for top 3 */}
          {isTop3 && <div className="w-1.5 h-1.5 bg-accent"></div>}
        </div>

        {/* AVATAR & TEXT */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          
          {/* AVATAR */}
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 border border-border overflow-hidden bg-black">
            {avatar ? (
              <img
                src={avatar}
                alt={username}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-secondary font-bold text-xl bg-surface-2">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* USERNAME & TITLE */}
          <div className="flex flex-col min-w-0 flex-1">
            <span className={`text-base sm:text-lg font-mono truncate ${primaryTextColor}`}>
              {username}
            </span>
            {rankTitle && (
              <span className="text-[10px] sm:text-xs font-mono text-text-muted truncate tracking-wider mt-0.5">
                {rankTitle}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT AREA: Stats */}
      <div className="flex items-center justify-end gap-12 sm:gap-24 shrink-0">
        
        {/* LEVEL */}
        <div className="w-12 text-right">
          <span className={`text-base sm:text-lg font-mono ${primaryTextColor}`}>
            {level}
          </span>
        </div>

        {/* XP */}
        <div className="w-32 flex items-baseline justify-end gap-2">
          <span className={`text-base sm:text-lg font-mono ${primaryTextColor}`}>
            {xp.toLocaleString()}
          </span>
          <span className={`text-[10px] sm:text-xs font-mono ${primaryTextColor}`}>
            XP
          </span>
        </div>
        
      </div>
    </div>
  );
};

export default RankCard;