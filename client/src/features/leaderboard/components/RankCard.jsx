import React from "react";
import { Link } from "react-router";

const RankCard = ({ rank, user, isCurrentUser }) => {
  const { username = "Unknown", avatar, xp = 0, level = 1, _id } = user || {};

  let rankColor = "text-text-secondary font-semibold";
  let rankTitle = "";
  if (rank === 1) {
    rankColor = "text-accent  font-semibold group-hover:border-accent ";
    rankTitle = "TOP_CONTRIBUTOR_V1";
  } else if (rank === 2) {
    rankColor = "text-primary font-semibold";
    rankTitle = "KERNEL_PANIC_PREVENTOR";
  } else if (rank === 3) {
    rankColor = "text-primary font-semibold";
    rankTitle = "ALGO_WARRIOR";
  }

  return (
    <div>
      <Link to={`/profile/${_id}`}>
        <div
          className={`flex items-center justify-between p-4 border-b hover:border-border transition-all duration-300 group font-sans ${
            rank === 1 ? "hover:bg-accent-dim/40" : "hover:bg-text-muted/40"
          } ${
            isCurrentUser
              ? "bg-surface-2 border-l-2 border-accent"
              : "bg-black border-border border-l-transparent"
          }`}
        >
          <div className="flex flex-1 items-center min-w-0 pr-4">
            <div
              className={`w-16 shrink-0 text-xl sm:text-xl font-black ${
                rank < 4 ? "text-accent" : "text-text-secondary"
              }`}
            >
              {rank < 10 ? `0${rank}` : rank}
            </div>

            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div
                className={`relative w-11 h-11 shrink-0 border border-border overflow-hidden bg-black transition-colors ${rankColor}`}
              >
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

              <div className="flex flex-col min-w-0 flex-1">
                <span
                  className={`text-base sm:text-lg  truncate transition-colors ${rankColor}`}
                >
                  {username.toUpperCase()}
                </span>

                {rankTitle && (
                  <span
                    className={`text-xs  text-text-muted truncate`}
                  >
                    {rankTitle}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-12 sm:gap-24 shrink-0">
            <div className="w-12 text-right">
              <span className={`text-lg sm:text-xl font-black ${rankColor}`}>
                {level}
              </span>
            </div>

            <div className="w-32 flex items-baseline justify-end gap-1">
              <span className={`text-lg sm:text-xl ${rankColor}`}>{xp}</span>
              <span className={`text-lg sm:text-xl ${rankColor}`}>XP</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RankCard;
