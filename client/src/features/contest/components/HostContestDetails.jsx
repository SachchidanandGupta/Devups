import React, { useState, useEffect } from "react";
import { FiDatabase } from "react-icons/fi";
import { IoRadio } from "react-icons/io5";
import Avatar from "../../../shared/components/Avatar";

const HostContestDetails = ({ contestData, getProgressPercentage }) => {
  const { problems = [], invitations = [] } = contestData || {};
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const progressPercentage = getProgressPercentage(
    contestData.startTime,
    contestData.endTime
  );

  function getContestDuration(startTime, endTime) {
    const duration =
      new Date(endTime).getTime() - new Date(startTime).getTime();

    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }

  const duration = getContestDuration(
    contestData.startTime,
    contestData.endTime
  );

  let nodes = contestData.problems?.length || 0;
  if (nodes < 10 && nodes > 0) {
    nodes = "0" + nodes;
  }
  let inviteNodes = contestData.invitations?.length || 0;
  if (inviteNodes < 10 && inviteNodes > 0) {
    inviteNodes = "0" + inviteNodes;
  }

  function changeSpace(str) {
    return str.replaceAll(" ", "_");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="md:col-span-2 flex flex-col items-start justify-start gap-1 p-4 border border-border-white">
          <span className="text-text-muted ">CURRENT_FOCUS //</span>
          <h1 className="text-3xl font-bold">
            {changeSpace(contestData.contestName)}
          </h1>
          <div className="w-full flex justify-end">
            <button className="text-danger border border-danger hover:text-text-primary hover:bg-danger cursor-pointer p-2">ABORT_CONTEST</button>
          </div>
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
            <span className="text-text-muted text-nowrap">
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
            <span className="text-text-muted text-nowrap">
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
                      <span className="font-bold text-sm truncate">
                        {items.userId?.username}
                      </span>
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
              <span className="text-text-muted text-sm font-bold">SYNC_STATUS: 100%</span>
              <span className="text-accent text-sm font-bold">AES_256</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HostContestDetails;