import React, { useState, useEffect } from "react";
import useLeaderboard from "../hooks/useLeaderboard";
import RankCard from "../components/RankCard";
import { LeaderboardSkeleton } from "../../../shared/ui/Skeleton";
import useAuth from "../../auth/hooks/useAuth";
import TopBar from "../../../shared/components/TopBar";
import useUtcTime from "../../../shared/hooks/useUtcTime";
const Leaderboard = () => {
  
  const {user} = useAuth();
  const currentUser = user;

  const { fetchGlobal, fetchFriends,globalRankings,friendRankings,isLoading } = useLeaderboard();

  const [activeTab, setActiveTab] = useState("global");
  const utc = useUtcTime();
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
      <div className=" w-full p-4 flex flex-col h-50 font-sans">
        {activeTab === "global" ? (
          <div className=" text-text-primary flex font-bold mb-6 ">
            <div className="text-text-primary h-full w-1 bg-accent mr-2"></div>
            <div>
              <h1 className="text-3xl">GLOBAL_TERMINAL </h1>
              <div className="flex gap-2 py-1">
                <span className="text-accent text-xs border-r-2 border-border-bright pr-2   ">
                  [ SYSTEM_STABLE ]
                </span>
                <span className="text-accent  text-xs  ">
                    UTC:{utc}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className=" text-text-primary flex font-bold mb-6 ">
            <div className="text-text-primary h-full w-1 bg-accent mr-2"></div>
            <div>
              <h1 className="text-3xl ">FRIENDS_TERMINAL </h1>
              <div className="flex gap-2 py-1">
                <span className="text-accent  text-xs border-r-2 border-border-bright pr-2 ">
                  [ SYSTEM_STABLE ]
                </span>
                <span className="text-accent  text-xs  ">
                    UTC:{utc}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="flex bg-black  w-full border-b border-border mb-7 ">
          <button
            onClick={() => setActiveTab("global")}
            className={`px-4 py-2 rounded-none text-sm uppercase  cursor-pointer ${
              activeTab === "global"
                ? "text-accent border-b-2 border-accent bg-accent-muted/40 "
                : "text-text-secondary hover:text-text-primary "
            }`}
          >
            Global
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`px-4 py-2 rounded-none text-sm  uppercase  cursor-pointer ${
              activeTab === "friends"
                ? "text-accent border-b-2 border-accent bg-accent-muted/40 "
                : "text-text-secondary hover:text-text-primary "
            }`}
          >
            Friends
          </button>
        </div>
        <div className="flex items-center justify-between py-4 px-4 mb-2 bg-surface-2 border-b border-border text-text-secondary text-sm font-sans uppercase tracking-widest">
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
