import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import useActivityLog from "../../features/activityLog/hooks/useActivityLog";
import useXp from "../../features/xp/hooks/useXp";
import useAuth from "../../features/auth/hooks/useAuth";
import useUtcTime from "../hooks/useUtcTime";
import useContestUIStore from "../../features/contest/hooks/useContestUIStore";
import { getSocket } from "../hooks/useSocket";

const Terminal = () => {
  const location = useLocation();
  const { user } = useAuth();
  const utc = useUtcTime();

  const selectedContestId = useContestUIStore(
    (state) => state.selectedContestId,
  );

  const [profileTab, setProfileTab] = useState("activity");
  const scrollRef = useRef(null);

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

  const { xpHistory, fetchXpHistory } = useXp();

  const isContestPage = location.pathname.startsWith("/contest");
  const isProfilePage = location.pathname.startsWith("/profile");
  const isFriendsPage = location.pathname.startsWith("/friends");

  // Fetch activities according to the current page
  useEffect(() => {
    if (isContestPage && selectedContestId) {
      fetchContestActivity(selectedContestId);

      getSocket()?.emit("join_contest", selectedContestId);

      return () => {
        getSocket()?.emit("leave_contest", selectedContestId);
      };
    }

    if (isProfilePage && user?._id) {
      fetchUserActivity(user._id);
      fetchXpHistory(user._id);
      return;
    }

    if (isFriendsPage) {
      fetchFriendActivity();
      return;
    }

    fetchGlobalActivity();
  }, [
    location.pathname,
    selectedContestId,
    user?._id,
    isContestPage,
    isProfilePage,
    isFriendsPage,
  ]);

  /*
   * Get the correct activities for the current page.
   */
  const activities =
    isContestPage && selectedContestId
      ? contestActivities
      : isProfilePage
        ? profileTab === "xp"
          ? xpHistory
          : userActivities
        : isFriendsPage
          ? friendActivities
          : globalActivities;

  /*
   * IMPORTANT:
   *
   * The backend may return newest activities first.
   *
   * Terminal needs oldest -> newest:
   *
   * OLD
   *  ↓
   * 1
   * 2
   * 3
   * 4
   * NEW
   *  ↓
   *
   * LISTENING...
   *
   * So we create a sorted copy instead of mutating
   * the original Zustand/state array.
   */
  const sortedActivities = [...(activities || [])].sort(
    (a, b) =>
      new Date(a?.createdAt).getTime() - new Date(b?.createdAt).getTime(),
  );

  /*
   * Whenever new activities arrive, scroll to the
   * bottom of the activity container.
   */
  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [sortedActivities.length]);

  /*
   * Convert timestamp to UTC.
   */
  function calc(date) {
    if (!date) return "--:--:--";

    const d = new Date(date);

    return `${String(d.getUTCHours()).padStart(2, "0")}:${String(
      d.getUTCMinutes(),
    ).padStart(2, "0")}:${String(d.getUTCSeconds()).padStart(2, "0")}`;
  }

  /*
   * Format activity message.
   */
  const formatMessage = (activity) => {
    if (isProfilePage && profileTab === "xp") {
      return `+${activity.amount} XP — ${activity.action.replace(/_/g, " ")}`;
    }

    return activity.message;
  };

  return (
    <div className="z-10 absolute bottom-0 left-0 h-48 w-full bg-surface p-3 font-sans">
      <div className="border border-border-bright h-full w-full flex flex-col p-4 min-h-0">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 shrink-0">
          <span className="text-accent font-bold tracking-wider text-sm">
            SYSTEM_LOG
          </span>

          {isProfilePage && (
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setProfileTab("activity")}
                className={`cursor-pointer ${
                  profileTab === "activity" ? "text-accent" : "text-text-muted"
                }`}
              >
                ACTIVITY
              </button>

              <button
                onClick={() => setProfileTab("xp")}
                className={`cursor-pointer ${
                  profileTab === "xp" ? "text-accent" : "text-text-muted"
                }`}
              >
                XP
              </button>
            </div>
          )}

          <div className="flex-1 border-t border-border-bright" />
        </div>

        {/* Terminal Body */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Scrollable Activities */}
          <div
            ref={scrollRef}
            className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-1.5"
          >
            {sortedActivities.map((activity) => {
              const getTime = calc(activity?.createdAt);

              return (
                <div key={activity._id} className="flex gap-4 text-sm shrink-0">
                  <span className="text-text-muted shrink-0">[{getTime}]</span>

                  <span className="text-text-secondary uppercase">
                    {formatMessage(activity)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Always at the bottom */}
          <div className="flex gap-4 text-sm animate-pulse shrink-0 pt-1.5">
            <span className="text-text-muted shrink-0">[{utc}]</span>

            <span className="text-accent flex items-center">
              LISTENING_FOR_INCOMING_PACKETS...
              <span className="inline-block w-2 h-4 bg-accent ml-2" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
