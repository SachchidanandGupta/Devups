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
    concludeContest,
  } = useContest();

  const platformContests = useContestStore((state) => state.platformContests);
  const friendContests = useContestStore((state) => state.friendContests);
  const isLoading = useContestStore((state) => state.isLoading);
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setUtcTime(new Date().toUTCString().slice(17, 25)); // extracts HH:MM:SS
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const [activeTab, setActiveTab] = useState("platform");
  useEffect(() => {
    fetchPlatformContests();
    fetchFriendContests();
  }, []);

  const handleComplete = async (contestId) => {
    await concludeContest(contestId);
  };

  const activeList =
    activeTab === "platform" ? platformContests : friendContests;

  return (
    <div>
      <TopBar pageField="CONTEST" />
      <div className="w-full px-4 flex h-50  flex-col font-mono">
        {activeTab === "platform" ? (
          <div className=" text-text-primary flex font-bold mb-6 ">
            <div className="text-text-primary h-full w-1 bg-accent mr-2"></div>
            <div className="">
              <h1 className="text-3xl font-mono">EVENT_TERMINAL </h1>
              <div className="flex gap-2 py-1">
                <span className="text-accent font-mono text-xs border-r-2 border-border-bright pr-2 flex items-center justify-center ">
                  [ SYSTEM_STABLE ]
                </span>
                <span className="text-accent font-mono text-xs border-r-2 border-border-bright pr-2 flex items-center justify-center ">
                  UTC: {utcTime}
                </span>
                <span className="text-accent font-mono text-xs  pr-2 flex items-center justify-center ">
                  {" "}
                  ACTIVE_CONTEST: {activeList.length}{" "}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className=" text-text-primary flex font-bold mb-6 ">
            <div className="text-text-primary h-full w-1 bg-accent mr-2"></div>
            <div className="">
              <h1 className="text-3xl font-mono">FRIENDS_TERMINAL </h1>
              <div className="flex gap-2 py-1">
                <span className="text-accent font-mono text-xs border-r-2 border-border-bright pr-2 flex items-center justify-center ">
                  [ SYSTEM_STABLE ]
                </span>
                <span className="text-accent font-mono text-xs border-r-2 border-border-bright pr-2 flex items-center justify-center ">
                  UTC: {utcTime}
                </span>
                <span className="text-accent font-mono text-xs  pr-2 flex items-center justify-center ">
                  {" "}
                  ACTIVE_CONTEST: {activeList.length}{" "}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 ">
          <div className="flex border-b border-border w-full">
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
        {activeTab == "platform" ? (
          <div className="w-full text-2xl font-mono text-text-secondary">
            ACTIVE & UPCOMING PLATFORM EVENTS
          </div>
        ) : (
          <div className="w-full text-2xl font-mono text-text-secondary">
            ACTIVE & UPCOMING FRIENDS EVENTS
          </div>
        )}

        <div className="flex flex-col gap-4 ">
          {isLoading ? (
            <ContestSkeleton />
          ) : activeList && activeList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-surface  border border-border border-dashed">
              <p className="text-text-secondary font-semibold text-center max-w-sm">
                {activeTab === "platform"
                  ? "No upcoming platform contests found at the moment."
                  : "No active friend contests. Challenge a friend to get started!"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col ">
              <div className="flex items-center px-4 py-2 bg-surface-2 border-b border-border text-text-muted text-sm font-mono uppercase tracking-widest">
                
                <div className="w-24 shrink-0 font-bold">STATE</div>

                
                <div className="flex-1 min-w-0 pr-4 font-bold ">TITLE</div>

                <div className="flex items-center shrink-0">
                  <div className="w-32 text-left font-bold">START_IN</div>
                  <div className="w-32 text-left font-bold">DURATION</div>
                  <div className="w-32 text-center font-bold">PLATFORM</div>
                  <div className="w-24 text-right font-bold">ACTION</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contest;
