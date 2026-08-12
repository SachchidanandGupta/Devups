import React, { useState, useEffect } from "react";
import useContest from "../hooks/useContest";
import ContestCard from "../components/ContestCard";
import ContestHeader from "../components/ContestHeader";
import HostContestCard from "../components/HostContestCard";
import HostContestButton from "../components/HostContestButton";
import { ContestSkeleton } from "../../../shared/ui/Skeleton";
import useUtcTime from "../../../shared/hooks/useUtcTime";
import { useNavigate } from "react-router";

const Contest = () => {
  const {
    contest: fetchPlatformContests,
    friendContest: fetchFriendContests,
    concludeContest,
    acceptInvite,
    rejectInvite,
    platformContests,
    activeContests,
    incomingContests,
    hostedContests,
    completedContests,
    isLoading,
  } = useContest();

  const utc = useUtcTime();
  const [activeTab, setActiveTab] = useState("platform");
  const navigate = useNavigate();

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

  let activeList = [];

  if (activeTab === "platform") {
    activeList = platformContests;
  } else if (activeTab === "friends") {
    activeList = activeContests.length > 0 ? activeContests : incomingContests;
  } else if (activeTab === "hosted") {
    activeList = hostedContests;
  } else if (activeTab === "history") {
    activeList = completedContests;
  }

  return (
    <div className="w-full min-h-screen font-sans bg-black">
      <div className="w-full p-3 sm:p-6 flex flex-col font-sans">
        <ContestHeader
          activeTab={activeTab}
          count={activeList?.length || 0}
          incomingContests={incomingContests}
          handleAcceptInvite={handleAcceptInvite}
          handleRejectInvite={handleRejectInvite}
        />

        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex border-b border-border w-full overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("platform")}
              className={`px-3 sm:px-4 py-2 rounded-none text-xs sm:text-sm uppercase cursor-pointer whitespace-nowrap font-sans font-bold transition-colors ${
                activeTab === "platform"
                  ? "text-accent border-b-2 border-accent bg-accent-muted/40"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Platform
            </button>
            <button
              onClick={() => setActiveTab("friends")}
              className={`px-3 sm:px-4 py-2 rounded-none text-xs sm:text-sm uppercase cursor-pointer whitespace-nowrap font-sans font-bold transition-colors ${
                activeTab === "friends"
                  ? "text-accent border-b-2 border-accent bg-accent-muted/40"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Friends {activeContests?.length > 0 && `[${activeContests.length}]`}
            </button>
            <button
              onClick={() => setActiveTab("hosted")}
              className={`px-3 sm:px-4 py-2 rounded-none text-xs sm:text-sm uppercase cursor-pointer whitespace-nowrap font-sans font-bold transition-colors ${
                activeTab === "hosted"
                  ? "text-accent border-b-2 border-accent bg-accent-muted/40"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              user_contest {hostedContests?.length > 0 && `[${hostedContests.length}]`}
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-3 sm:px-4 py-2 rounded-none text-xs sm:text-sm uppercase cursor-pointer whitespace-nowrap font-sans font-bold transition-colors ${
                activeTab === "history"
                  ? "text-accent border-b-2 border-accent bg-accent-muted/40"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              contest_history
            </button>
          </div>
        </div>

        {/* Section Header Labels */}
        {activeTab === "platform" && (
          <div className="w-full text-base sm:text-xl font-bold border-b-2 pb-1 border-border mb-4 text-text-secondary font-sans uppercase">
            ACTIVE & UPCOMING PLATFORM EVENTS
          </div>
        )}
        {activeTab === "friends" && (
          <div className="w-full text-base sm:text-xl flex items-center justify-between pb-1 border-b-2 border-border font-bold text-text-secondary mb-4 font-sans uppercase">
            <span>
              ACTIVE_CONTEST {activeContests?.length > 0 ? `: [${activeContests.length}]` : ""}
            </span>
            <span className="text-accent text-xs animate-pulse font-sans">
              ● LIVE_FEED
            </span>
          </div>
        )}
        {activeTab === "hosted" && (
          <div className="w-full text-base sm:text-xl font-bold border-b-2 pb-1 border-border mb-4 text-text-secondary font-sans uppercase">
            USER CREATED CONTEST & EVENTS
          </div>
        )}
        {activeTab === "history" && (
          <div className="w-full text-base sm:text-xl font-bold border-b-2 pb-1 border-border mb-4 text-text-secondary font-sans uppercase">
            USER CONTEST HISTORY
          </div>
        )}

        {/* Content Section */}
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <ContestSkeleton />
          ) : activeList && activeList.length === 0 ? (
            <div className="flex flex-col gap-3 items-center justify-center py-16 sm:py-24 bg-surface border border-border border-dashed rounded-none p-4">
              <p className="text-text-secondary font-semibold text-center max-w-sm uppercase text-xs sm:text-sm font-sans">
                {activeTab === "platform"
                  ? "No upcoming platform contests found at the moment."
                  : "No active friend contests. Challenge a friend to get started!"}
              </p>
              <HostContestButton />
            </div>
          ) : (
            <div className="flex flex-col w-full overflow-x-auto">
              {activeTab === "platform" && (
                <div className="hidden md:flex items-center px-4 py-2 bg-surface-2 border-b border-border text-text-muted text-xs sm:text-sm uppercase tracking-widest font-sans min-w-[700px]">
                  <div className="w-24 shrink-0 font-bold">STATE</div>
                  <div className="flex-1 min-w-0 pr-4 font-bold">TITLE</div>
                  <div className="flex items-center shrink-0">
                    <div className="w-32 text-left font-bold">START_IN</div>
                    <div className="w-32 text-left font-bold">DURATION</div>
                    <div className="w-32 text-center font-bold">PLATFORM</div>
                    <div className="w-24 text-right font-bold">ACTION</div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2 w-full mt-2">
                {activeTab === "platform" &&
                  platformContests.map((contest, index) => (
                    <ContestCard key={contest._id || index} contest={contest} />
                  ))}

                {activeTab === "friends" && (
                  <div className="w-full flex flex-col gap-2">
                    {activeContests?.length > 0 ? (
                      <HostContestCard contests={activeContests} activeTab={activeTab} />
                    ) : (
                      <div className="w-full min-h-[220px] flex flex-col gap-3 items-center justify-center border border-border border-dashed uppercase rounded-none p-4">
                        <span className="text-text-secondary text-xs sm:text-sm font-sans">
                          NO_ACTIVE_CONTEST_FOUND
                        </span>
                        <HostContestButton />
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "hosted" && (
                  <div className="flex flex-col gap-2 w-full">
                    {hostedContests?.length > 0 ? (
                      <HostContestCard contests={hostedContests} activeTab={activeTab} />
                    ) : (
                      <div className="uppercase flex flex-col gap-3 items-center justify-center w-full min-h-[220px] border border-border border-dashed rounded-none p-4">
                        <span className="text-text-secondary text-xs sm:text-sm font-sans text-center">
                          NO_CONTEST_INITIATED_YET
                        </span>
                        <HostContestButton />
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "history" && (
                  <div className="flex flex-col gap-2 w-full">
                    {completedContests?.length > 0 ? (
                      <HostContestCard contests={completedContests} activeTab={activeTab} />
                    ) : (
                      <div className="uppercase flex flex-col gap-3 items-center justify-center w-full min-h-[220px] border border-border border-dashed rounded-none p-4">
                        <span className="text-text-secondary text-xs sm:text-sm font-sans text-center">
                          NO_CONTEST_INITIATED_YET
                        </span>
                        <HostContestButton />
                      </div>
                    )}
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