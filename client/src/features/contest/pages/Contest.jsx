import React, { useState, useEffect } from "react";
import useContest from "../hooks/useContest";
import useContestStore from "../stores/useContestStore"; 
import ContestCard from "../components/ContestCard";
import FriendContestCard from "../components/FriendContestCard";
import TopBar from "../../../shared/components/TopBar";
import { ContestSkeleton } from "../../../shared/ui/Skeleton";
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
    <div>
     <TopBar pageField="CONTEST"/>
    <div className="w-full p-6 pt-4 flex flex-col font-mono">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 ">
        <div className="flex   border-b border-border w-full">
          <button
            onClick={() => setActiveTab("platform")}
             className={`px-4 py-2 rounded-none text-sm font-mono uppercase  cursor-pointer ${
              activeTab === "platform"
                ? "text-accent border-b-2 border-accent bg-accent-muted/40 "
                : "text-text-secondary hover:text-text-primary "
            }`}
          >
            Platform
          </button>
          <button
            onClick={() => setActiveTab("friends")}
             className={`px-4 py-2 rounded-none text-sm font-mono uppercase  cursor-pointer ${
              activeTab === "friends"
                ? "text-accent border-b-2 border-accent bg-accent-muted/40 "
                : "text-text-secondary hover:text-text-primary "
            }`}
          >
            Friends
          </button>
        </div>
      </div>
      <div className="w-full text-2xl font-mono text-text-secondary">ACTIVE & UPCOMING PLATFORM EVENTS</div>

      <div className="flex flex-col gap-4 border border-border">
        {isLoading ? (
          <ContestSkeleton/>
        ) : activeList && activeList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-surface  border border-border border-dashed">
            <span className="text-5xl  mb-4">
              {activeTab === "platform" ? "🏆" : "⚔️"}
            </span>
            <p className="text-text-secondary font-semibold text-center max-w-sm">
              {activeTab === "platform" 
                ? "No upcoming platform contests found at the moment." 
                : "No active friend contests. Challenge a friend to get started!"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
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
    </div>
  );
};

export default Contest;