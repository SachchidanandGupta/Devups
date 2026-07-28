import React, { useState, useEffect } from "react";
import useContest from "../hooks/useContest";
import ContestCard from "../components/ContestCard";
import FriendContestCard from "../components/FriendContestCard";
import TopBar from "../../../shared/components/TopBar";
import { ContestSkeleton } from "../../../shared/ui/Skeleton";
import IncomingFriendContest from "../components/IncomingFriendContest";
import useUtcTime from "../../../shared/hooks/useUtcTime";
import { useNavigate } from "react-router";
import HostContestButton from "../components/HostContestButton";
import ContestHeader from "../components/ContestHeader";
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
    if (activeContests.length > 0) {
      activeList = activeContests;
    } else {
      activeList = incomingContests;
    }
  } else if (activeTab === "hosted") {
    activeList = hostedContests;
  }

  // console.log(hostedContests)
  return (
    <div>
      <TopBar pageField="contest_terminal" searchBar={true} />
      <div className="w-full p-4 flex h-50  flex-col font-sans">
        {activeTab === "platform" && (
          <ContestHeader
            count={activeList?.length}
            pageTitle={"EVENT_TERMINAL"}
            contestType={"CONTEST_COUNT"}
          />
        )}
        {activeTab === "friends" && (
          <ContestHeader
            count={activeList?.length}
            pageTitle={"FRIENDS_TERMINAL"}
            contestType={"ACTIVE_CONTEST"}
          />
        )}
        {activeTab === "hosted" && (
          <ContestHeader
            count={activeList?.length}
            pageTitle={"HOST_TERMINAL"}
            contestType={"HOSTED_CONTEST"}
          />
        )}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 ">
          <div className="flex border-b border-border w-full">
            <button
              onClick={() => setActiveTab("platform")}
              className={`px-4 py-2 rounded-none text-sm  uppercase  cursor-pointer ${
                activeTab === "platform"
                  ? "text-accent border-b-2 border-accent bg-accent-muted/40 "
                  : "text-text-secondary hover:text-text-primary "
              }`}
            >
              Platform
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
              {incomingContests.length > 0 ? (
                <span>[{incomingContests.length}]</span>
              ) : (
                ""
              )}
            </button>
            <button
              onClick={() => setActiveTab("hosted")}
              className={`px-4 py-2 rounded-none text-sm  uppercase  cursor-pointer ${
                activeTab === "hosted"
                  ? "text-accent border-b-2 border-accent bg-accent-muted/40 "
                  : "text-text-secondary hover:text-text-primary "
              }`}
            >
              user_contest
            </button>
          </div>
        </div>
        {activeTab == "platform" && (
          <div className="w-full text-xl font-bold border-b-2 pb-1 border-border mb-2  text-text-secondary">
            ACTIVE & UPCOMING PLATFORM EVENTS
          </div>
        )}
        {activeTab == "friends" && (
          <div className="w-full grid grid-cols-3 gap-2">
            <div className="w-full col-span-2 text-xl flex items-center justify-between pb-1  border-b-2 border-border font-bold text-text-secondary mb-2">
              <span> ACTIVE_CONTEST [{activeContests.length}]:</span>
              <span className="text-accent text-xs animate-pulse">
                ● LIVE_FEED
              </span>
            </div>
            <div className="w-full col-span-1 text-xl pb-1  border-b-2 border-border font-bold  text-text-secondary mb-2">
              PENDING_REQUESTS [{incomingContests.length}]:
            </div>
          </div>
        )}
        {activeTab == "hosted" && (
          <div className="w-full text-xl font-bold border-b-2 pb-1 border-border mb-2  text-text-secondary">
            USER CREATED CONTEST & EVENTS
          </div>
        )}

        <div className="flex flex-col gap-4 ">
          {isLoading ? (
            <ContestSkeleton />
          ) : activeList && activeList.length === 0 ? (
            <div className="flex flex-col gap-2 items-center justify-center py-24 bg-surface  border border-border border-dashed">
              <p className="text-text-secondary font-semibold text-center max-w-sm uppercase text-sm">
                {activeTab === "platform"
                  ? "No upcoming platform contests found at the moment."
                  : "No active friend contests. Challenge a friend to get started!"}
              </p>
              <HostContestButton />
            </div>
          ) : (
            <div className="flex flex-col ">
              {activeTab === "platform" ? (
                <div className="flex items-center px-4 py-2 bg-surface-2 border-b border-border text-text-muted text-sm  uppercase tracking-widest">
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
                      {activeContests?.length > 0 ? (
                        <div>
                          {activeContests.map((contest, index) => (
                            <FriendContestCard
                              key={contest._id || index}
                              contest={contest}
                              onComplete={handleComplete}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="w-full min-h-73 flex flex-col gap-2 items-center justify-center border border-border border-dashed uppercase">
                          <span className="text-text-secondary text-sm">
                            NO_ACTIVE_CONTEST_FOUND
                          </span>
                          <HostContestButton />
                        </div>
                      )}
                    </div>
                    <div className="col-span-1 flex flex-col gap-2">
                      {incomingContests?.length > 0 ? (
                        <div>
                          {incomingContests.map((contest, index) => (
                            <IncomingFriendContest
                              key={contest._id || index}
                              contest={contest}
                              onAccept={handleAcceptInvite}
                              onReject={handleRejectInvite}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="w-full min-h-73 flex flex-col gap-2 items-center justify-center border border-border border-dashed uppercase">
                          <span className="text-text-secondary text-sm">
                            NO_CONTEST_INVITE_FOUND
                          </span>
                          <HostContestButton />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {activeTab === "hosted" && <div></div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contest;
