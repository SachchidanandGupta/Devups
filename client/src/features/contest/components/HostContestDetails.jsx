import React, { useState, useEffect } from "react";
import { FiDatabase } from "react-icons/fi";
import { IoRadio } from "react-icons/io5";
import { BiShieldQuarter } from "react-icons/bi";
import { TbExclamationMark } from "react-icons/tb";
import Avatar from "../../../shared/components/Avatar";
import useAuth from "../../auth/hooks/useAuth";
import { changeSpace } from "../../../shared/hooks/space";
import useUtcTime from "../../../shared/hooks/useUtcTime";
import useContest from "../hooks/useContest";
const HostContestDetails = ({ contestData, getProgressPercentage, code }) => {
  const {
    problems = [],
    invitations = [],
    startTime,
    endTime,
  } = contestData || {};

  const [, forceUpdate] = useState(0);
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const { user } = useAuth();
  const utc = useUtcTime();
  const { abortContest, concludeContest } = useContest();
  const [timeLeft, setTimeLeft] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const calc = () => {
      const diff = new Date(startTime) - new Date();
      if (diff <= 0) {
        setTimeLeft("LIVE_NOW");
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [startTime]);
  useEffect(() => {
    const remainedTime = () => {
      const left = new Date(endTime) - new Date();
      if (left <= 0) {
        setTimeRemaining("COMPLETED");
        return;
      }
      const h = Math.floor(left / 3600000);
      const m = Math.floor((left % 3600000) / 60000);
      const s = Math.floor((left % 60000) / 1000);
      setTimeRemaining(`${h}h ${m}m ${s}s`);
    };
    remainedTime();
    const interval = setInterval(remainedTime, 1000);
    return () => clearInterval(interval);
  }, [endTime]);
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // console.log("Left",timeLeft);
  // console.log("remaining",timeRemaining);
  const progressPercentage = getProgressPercentage(
    contestData.startTime,
    contestData.endTime,
  );

  function getContestDuration(startTime, endTime) {
    const duration =
      new Date(endTime).getTime() - new Date(startTime).getTime();

    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )}:${String(seconds).padStart(2, "0")}`;
  }

  const duration = getContestDuration(
    contestData.startTime,
    contestData.endTime,
  );

  let nodes = contestData.problems?.length || 0;
  if (nodes < 10 && nodes > 0) {
    nodes = "0" + nodes;
  }
  let inviteNodes = contestData.invitations?.length || 0;
  if (inviteNodes < 10 && inviteNodes > 0) {
    inviteNodes = "0" + inviteNodes;
  }
  //  console.log(contestData?.scores?.length);
  return (
    <div className=" relative flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="md:col-span-2 flex flex-col items-start justify-start gap-1 p-4 border border-border-white">
          <span className="text-text-muted ">CURRENT_FOCUS //</span>
          <h1 className="text-3xl font-bold">
            {changeSpace(contestData.contestName)}
          </h1>
          {String(user._id) === String(contestData.creator._id) ? (
            <div className="w-full flex justify-end">
              {contestData?.scores?.length > 0 ? (
                <button
                  onClick={() => setConfirmPopUp(true)}
                  className="text-accent border border-accent hover:text-black hover:bg-accent font-bold active:bg-danger active:border-danger active:text-text-primary cursor-pointer p-2"
                >
                  ABORT_CONTEST
                </button>
              ) : (
                <button
                  onClick={() => setConfirmPopUp(true)}
                  className="text-danger border border-danger hover:text-text-primary hover:bg-danger cursor-pointer p-2 font-bold text-sm active:scale-95"
                >
                  ABORT_CONTEST
                </button>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="col-span-1 border border-border-white p-4 flex flex-col">
          <div className="flex items-center justify-between border-b-2 border-border pb-2 ">
            <div className="flex flex-col">
              <span className="text-text-muted ">creator</span>
              <span className="text-sm text-accent font-bold">
                {contestData.creator.username}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-text-muted text-end ">network</span>
              <span className="text-sm text-text-primary font-bold text-end">
                eth_mainnet
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-text-muted">duration</span>
            <span className="text-text-primary font-bold">{duration}</span>
          </div>
          <div className="w-full h-2 sm:h-2.5 bg-surface-2 overflow-hidden mt-2">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <FiDatabase className="text-accent" size={26} />
              <span className="font-bold text-lg">Challenge_manifest</span>
            </div>
            <span className="text-text-muted text-sm text-nowrap">
              total_nodes: {nodes}
            </span>
          </div>

          <div className="flex flex-col max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {problems.map((items, index) => {
              let difficultyColor = "";
              if (items.difficulty === "hard") {
                difficultyColor = "text-danger";
              } else if (items.difficulty === "easy") {
                difficultyColor = "text-accent";
              } else if (items.difficulty === "medium") {
                difficultyColor = "text-warning";
              }
              return (
                <div
                  key={items.id || index}
                  className="group flex justify-between items-center w-full mb-2 hover:bg-surface-2 hover:border-accent py-4 px-2 border border-border-white transition-colors"
                >
                  <div className="flex flex-col items-start w-full truncate">
                    <span className="font-bold text-md group-hover:text-accent ">
                      {changeSpace(items.title)}
                    </span>
                    <span className={`text-text-muted text-sm font-bold`}>
                      Difficulty:{" "}
                      <span className={`${difficultyColor}`}>
                        {items.difficulty}
                      </span>
                    </span>
                    <span className="text-text-muted text-sm font-bold">
                      xp:{" "}
                      <span className={`${difficultyColor}`}>
                        {items.xpReward}
                      </span>
                    </span>
                  </div>

                  <a
                    href={`${items.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer text-text-primary border border-border font-bold hover:text-black hover:bg-accent p-2 text-xs transition-colors"
                  >
                    visit_node
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <IoRadio className="text-accent" size={26} />
              <span className="font-bold text-lg">active_telementry</span>
            </div>
            <span className="text-text-muted text-nowrap text-sm">
              connected: {inviteNodes}
            </span>
          </div>

          <div className="flex flex-col border border-border max-h-[400px]">
            <div className="grid grid-cols-4 items-center p-2 text-text-muted border-b border-border bg-surface-2 shrink-0">
              <span className="col-span-2">USER_ID</span>
              <span className="col-span-1 text-end">LVL</span>
              <span className="col-span-1 text-end">STATUS</span>
            </div>

            <div className="overflow-y-auto min-h-0 custom-scrollbar">
              {invitations.map((items, index) => {
                let statusColor = "text-text-muted";
                if (items.status === "pending") {
                  statusColor = "text-warning";
                } else if (items.status === "accepted") {
                  statusColor = "text-accent";
                } else if (items.status === "rejected") {
                  statusColor = "text-danger";
                }
                return (
                  <div
                    key={items.id || index}
                    className="grid grid-cols-4 items-center p-2 border-b border-border hover:bg-surface-2 transition-colors"
                  >
                    <div className="col-span-2 flex items-center gap-2">
                      <Avatar data={items.userId} />
                      <div className="flex flex-col">
                        <span className="font-bold text-sm truncate">
                          {items.userId?.username}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end w-full">
                      <div className="w-20 border border-border text-sm py-1 bg-text-muted text-nowrap text-center text-text-primary font-semibold flex-shrink-0">
                        LVL: {items.userId?.level}
                      </div>
                    </div>
                    <span
                      className={`col-span-1 text-sm text-end font-semibold ${statusColor}`}
                    >
                      {items.status}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="w-full shrink-0 flex items-center justify-between p-2 bg-surface-2">
              <span className="text-text-muted text-sm font-bold">
                SYNC_STATUS: 100%
              </span>
              <span className="text-accent text-sm font-bold">AES_256</span>
            </div>
          </div>
        </div>
      </div>
      {confirmPopUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-1">
          <div className="fixed inset-0 bg-surface-2/40 backdrop-blur-xs"></div>
          <div className="w-full bg-transparent backdrop-blur-xl absolute right-0 top-0 h-screen max-h-screen z-10 flex items-center justify-center scrollbar-none font-sans ">
            <div className="flex flex-col gap-8 border border-border uppercase p-3 relative max-w-[600px] bg-surface-2">
              <div className="flex gap-2 items-center ">
                <div className="absolute border-l border-t -top-1 -left-1 border-accent h-4 w-4"></div>
                <div className="absolute border-r border-t -top-1 -right-1 border-accent h-4 w-4"></div>
                <div className="absolute border-b border-l -bottom-1 -left-1 border-accent h-4 w-4"></div>
                <div className="absolute border-b border-r -bottom-1 -right-1 border-accent h-4 w-4"></div>
                <div className="flex gap-2 items-center border-b border-border py-2">
                  <BiShieldQuarter className="text-accent " size={26} />
                  <span className="text-text-primary">
                    confirmation_protocol //
                  </span>
                  <span className="text-accent">action_required</span>
                </div>
                <div className="flex items-center justify-center border border-border bg-black text-xs text-text-muted p-1">
                  protocol_id:{code}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col justify-start">
                  <div className="text-accent border border-accent p-2">
                    {" "}
                    <TbExclamationMark size={26} />{" "}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className=" text-sm">
                    A critical state change has been requested. Proceeding will
                    finalize the current session parameters. This operation
                    cannot be rolled back once committed.
                  </p>
                  <div className="w-full flex bg-accent-dim/40 items-center gap-2 ">
                    <div className="h-full w-1 bg-accent-muted"></div>
                    <div className="flex flex-col justify-center items-start p-4 text-sm">
                      <span className="text-accent ">system_notice</span>
                      <span className="text-text-secondary ">
                        entity_target:{changeSpace(contestData.contestName)}
                      </span>
                      <span className="text-text-secondary">
                        universal_time: {utc}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  gap-4 border-t border-border pt-4">
                <div className="flex justify-between ">
                  <span className="text-text-muted text-xs">
                    integrity_check
                  </span>
                  <span className="text-accent text-xs">STABLE 90%</span>
                </div>
                <div className="w-full h-1 bg-surface">
                  <div className=" w-[90%] h-full bg-accent"></div>
                </div>
                <div className="w-full flex justify-end gap-4">
                  <button
                    onClick={() => setConfirmPopUp(false)}
                    className="p-2 text-danger border border-danger hover:text-text-primary hover:bg-danger cursor-pointer active:scale-95 font-bold text-sm"
                  >
                    ABORT_SESSION
                  </button>
                  <button
                    onClick={() => {
                      if (contestData?.scores?.length === 0) {
                        abortContest(String(contestData.id));
                      } else {
                        concludeContest(String(contestData.id));
                      }
                    }}
                    className="p-2 text-black border border-accent bg-accent hover:text-accent hover:bg-surface-2 cursor-pointer active:scale-95 font-bold text-sm"
                  >
                    COMMIT_SESSION
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostContestDetails;
