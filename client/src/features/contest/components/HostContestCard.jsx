import React from "react";

const HostContestCard = ({ contests }) => {
  let nodes = contests.length;
  if (nodes < 10) {
    nodes = "0" + nodes;
  }
  // console.log(contests);
  return (
    <div className="flex flex-col items-center uppercase ">
      <div className="grid grid-cols-4 gap-2 w-full">
        <div className="col-span-1 flex flex-col h-screen border border-border-white">
          <div className="flex items-center justify-between p-4 border-b border-border-white ">
            <span className="text-text-secondary">ACTIVE_SESSIONS</span>
            <span className="text-accent text-sm">{nodes}_loaded</span>
          </div>
          {contests.map((items) => {
            function trim(str){
               return str.substring(0, 7)
            }
            const code = trim(items.id);
            return (<div className="flex flex-col items-start p-2 ">
              <span className="text-accent text-sm">ID: {code}</span>
              <span className="text-xl">{items.contestName}</span>

            </div>);
          })}
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
};

export default HostContestCard;
