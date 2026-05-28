import React from "react";
import useAuthStore from "../../auth/store/authStore";
import useDashboard from '../hooks/useDashboard';
const StatsCard = () => {

 const { leetcodeSolved } = useDashboard()
const { easy = 0, medium = 0, hard = 0 } = leetcodeSolved || {}
  const totalSolved = easy + medium + hard;

  return (
    <div className="bg-zinc-950 p-6 sm:p-7 rounded-3xl border border-zinc-800 shadow-2xl w-full max-w-sm font-sans flex flex-col">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-100 tracking-tight">
            LeetCode
          </h3>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
            Problems Solved
          </p>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
          <span className="text-lg font-black text-slate-200">
            {totalSolved}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        
        <div className="flex justify-between items-center bg-zinc-900/50 px-5 py-4 rounded-2xl border border-zinc-800/50 hover:bg-zinc-900 hover:border-emerald-500/30 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <span className="text-sm font-bold text-slate-300">Easy</span>
          </div>
          <span className="text-xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
            {easy}
          </span>
        </div>


        <div className="flex justify-between items-center bg-zinc-900/50 px-5 py-4 rounded-2xl border border-zinc-800/50 hover:bg-zinc-900 hover:border-amber-500/30 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
            <span className="text-sm font-bold text-slate-300">Medium</span>
          </div>
          <span className="text-xl font-black text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
            {medium}
          </span>
        </div>

        <div className="flex justify-between items-center bg-zinc-900/50 px-5 py-4 rounded-2xl border border-zinc-800/50 hover:bg-zinc-900 hover:border-rose-500/30 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
            <span className="text-sm font-bold text-slate-300">Hard</span>
          </div>
          <span className="text-xl font-black text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]">
            {hard}
          </span>
        </div>

      </div>
    </div>
  );
};

export default StatsCard;