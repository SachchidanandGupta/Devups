import React from "react";
import useUtcTime from "../../../shared/hooks/useUtcTime";
import HostContestButton from "./HostContestButton";
const ContestHeader = ({pageTitle,count,contestType}) => {
    const utc = useUtcTime();
  return (
    <div className=" text-text-primary flex justify-between font-bold mb-6 ">
      <div className="flex">
        <div className="text-text-primary h-full w-1 bg-accent mr-2"></div>
        <div>
          <h1 className="text-3xl ">{pageTitle} </h1>
          <div className="flex gap-2 py-1">
            <span className="text-accent text-xs border-r-2 border-border-bright pr-2  ">
              [ SYSTEM_STABLE ]
            </span>
            <span className="text-accent text-xs border-r-2 border-border-bright pr-2  ">
              UTC: {utc}
            </span>
            <span className="text-accent text-xs  pr-2  ">
              {" "}
              {contestType}: {count}{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-center">
        <HostContestButton />
      </div>
    </div>
  );
};

export default ContestHeader;
