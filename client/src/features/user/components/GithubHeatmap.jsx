import React, { useEffect } from "react";
import useUserStore from "../stores/useUserStore"; 
import useUser from "../hooks/useUser"; 

const GithubHeatmap = ({ userId }) => {
  const heatMap = useUserStore((state) => state.heatMap);
  const isLoading = useUserStore((state) => state.isLoading);
  
  const { userHeatMap } = useUser();

  useEffect(() => {
    if (userId) {
      userHeatMap(userId);
    }
  }, [userId]);

  const getColor = (count) => {
    if (!count || count === 0) return "bg-zinc-800";
    if (count <= 3) return "bg-emerald-900";
    if (count <= 6) return "bg-emerald-700";
    if (count <= 9) return "bg-emerald-500";
    return "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]";
  };
  
  if (isLoading) {
    return (
      <div className="w-full h-48 flex flex-col items-center justify-center bg-zinc-950 rounded-3xl border border-zinc-800 shadow-2xl">
        <div className="w-6 h-6 border-2 border-zinc-700 border-t-emerald-500 rounded-full animate-spin mb-3"></div>
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest animate-pulse">
          Syncing GitHub...
        </p>
      </div>
    );
  }

  if (!heatMap || heatMap.length === 0) {
    return (
      <div className="w-full h-48 flex flex-col items-center justify-center bg-zinc-950 rounded-3xl border border-zinc-800 border-dashed shadow-2xl p-6 text-center">
        <span className="text-3xl mb-3 opacity-50 text-slate-300 font-semibold">No Github in this era</span>
        <p className="text-slate-300 font-semibold mb-1">No contribution data found.</p>
        <p className="text-slate-500 text-sm">Time to start pushing some code!</p>
      </div>
    );
  }

  const weeks = [];
  for (let i = 0; i < heatMap.length; i += 7) {
    weeks.push(heatMap.slice(i, i + 7));
  }

  return (
    <div className="bg-zinc-950 p-5 sm:p-7 rounded-3xl border border-zinc-800 shadow-2xl w-full font-sans">
      
      <div className="mb-5">
        <h3 className="text-lg font-bold text-slate-100 tracking-tight">
          Contribution Activity
        </h3>
      </div>

      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
        <div className="inline-flex gap-1.5 min-w-max pr-4">
          
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1.5">
              
              {week.map((day, dayIndex) => {
                const displayDate = day.date 
                  ? new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                  : "Unknown Date";

                return (
                  <div
                    key={dayIndex}
                    title={`${day.contributionCount || 0} contributions on ${displayDate}`}
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-sm transition-colors duration-300 hover:ring-1 hover:ring-slate-300 hover:ring-offset-1 hover:ring-offset-zinc-950 cursor-crosshair ${getColor(day.contributionCount)}`}
                  />
                );
              })}
              
            </div>
          ))}
          
        </div>
      </div>

      {/* GitHub-style Legend */}
      <div className="flex items-center justify-end gap-2 text-[10px] sm:text-xs font-semibold text-slate-500 mt-2">
        <span>Less</span>
        <div className="flex gap-1.5 items-center">
          <div className="w-3 h-3 rounded-sm bg-zinc-800"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-900"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-700"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.5)]"></div>
        </div>
        <span>More</span>
      </div>

    </div>
  );
};

export default GithubHeatmap;