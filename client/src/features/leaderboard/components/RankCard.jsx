import React from "react";

const RankCard = ({ rank, user, isCurrentUser }) => {
  const {
    username = "Unknown",
    avatar,
    xp = 0,
    level = 1,
  } = user || {};

  const rankColor = rank <= 3 ? "text-accent font-bold" : "text-text-secondary";

  return (
    <div
      className={`flex items-center justify-between bg-black p-4 sm:p-4  border-b border-border hover:bg-text-muted/40 hover:border-border transition-all duration-300 group ${rankColor} ${isCurrentUser ? "bg-surface-2 border-l-2 border-accent" : ""}`}
    >
      <div className="flex w-[20%]  justify-between">
        <div
          className={`w-8 text-center text-xl sm:text-2xl font-black transition-all ${rankColor}`}
        >
          {rank}
        </div>

        <div className="flex items-center gap-3 sm:gap-4 w-[100px]">
          <div className="relative w-10 h-10 sm:w-10 sm:h-10 border border-border overflow-hidden bg-black  flex-shrink-0 group-hover:border-accent transition-colors">
            {avatar ? (
              <img
                src={avatar}
                alt={username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-secondary font-bold text-xl bg-surface-2">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span
              className={`text-base sm:text-lg font-mono  transition-colors  ${rankColor}`}
            >
              {username.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-[40%]  justify-evenly">
        <div className="flex flex-col items-end sm:items-center">
          <div className="flex items-center gap-1.5">
            <span className={`text-lg sm:text-xl font-black ${rankColor}`}>
              {level}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-baseline gap-1">
            <span className={`text-lg sm:text-2xl font-black ${rankColor}`}>
              {xp}
            </span>
            <span className={`text-[10px] sm:text-xs font-bold ${rankColor}`}>
              XP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankCard;
