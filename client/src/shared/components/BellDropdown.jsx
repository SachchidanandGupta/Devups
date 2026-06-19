import React from "react";
import Avatar from "./Avatar";
import { useNavigate } from "react-router";
const BellDropdown = ({  contest, requests ,ref}) => {
  const navigate = useNavigate();
  return (
    <div ref={ref} className="absolute top-12 w-50 flex flex-col right-0 mt-1 border border-accent-muted ">
      {requests.length > 0 && (
        <div
          onClick={() => navigate("/friends")}
          className="flex flex-col w-full cursor-pointer"
        >
          <div className="text-accent font-bold text-xs px-2 py-1  border-0 border-border uppercase bg-accent-dim w-full ">
            friend_requests
          </div>
          {requests.map((s, index) => (
            <div key={s._id || index} className="flex gap-2 flex-start p-2 border-b border-t border-border items-center bg-surface-2 ">
              <Avatar data={s.requester} />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">
                  {s.requester.username}//
                </span>
                <span className="text-accent text-xs font-semibold">
                  lvl:{s.requester.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {contest.length > 0 && (
        <div
          onClick={() => navigate("/contest")}
          className="flex flex-col w-full cursor-pointer"
        >
          <div className="text-accent font-bold text-xs px-2 py-1  border-0 border-border uppercase bg-accent-dim w-full ">
            contest_invite
          </div>
          {contest.map((s, index) => (
            <div key={s._id || index} className="flex gap-2 flex-start p-2 border-b border-t border-border items-center bg-surface-2">
              {console.log(s)}
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{s.contestName}//</span>
                <span className="text-accent text-xs font-semibold">
                  lvl:{s.creator.username}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BellDropdown;
