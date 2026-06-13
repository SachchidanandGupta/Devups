import React, { useState, useEffect } from "react";
import useLeaderboardStore from "../store/useLeaderboardStore";
import useLeaderboard from "../hooks/useLeaderboard";
import RankCard from "../components/RankCard";
import { LeaderboardSkeleton } from "../../../shared/ui/Skeleton";
import useAuthStore from "../../auth/store/authStore";

const Leaderboard = () => {
  const globalRankings = useLeaderboardStore((state) => state.globalRankings);
  const friendRankings = useLeaderboardStore((state) => state.friendRankings);
  const isLoading = useLeaderboardStore((state) => state.isLoading);
  const currentUser = useAuthStore(state => state.user)
  const { fetchGlobal, fetchFriends } = useLeaderboard();

  const [activeTab, setActiveTab] = useState("global");

  useEffect(() => {
    if (activeTab === "global") {
      fetchGlobal();
    } else {
      fetchFriends();
    }
  }, [activeTab]);

  const activeRankings =
    activeTab === "global" ? globalRankings : friendRankings;

  return (
    <div className=" w-full p-2 pt-4 flex flex-col font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2  mb-7 border-b border-border">
        <div>
          <h2 className="text-2xl font-semibold sm:text-xl font-mono text-accent">
            LEADERBOARD
          </h2>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">
            Top Developers
          </p>
        </div>
      </div>
      <div className="flex bg-black  w-full border-b border-border mb-7 ">
        <button
          onClick={() => setActiveTab("global")}
          className={`px-4 py-2 rounded-none text-sm font-mono uppercase  cursor-pointer ${
            activeTab === "global"
              ? "text-accent border-b-2 border-accent bg-accent-muted/40 "
              : "text-text-secondary hover:text-text-primary "
          }`}
        >
          Global
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
      <div className="flex gap-4 py-2 justify-between bg-text-muted/80 border-b border-border">
        <div className="flex gap-8 px-2 text-text-secondary w-[26%] justify-between  ">
          <div>RANK</div>
          <div>DEVELOPER_IDENTITY</div>
        </div>
        <div className="flex gap-8 px-2 text-text-secondary w-[36%] justify-evenly ">
          <div>LVL</div>
          <div>XP_ACCUMULATED</div>
        </div>
      </div>
      <div className="flex flex-col">
        {isLoading ? (
          <LeaderboardSkeleton />
        ) : activeRankings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-black  border border-text-primary border-dashed">
            <span className="text-4xl text-accent  mb-3"> NO_DATA_FOUND</span>
            <p className="text-accent font-semibold">
              {activeTab === "global"
                ? "No global rankings found right now."
                : "You don't have any friends on the leaderboard yet."}
            </p>
          </div>
        ) : (
          activeRankings.map((user, index) => (
            <RankCard key={user._id || index} rank={index + 1} user={user} isCurrentUser={currentUser?._id === user._id} />
          ))
        )}
      </div>
      
    </div>
  );
};

export default Leaderboard;
