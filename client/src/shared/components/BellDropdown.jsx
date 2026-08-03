import React from "react";
import Avatar from "./Avatar";
import { FaBellSlash } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { changeSpace } from "../../shared/hooks/space";
const BellDropdown = ({ contest, requests, setIsBellOpen, notifications,clearAll }) => {
  const navigate = useNavigate();
  const notification =
    contest?.length + requests?.length + notifications?.length;
  return (
    <div className="absolute z-10 w-40 max-h-[300px] overflow-y-auto scrollbar-none top-12 sm:w-70  bg-surface-2 flex flex-col right-0 mt-1 border border-accent-muted ">
      {notification > 0 ? (
        <div>
          {requests.length > 0 && (
            <div
              onClick={() => {
                setIsBellOpen(false);
                navigate("/friends");
              }}
              className="flex flex-col w-full cursor-pointer"
            >
              <div className="text-accent  font-bold text-xs px-2 py-1  border-0 border-border uppercase bg-accent-dim w-full ">
                friend: requests
              </div>
              {requests.map((s, index) => (
                <div
                  key={s._id || index}
                  className="flex gap-2 flex-start p-2 border-b border-t border-border items-center bg-surface-2 "
                >
                  <Avatar data={s.requester} />
                  <div className="flex flex-col">
                    <span className="font-semibold uppercase text-sm">
                      {changeSpace(s.requester.username)} //
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
              onClick={() => {
                setIsBellOpen(false);
                navigate("/contest");
              }}
              className="flex flex-col w-full cursor-pointer"
            >
              <div className="text-accent  font-bold text-xs px-2 py-1  border-0 border-border uppercase bg-accent-dim w-full ">
                contest: invite
              </div>
              {contest.map((s, index) => (
                <div
                  key={s._id || index}
                  className="flex gap-2 flex-start p-2 border-b border-t border-border items-center bg-surface-2"
                >
                  <Avatar data={s.creator} />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm uppercase">
                      {changeSpace(s.contestName)}//
                    </span>
                    <span className="text-accent text-xs font-semibold uppercase">
                      creator:{changeSpace(s.creator.username)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {notifications.length > 0 && (
            <div className="flex flex-col w-full">
              <div className="text-accent flex items-center justify-between font-bold text-xs px-2 py-1  border-0 border-border uppercase bg-accent-dim w-full ">
                <span>notifications</span>
                <span onClick={()=>clearAll()} className="hover:underline cursor-pointer">clearAll</span>
              </div>
              {notifications.map((s, index) => (
                <div
                  key={s._id || index}
                  className="flex gap-2 flex-start p-2 border-b border-t border-border items-center bg-surface-2 "
                >
                  {s.status === "unread" && <div className="flex items-center justify-center h-full"><div className="h-2 w-2 bg-accent animate-pulse"></div></div>  }
                  <span className={`text-xs ${s.status === "unread" ? "text-accent" : "text-text-secondary"} uppercase`}>{s.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="m-3 h-[120px] sm:h-[200px] flex flex-col items-center justify-center gap-2 uppercase text-center   p-4">
          <FaBellSlash size={40} className="mb-2 text-text-muted opacity-50" />

          <span className="text-accent text-sm font-bold tracking-wider">
            no_active_notification
          </span>

          <span className="text-text-muted text-[10px] opacity-70 tracking-widest font-sans text-nowrap">
            system_idle // all_uplink_stable
          </span>
        </div>
      )}
    </div>
  );
};

export default BellDropdown;
