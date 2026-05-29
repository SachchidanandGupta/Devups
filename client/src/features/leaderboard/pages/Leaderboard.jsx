import React, { useState, useEffect } from "react";
import useLeaderboardStore from "../store/useLeaderboardStore";
import  useLeaderboard  from "../hooks/useLeaderboard";
import RankCard from "../components/RankCard"; 

const Leaderboard = () => {
  const globalRankings = useLeaderboardStore((state) => state.globalRankings);
  const friendRankings = useLeaderboardStore((state) => state.friendRankings);
  const isLoading = useLeaderboardStore((state) => state.isLoading);
  const {fetchGlobal, fetchFriends} = useLeaderboard();

  const [activeTab, setActiveTab] = useState("global");

  useEffect(() => {
    if (activeTab === "global") {
      fetchGlobal();
    } else {
      fetchFriends();
    }
  }, [activeTab]);

  const activeRankings = activeTab === "global" ? globalRankings : friendRankings;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col font-sans">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Leaderboard
          </h2>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
            Top Developers
          </p>
        </div>

        <div className="flex bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800/60 w-full sm:w-64">
          <button
            onClick={() => setActiveTab("global")}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-300  cursor-pointer ${
              activeTab === "global"
                ? "bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)] border border-cyan-500/20"
                : "text-slate-500 hover:text-slate-300 border border-transparent"
            }`}
          >
            Global
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-300  cursor-pointer ${
              activeTab === "friends"
                ? "bg-purple-500/10 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.1)] border border-purple-500/20"
                : "text-slate-500 hover:text-slate-300 border border-transparent"
            }`}
          >
            Friends
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-zinc-800 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-4 animate-pulse">
              Syncing Data...
            </p>
          </div>
        ) : activeRankings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 border-dashed">
            <span className="text-4xl drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] mb-3">👻</span>
            <p className="text-slate-400 font-semibold">
              {activeTab === "global" 
                ? "No global rankings found right now." 
                : "You don't have any friends on the leaderboard yet."}
            </p>
          </div>
        ) : (
          activeRankings.map((user, index) => (
            <RankCard 
              key={user._id || index} 
              rank={index + 1} 
              user={user} 
            />
          ))
        )}
      </div>

    </div>
  );
};

export default Leaderboard;