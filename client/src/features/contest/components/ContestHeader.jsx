import React, { useState, useRef, useEffect } from "react";
import useUtcTime from "../../../shared/hooks/useUtcTime";
import HostContestButton from "./HostContestButton";
import IncomingFriendContest from "./IncomingFriendContest";
import { GiShieldDisabled } from "react-icons/gi";

const fields = [
  {
    tab: "platform",
    pageTitle: "EVENT_TERMINAL",
    contestType: "CONTEST_COUNT",
  },
  {
    tab: "friends",
    pageTitle: "FRIENDS_TERMINAL",
    contestType: "ACTIVE_CONTEST",
  },
  { tab: "hosted", pageTitle: "HOST_TERMINAL", contestType: "HOSTED_CONTEST" },
  { tab: "history", pageTitle: "HISTORY_TERMINAL", contestType: "CONTEST_HISTORY" },
];

const ContestHeader = ({
  count,
  activeTab,
  incomingContests,
  handleAcceptInvite,
  handleRejectInvite,
}) => {
  const utc = useUtcTime();
  const data = fields.find((item) => item.tab === activeTab) || fields[0];
  const [isOpen, setIsOpen] = useState(false);
  const openRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (openRef.current && !openRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="text-text-primary flex flex-col md:flex-row justify-between md:items-center font-bold mb-6 gap-4 font-sans">
      {/* Title & Metadata Header */}
      <div className="flex items-start">
        <div className="text-text-primary h-12 w-1 bg-accent mr-2 shrink-0 rounded-none"></div>
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight">
            {data.pageTitle}
          </h1>
          <div className="flex flex-wrap gap-2 py-1 items-center">
            <span className="text-accent text-[10px] sm:text-xs border-r border-border-bright pr-2 font-sans">
              [ SYSTEM_STABLE ]
            </span>
            <span className="text-accent text-[10px] sm:text-xs border-r border-border-bright pr-2 font-sans">
              UTC: {utc}
            </span>
            <span className="text-accent text-[10px] sm:text-xs pr-2 font-sans">
              {data.contestType}: {count}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons & Invites Dropdown */}
      <div
        ref={openRef}
        className="flex items-center justify-start md:justify-end gap-2 relative shrink-0"
      >
        <HostContestButton />
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`uppercase border text-xs sm:text-sm px-3 sm:px-4 py-2 font-bold cursor-pointer transition-colors font-sans rounded-none active:bg-danger active:text-text-primary active:border-danger ${
            incomingContests?.length > 0
              ? "bg-accent text-black border-accent"
              : "border-border-white text-text-primary hover:bg-text-primary hover:text-black"
          }`}
        >
          contest_shakes
          {incomingContests?.length > 0 && (
            <span className="ml-1.5 text-black font-sans">
              [{incomingContests.length}]
            </span>
          )}
        </button>

        {/* Incoming Invites Dropdown Panel */}
        {isOpen && (
          <div className="w-[calc(100vw-2rem)] sm:w-80 bg-surface-2 flex flex-col absolute top-full right-0 mt-2 z-50 uppercase border border-accent rounded-none shadow-2xl">
            <div className="w-full text-start p-2 bg-accent-dim text-accent text-xs border-b border-border font-sans font-bold">
              // contest_invites
            </div>

            {incomingContests?.length > 0 ? (
              <div className="p-2 flex flex-col gap-2 max-h-60 overflow-y-auto">
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
              <div className="w-full min-h-[160px] flex flex-col gap-1 items-center justify-center p-4 text-center uppercase">
                <GiShieldDisabled className="text-text-muted" size={36} />
                <span className="text-accent text-xs font-bold font-sans mt-1">
                  NO_CONTEST_INVITE_FOUND
                </span>
                <span className="text-[10px] text-text-muted font-sans tracking-widest">
                  system_idle // host_contest
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestHeader;