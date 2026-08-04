import React from "react";
import { MdOutlineTerminal } from "react-icons/md";
import Avatar from "../../../shared/components/Avatar";

const ContestRanks = ({ contest, code,setLeaderBoardOpen }) => {
  const { scores = [] } = contest || {};
  const sortedScores = [...scores].sort((a, b) => b.xpEarned - a.xpEarned);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 uppercase font-sans">
      <div className="fixed inset-0 bg-surface-2/40 backdrop-blur-xs"></div>

      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-transparent backdrop-blur-xl flex flex-col overflow-hidden border border-border-bright shadow-2xl">
        <div className="flex flex-col w-full h-full overflow-y-auto scrollbar-none p-2 sm:p-4">
          <div className="flex items-center justify-between p-3 bg-surface w-full">
            <div className="flex items-center gap-2 min-w-0">
              <MdOutlineTerminal size={24} className="text-accent shrink-0" />
              <span className="text-text-primary font-bold truncate">
                RANKING_PROTOCOL
              </span>
              <span className="text-text-muted shrink-0">//</span>
              <span className="text-text-primary font-bold truncate">
                LEADERBOARD
              </span>
            </div>
            <div className="px-2 py-0.5 text-accent border border-accent bg-accent-dim text-xs sm:text-sm shrink-0">
              ID:{code}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2 bg-surface-2 items-center w-full mt-2">
            <div className="flex flex-col items-start p-2 border border-border-bright bg-surface min-w-0">
              <span className="text-xs text-text-muted">TARGET_VECTOR</span>
              <span className="font-bold text-sm sm:text-base truncate w-full">
                {contest?.contestName}
              </span>
            </div>
            <div className="flex flex-col items-start p-2 border border-border-bright bg-surface min-w-0">
              <span className="text-xs text-text-muted">SYS_ADMIN</span>
              <span className="font-bold text-sm sm:text-base truncate w-full">
                {contest?.creator?.username}
              </span>
            </div>
            <div className="flex flex-col items-start p-2 border border-border-bright bg-surface min-w-0">
              <span className="text-xs text-text-muted">TARGET</span>
              <span className="font-bold text-sm sm:text-base text-accent flex items-center gap-2 truncate w-full">
                {contest?.computedTarget}
              </span>
            </div>
          </div>

          {/* Leaderboard Table Area */}
          <div className="w-full mt-2 grow">
            {/* Table Header */}
            <div className="grid grid-cols-7 items-center py-2 pr-2 w-full bg-surface text-xs sm:text-sm">
              <div className="text-text-muted font-bold col-span-1 pl-4">
                rank
              </div>
              <div className="text-text-muted font-bold col-span-2">
                operator
              </div>
              <div className="text-text-muted font-bold col-span-1 text-end">
                level
              </div>
              <div className="text-text-muted font-bold col-span-1 text-end">
                score_xp
              </div>
              <div className="text-text-muted font-bold col-span-2 text-end">
                status
              </div>
            </div>

            {/* Scrollable Rows Container */}
            {contest?.winner ? <div className="flex flex-col gap-1 w-full mt-1">
              {sortedScores.map((item, index) => {
                const computePercent = (
                  (item?.xpEarned / contest.computedTarget) *
                  100
                ).toFixed(0);

                let rank = index + 1;
                const isRank1 = rank === 1;

                // Status tagging logic
                let computeTags = "FAILED";
                let computeStyle = isRank1 ? "text-accent" : "text-text-muted";

                if (computePercent > 30 && computePercent < 70) {
                  computeTags = "PARTIAL";
                  if (!isRank1) computeStyle = "text-warning";
                } else if (computePercent > 70) {
                  computeTags = "SUCCESS";
                  if (!isRank1) computeStyle = "text-text-primary"; 
                }

              
                const rowBg = isRank1
                  ? "bg-accent-dim border-accent/40"
                  : "bg-surface border-border/40";
                const rowTextColor = isRank1
                  ? "text-accent"
                  : "text-text-muted";
                const usernameColor = isRank1
                  ? "text-accent"
                  : "text-text-primary";

                return (
                  <div
                    key={item?.userId?._id || index}
                    className={`grid grid-cols-7 items-center py-2 pr-2 w-full text-xs sm:text-sm border transition-colors ${rowBg}`}
                  >
                    {/* Rank Column with Indicator Bar */}
                    <div
                      className={`font-bold col-span-1 flex items-center gap-2 ${rowTextColor}`}
                    >
                      <div
                        className={`w-1.5 h-5 shrink-0  'bg-transparent`}
                      ></div>
                      <span className="truncate">#{rank}</span>
                    </div>

                    <div
                      className={`font-bold col-span-2 flex items-center gap-2 min-w-0 ${usernameColor}`}
                    >
                      <Avatar data={item?.userId} className="shrink-0" />
                      <span className="truncate">{item?.userId?.username}</span>
                    </div>

                    <div
                      className={`font-bold col-span-1 text-end truncate ${rowTextColor}`}
                    >
                      {item?.userId?.level}
                    </div>

                    <div
                      className={`font-bold col-span-1 text-end truncate ${rowTextColor}`}
                    >
                      {item?.xpEarned}
                    </div>

                    <div
                      className={`font-bold col-span-2 flex items-center justify-end truncate ${computeStyle}`}
                    >
                      {computeTags} // {computePercent}%
                    </div>
                  </div>
                );
              })}
            </div> : <div className="h-50 bg-surface w-full flex items-center justify-center border  border-border-bright">
              <span className="text-accent"> NO_SUBMISSION_FOUNDED_TO_GRADE_YET </span>
            </div> }
            
          </div>

          {/* Footer Area with Dismiss Button */}
          <div className="w-full flex justify-end mt-4 pt-3 border-t border-border-bright">
            <button
            onClick={()=>setLeaderBoardOpen(false)}
            className="px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-surface transition-colors font-bold text-sm tracking-wider flex items-center gap-2 cursor-pointer active:bg-danger active:text-text-primary active:border-danger active:scale-95">
              DISMISS PROTOCOL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestRanks;
