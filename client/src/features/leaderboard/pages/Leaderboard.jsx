import React, { useState, useEffect } from "react";
import useLeaderboardStore from "../store/useLeaderboardStore";
import useLeaderboard from "../hooks/useLeaderboard";
import RankCard from "../components/RankCard";
import { LeaderboardSkeleton } from "../../../shared/ui/Skeleton";
import useAuthStore from "../../auth/store/authStore";
import TopBar from "../../../shared/components/TopBar";

const Leaderboard = () => {
  const globalRankings = useLeaderboardStore((state) => state.globalRankings);
  const friendRankings = useLeaderboardStore((state) => state.friendRankings);
  const isLoading = useLeaderboardStore((state) => state.isLoading);
  const currentUser = useAuthStore((state) => state.user);

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
    <div>
      <TopBar pageField="leaderboard_terminal" searchBar={true} />
      <div className=" w-full p-4 flex flex-col h-50 font-mono">
        {activeTab === "global" ? (
          <div className=" text-text-primary flex font-bold mb-6 ">
            <div className="text-text-primary h-full w-1 bg-accent mr-2"></div>
            <div>
              <h1 className="text-3xl font-mono">GLOBAL_TERMINAL </h1>
              <div className="flex gap-2 py-1">
                <span className="text-accent font-mono text-xs  flex items-center justify-center ">
                  [ SYSTEM_STABLE ]
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className=" text-text-primary flex font-bold mb-6 ">
            <div className="text-text-primary h-full w-1 bg-accent mr-2"></div>
            <div>
              <h1 className="text-3xl font-mono">FRIENDS_TERMINAL </h1>
              <div className="flex gap-2 py-1">
                <span className="text-accent font-mono text-xs flex items-center justify-center ">
                  [ SYSTEM_STABLE ]
                </span>
              </div>
            </div>
          </div>
        )}
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
        <div className="flex items-center justify-between py-4 px-4 mb-4 bg-surface-2 border-b border-border text-text-secondary text-sm font-mono uppercase tracking-widest">
          <div className="flex flex-1 items-center min-w-0 pr-4">
            <div className="w-16 shrink-0">RANK</div>
            <div>DEVELOPER_IDENTITY</div>
          </div>

          <div className="flex items-center justify-end gap-12 sm:gap-24 shrink-0">
            <div className="w-12 text-right">LVL</div>
            <div className="w-32 text-right">XP_ACCUMULATED</div>
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
              <RankCard
                key={user._id || index}
                rank={index + 1}
                user={user}
                isCurrentUser={currentUser?._id === user._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
