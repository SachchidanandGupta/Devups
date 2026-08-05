import React, { useState, useEffect } from "react";
import HostContestDetails from "./HostContestDetails";
import { changeSpace } from "../../../shared/hooks/space";
const HostContestCard = ({ contests,activeTab }) => {
  // console.log(contests)
  let nodes = contests?.length || 0;
  if (nodes < 10 && nodes > 0) {
    nodes = "0" + nodes;
  }
  const [selectedContest, setSelectedContest] = useState(contests?.[0] || null);
  useEffect(()=>{
    if (contests?.length > 0 && !selectedContest) {
      setSelectedContest(contests[0]);
    }
  },[contests, selectedContest]);
  function getProgressPercentage(startTime, endTime) {
    const now = Date.now();
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    if (now <= start) return 0;
    if (now >= end) return 100;
    return ((now - start) / (end - start)) * 100;
  }
  let code ;
  return (
    <div className="flex flex-col items-center uppercase ">
      <div className="lg:grid lg:grid-cols-4 flex flex-col gap-2 w-full">
        <div className="col-span-1 flex flex-col  border border-border overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-border-white ">
            <span className="text-text-secondary">ACTIVE_SESSIONS</span>
            <span className="text-accent text-sm">{nodes}_loaded</span>
          </div>

          {contests.map((items) => {
            function trim(str) {
              return str.substring(0, 7);
            }
            const inviteNumber = (items.invitations?.length || 0) + 1;
             code = trim(items.id);
            const progressPercentage = getProgressPercentage(
              items.startTime,
              items.endTime,
            );
            
            
            const isSelected = selectedContest?.id === items.id;

            return (
              <div 
                key={items.id} 
                onClick={() => setSelectedContest(items)} 
                className={`flex flex-col items-start p-4 gap-1 cursor-pointer transition-colors ${
                  isSelected ? "bg-accent-dim/40 border-l-2 border-accent" : "bg-surface hover:bg-surface-2"
                }`}
              >
                <div className="w-full flex items-center justify-between">
                  <span className="text-accent text-xs">ID: {code}</span>
                  {isSelected && <span className="w-1 h-1 bg-accent animate-pulse"></span>}
                </div>
                <span className="text-xl font-bold">{changeSpace(items.contestName)}</span>
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="text-text-muted text-xs text-nowrap w-full">
                    NODES: {items.participants?.length || 0}/{inviteNumber}
                  </span>
                  <div className="w-full h-2 sm:h-2.5 bg-surface-2  overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Selected Contest Details */}
        <div className="col-span-3   ">
           <HostContestDetails contestData={selectedContest} getProgressPercentage={getProgressPercentage} code={code} activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default HostContestCard;
