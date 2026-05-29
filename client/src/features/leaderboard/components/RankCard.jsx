import React from "react";

const RankCard = ({ rank, user }) => {
  const {
    username = "Unknown",
    avatar,
    xp = 0,
    level = 1,
    streak = 0,
  } = user || {};

  let rankColor = "text-slate-600 font-bold";
  let badgeColor = "bg-zinc-800 text-slate-400 border border-zinc-700";

  if (rank === 1) {
    rankColor = "text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]";
    badgeColor = "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30";
  } else if (rank === 2) {
    rankColor = "text-slate-300 drop-shadow-[0_0_10px_rgba(203,213,225,0.5)]";
    badgeColor = "bg-slate-500/10 text-slate-300 border border-slate-500/30";
  } else if (rank === 3) {
    rankColor = "text-amber-600 drop-shadow-[0_0_10px_rgba(217,119,6,0.5)]";
    badgeColor = "bg-amber-600/10 text-amber-500 border border-amber-600/30";
  }

  return (
    <div className="flex items-center justify-between bg-zinc-900/40 p-4 sm:p-5 rounded-2xl border border-zinc-800/60 hover:bg-zinc-900 hover:border-zinc-700/80 transition-all duration-300 group">
      <div className="flex items-center gap-4 sm:gap-6">
        <div
          className={`w-8 text-center text-xl sm:text-2xl font-black transition-all ${rankColor}`}
        >
          #{rank}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 flex-shrink-0 group-hover:border-zinc-500 transition-colors">
            {avatar ? (
              <img
                src={avatar}
                alt={username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl bg-gradient-to-br from-zinc-700 to-zinc-800">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
              {username}
            </span>
            <span
              className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md w-max mt-1 tracking-wide ${badgeColor}`}
            >
              Lvl {level}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 sm:gap-10">
        <div className="flex flex-col items-end sm:items-center">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5 hidden sm:block">
            Streak
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg sm:text-xl font-black text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]">
              {streak}
            </span>
            <span className="text-sm drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]">
              🔥
            </span>
          </div>
        </div>

        <div className="w-px h-8 bg-zinc-800 hidden sm:block"></div>

        <div className="flex flex-col items-end">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5 hidden sm:block">
            Total XP
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-2xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              {xp}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-cyan-500/70">
              XP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankCard;
