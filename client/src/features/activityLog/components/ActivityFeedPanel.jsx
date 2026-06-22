import React, { useEffect } from "react";

import useActivityLogStore from "../store/useActivityLogStore";
import useActivityLog from "../hooks/useActivityLog";
import useNotificationStore from "../../notifications/store/useNotificationStore";
import useNotification from "../../notifications/hooks/useNotification";
import { getSocket } from "../../../shared/hooks/useSocket";
const ActivityFeedPanel = () => {
  const activities = useActivityLogStore((state) => state.activities);
  const notifications = useNotificationStore((state) => state.notifications);
  const { fetchNotifications } = useNotification();
  const { fetchActivity } = useActivityLog();
  console.log(activities);
  console.log(notifications);
 useEffect(()=>{
    fetchActivity();
    fetchNotifications();
    const socket = getSocket();
    if(!socket) return;
    socket.on("activity:new",(newActivity)=>{
      useActivityLogStore.getState().prependActivity(newActivity);
    });
    socket.on("notification:new",(newNotification)=>{
      useNotificationStore.getState().prependNotification(newNotification);
    });

    return () =>{
      socket.off("activity:new");
      socket.off("notification:new");
    }
 },[]);
 

  return <div className="w-full text-accent"> 
        hello
  </div>;
};

export default ActivityFeedPanel;
