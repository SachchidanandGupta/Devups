import React, { useState, useEffect } from "react";
import useContest from "../hooks/useContest";
import useContestStore from "../stores/useContestStore"; 
import ContestCard from "../components/ContestCard";
import FriendContestCard from "../components/FriendContestCard";

const Contest = () => {
  const { 
    contest: fetchPlatformContests, 
    friendContest: fetchFriendContests, 
    concludeContest 
  } = useContest();
  
  const platformContests = useContestStore((state) => state.platformContests);
  const friendContests = useContestStore((state) => state.friendContests);
  const isLoading = useContestStore((state) => state.isLoading);

  const [activeTab, setActiveTab] = useState("platform"); 
  useEffect(() => {
    fetchPlatformContests();
    fetchFriendContests();
   
  }, []);

  const handleComplete = async (contestId) => {
    await concludeContest(contestId);
  };

  const activeList = activeTab === "platform" ? platformContests : friendContests;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col font-sans">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-zinc-800/60 pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Contests
          </h2>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
            Compete & Conquer
          </p>
        </div>

        <div className="flex bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800/60 w-full sm:w-72">
          <button
            onClick={() => setActiveTab("platform")}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
              activeTab === "platform"
                ? "bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)] border border-cyan-500/20"
                : "text-slate-500 hover:text-slate-300 border border-transparent"
            }`}
          >
            Platform
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
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
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-zinc-800 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-5 animate-pulse">
              Loading Arena...
            </p>
          </div>
        ) : activeList && activeList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-zinc-900/30 rounded-3xl border border-zinc-800/50 border-dashed">
            <span className="text-5xl drop-shadow-[0_0_12px_rgba(255,255,255,0.1)] mb-4">
              {activeTab === "platform" ? "🏆" : "⚔️"}
            </span>
            <p className="text-slate-400 font-semibold text-center max-w-sm">
              {activeTab === "platform" 
                ? "No upcoming platform contests found at the moment." 
                : "No active friend contests. Challenge a friend to get started!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {activeTab === "platform"
              ? platformContests.map((contest, index) => (
                  <ContestCard 
                    key={contest._id || index} 
                    contest={contest} 
                  />
                ))
              : friendContests.map((contest, index) => (
                  <FriendContestCard
                    key={contest._id || index}
                    contest={contest}
                    onComplete={handleComplete}
                  />
                ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Contest;