import React, { useState, useEffect } from "react";
import useContest from "../hooks/useContest";
import useContestStore from "../stores/useContestStore";
import ContestCard from "../components/ContestCard";
import FriendContestCard from "../components/FriendContestCard";
import TopBar from "../../../shared/components/TopBar";
import { ContestSkeleton } from "../../../shared/ui/Skeleton";
import IncomingFriendContest from "../components/IncomingFriendContest";
const Contest = () => {
  const {
    contest: fetchPlatformContests,
    friendContest: fetchFriendContests,
    concludeContest,
    acceptInvite,
    rejectInvite,
  } = useContest();

  const platformContests = useContestStore((state) => state.platformContests);
  const activeContests = useContestStore((state) => state.activeContests);
  const incomingContests = useContestStore((state) => state.incomingContests);
  const isLoading = useContestStore((state) => state.isLoading);
  const [utcTime, setUtcTime] = useState("");
  //  console.log(incomingContests)
  useEffect(() => {
    const tick = () => {
      setUtcTime(new Date().toUTCString().slice(17, 25));
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

  const handleAcceptInvite = async (contestId) => {
    await acceptInvite(contestId);
  };

  const handleRejectInvite = async (contestId) => {
    await rejectInvite(contestId);
  };

  const activeList =
    activeTab === "platform"
      ? platformContests
      : activeContests.length > 0
        ? activeContests
        : incomingContests;

  return (
    <div>
      <TopBar pageField="contest_terminal" searchBar={true} />
      <div className="w-full p-4 flex h-50  flex-col font-mono">
        {activeTab === "platform" ? (
          <div className=" text-text-primary flex font-bold mb-6 ">
            <div className="text-text-primary h-full w-1 bg-accent mr-2"></div>
            <div >
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
                  CONTEST_COUNT: {activeList.length}{" "}
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
              className={`px-4 py-2 rounded-none text-sm font-mono uppercase font-bold cursor-pointer ${
                activeTab === "platform"
                  ? "text-accent border-b-2 border-accent bg-accent-muted/40 "
                  : "text-text-secondary hover:text-text-primary "
              }`}
            >
              Platform
            </button>
            <button
              onClick={() => setActiveTab("friends")}
              className={`px-4 py-2 rounded-none text-sm font-mono uppercase font-bold cursor-pointer ${
                activeTab === "friends"
                  ? "text-accent border-b-2 border-accent bg-accent-muted/40 "
                  : "text-text-secondary hover:text-text-primary "
              }`}
            >
              Friends
              {incomingContests.length > 0 ? (
                <span>[{incomingContests.length}]</span>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
        {activeTab == "platform" ? (
          <div className="w-full text-xl font-bold border-b-2 pb-1 border-border mb-2 font-mono text-text-secondary">
            ACTIVE & UPCOMING PLATFORM EVENTS
          </div>
        ) : (
          <div className="w-full grid grid-cols-3 gap-2">
            <div className="w-full col-span-2 text-xl flex items-center justify-between pb-1  border-b-2 border-border font-mono text-text-secondary mb-2">
              <span> ACTIVE_CONTEST [{activeContests.length}]:</span>
              <span className="text-accent text-xs animate-pulse">
                ● LIVE_FEED
              </span>
            </div>
            <div className="w-full col-span-1 text-xl pb-1  border-b-2 border-border font-mono text-text-secondary mb-2">
              PENDING_REQUESTS [{incomingContests.length}]:
            </div>
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
              {activeTab === "platform" ? (
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
              ) : (
                ""
              )}

              <div className="flex flex-col gap-2">
                {activeTab === "platform" &&
                  platformContests.map((contest, index) => (
                    <ContestCard key={contest._id || index} contest={contest} />
                  ))}

                {activeTab === "friends" && (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 flex flex-col gap-2">
                      {activeContests.map((contest, index) => (
                        <FriendContestCard
                          key={contest._id || index}
                          contest={contest}
                          onComplete={handleComplete}
                        />
                      ))}
                    </div>
                    <div className="col-span-1 flex flex-col gap-2">
                      {incomingContests.map((contest, index) => (
                        <IncomingFriendContest
                          key={contest._id || index}
                          contest={contest}
                          onAccept={handleAcceptInvite}
                          onReject={handleRejectInvite}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contest;
