import React, { useEffect, useState } from "react";
import useActivityLog from "../hooks/useActivityLog";
import useNotification from "../../notifications/hooks/useNotification";
import { getSocket } from "../../../shared/hooks/useSocket";
import TopBar from "../../../shared/components/TopBar";
import useUtcTime from "../../../shared/hooks/useUtcTime";
const ActivityFeedPanel = () => {
  const { fetchNotifications, notifications,prependNotification } = useNotification();
  const { fetchActivity, activities, prependActivity } = useActivityLog();
 const utc = useUtcTime();
 
  useEffect(() => {
    fetchActivity();
    fetchNotifications();
    const socket = getSocket();
    if (!socket) return;
    socket.on("activity:new", (newActivity) => {
      prependActivity(newActivity);
    });
    socket.on("notification:new", (newNotification) => {
      prependNotification(newNotification);
    });

    return () => {
      socket.off("activity:new");
      socket.off("notification:new");
    };
  }, []);

  return (
    <div className="w-full ">
      <TopBar pageField={"activity_terminal"} searchBar={true} />

      <div className="grid grid-cols-6 border-y-2  border-border  ">
        <div className="col-span-4 bg-surface-2 py-2 pl-2 pr-1 flex justify-between items-center border-x border-border-bright ">
          <div className="text-accent font-semibold font-mono text-lg ">
            SESSION_LOG: MAIN_SYSYTEM
          </div>
          <div className="text-text-secondary text-sm">
            v1.0.4 - time: <span className=" text-xs">{utc}</span>{" "}
          </div>
        </div>
        <div className="col-span-2 bg-surface-2 flex items-center uppercase text-text-primary text-lg px-1 ">
          incoming_interrupts
        </div>
      </div>
      <div className="grid grid-cols-6 "> </div>
    </div>
  );
};

export default ActivityFeedPanel;
