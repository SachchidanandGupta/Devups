import React, { useState, useRef } from "react";
import useUtcTime from "../../../shared/hooks/useUtcTime";
import HostContestButton from "./HostContestButton";
import { useEffect } from "react";
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
];
const ContestHeader = ({
  count,
  activeTab,
  incomingContests,
  handleAcceptInvite,
  handleRejectInvite,
}) => {
  // console.log("incoming",incomingContests)
  const utc = useUtcTime();
  const data = fields.find((item) => item.tab === activeTab);
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
    <div className=" text-text-primary flex justify-between font-bold mb-6 ">
      <div className="flex">
        <div className="text-text-primary h-full w-1 bg-accent mr-2"></div>
        <div>
          <h1 className="text-3xl ">{data.pageTitle} </h1>
          <div className="flex gap-2 py-1">
            <span className="text-accent text-xs border-r-2 border-border-bright pr-2  ">
              [ SYSTEM_STABLE ]
            </span>
            <span className="text-accent text-xs border-r-2 border-border-bright pr-2  ">
              UTC: {utc}
            </span>
            <span className="text-accent text-xs  pr-2  ">
              {" "}
              {data.contestType}: {count}{" "}
            </span>
          </div>
        </div>
      </div>
      <div
      ref={openRef}
      className="flex items-end justify-center gap-2 relative ">
        <HostContestButton />
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`uppercase border text-xs sm:text-sm px-3 sm:px-4 py-1.5 font-bold cursor-pointer transition-colors active:bg-danger active:text-text-primary active:border-danger ${
            incomingContests?.length > 0
              ? "bg-accent text-black"
              : "border-border-white text-text-primary hover:bg-text-primary hover:text-black"
          }`}
        >
          contest_shakes
          {incomingContests?.length > 0 && (
            <span className="ml-1.5 text-black">
              [{incomingContests.length}]
            </span>
          )}
        </button>
        {isOpen && (
          <div
            
            className="w-full bg-surface-2  flex flex-col absolute top-full right-0 mt-2 z-50 uppercase  border border-accent "
          >
            <div className="w-full text-start p-2 bg-accent-dim text-accent text-xs border-b border-border ">
              //contest_invites

            </div>
            {incomingContests?.length > 0 ? (
              <div className="p-2 flex flex-col gap-2">
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
              <div className="w-full min-h-50 flex flex-col gap-1 items-center justify-center  uppercase">
                <GiShieldDisabled className="text-text-muted" size={40}/>
                <span className="text-accent ">
                  NO_CONTEST_INVITE_FOUND
                </span>
                <span className="text-xs text-text-muted">
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
