import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useActivityLog from "../../features/activityLog/hooks/useActivityLog";
import useAuth from "../../features/auth/hooks/useAuth";
import useUtcTime from "../hooks/useUtcTime";
import useContestUIStore from "../../features/contest/hooks/useContestUIStore";
import { getSocket } from "../hooks/useSocket"; 

const Terminal = () => {
  const location = useLocation();
  const { user } = useAuth();
  const utc = useUtcTime();
  const selectedContestId = useContestUIStore((state) => state.selectedContestId);

  const {
    globalActivities,
    friendActivities,
    userActivities,
    contestActivities,
    fetchGlobalActivity,
    fetchFriendActivity,
    fetchUserActivity,
    fetchContestActivity,
  } = useActivityLog();

  const isContestPage = location.pathname.startsWith("/contest"); 
  const isProfilePage = location.pathname.startsWith("/profile");
  const isFriendsPage = location.pathname.startsWith("/friends");

  useEffect(() => {
    if (isContestPage && selectedContestId) {
      fetchContestActivity(selectedContestId);
      getSocket()?.emit("join_contest", selectedContestId);
      return () => getSocket()?.emit("leave_contest", selectedContestId);
    } else if (isProfilePage && user?._id) {
      fetchUserActivity(user._id);
    } else if (isFriendsPage) {
      fetchFriendActivity();
    } else {
      fetchGlobalActivity();
    }
  }, [location.pathname, selectedContestId]);

  const activities =
    isContestPage && selectedContestId
      ? contestActivities
      : isProfilePage
      ? userActivities
      : isFriendsPage
      ? friendActivities
      : globalActivities;

  const calc = (time) => {
    const date = new Date(time);
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const s = date.getSeconds().toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="z-10 absolute bottom-0 left-0 h-48 w-full bg-surface p-3 font-sans">
      <div className="border border-border-bright h-full w-full flex flex-col p-4 overflow-y-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-accent font-bold tracking-wider text-sm">
            SYSTEM_LOG
          </span>
          <div className="flex-1 border-t border-[#222222]"></div>
        </div>

        <div className="flex flex-col gap-1.5">
          {activities.map((a) => {
            const getTime = calc(a?.createdAt);
            return (
              <div key={a._id} className="flex gap-4 text-sm">
                <span className="text-text-muted shrink-0">[{getTime}]</span>
                <span className="text-text-secondary uppercase">{a.message}</span>
              </div>
            );
          })}

          <div className="flex gap-4 text-sm animate-pulse">
            <span className="text-text-muted shrink-0">[{utc}]</span>
            <span className="text-accent flex items-center">
              LISTENING_FOR_INCOMING_PACKETS...
              <span className="inline-block w-2 h-4 bg-accent ml-2"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;