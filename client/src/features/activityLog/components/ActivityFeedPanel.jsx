import React, { useEffect, useState } from "react";

import useActivityLogStore from "../store/useActivityLogStore";
import useActivityLog from "../hooks/useActivityLog";
import useNotificationStore from "../../notifications/store/useNotificationStore";
import useNotification from "../../notifications/hooks/useNotification";
import { getSocket } from "../../../shared/hooks/useSocket";
import TopBar from "../../../shared/components/TopBar";
const ActivityFeedPanel = () => {
  const activities = useActivityLogStore((state) => state.activities);
  const notifications = useNotificationStore((state) => state.notifications);
  const { fetchNotifications } = useNotification();
  const { fetchActivity } = useActivityLog();
  const [utcTime, setUtcTime] = useState("");
  useEffect(()=>{
    const tick = () =>{
      setUtcTime(new Date().toUTCString().slice(17,25));
    }
    tick();
    const interval = setInterval(tick,1000);
    return () => clearInterval(interval);
  },[]);
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

 
 

  return <div className="w-full "> 
        <TopBar pageField={"activity_terminal"} searchBar={true}/>
        
        <div className="grid grid-cols-6 border-y-2  border-border  ">
           <div className="col-span-4 bg-surface-2 py-2 pl-2 pr-1 flex justify-between items-center border-x border-border-bright ">
                <div className="text-accent font-semibold font-mono text-lg ">SESSION_LOG: MAIN_SYSYTEM</div>
                <div className="text-text-secondary text-sm">v1.0.4 - time: <span className=" text-xs">{utcTime}</span> </div>
           </div>
           <div className="col-span-2 bg-surface-2 flex items-center uppercase text-text-primary text-lg px-1 ">incoming_interrupts</div>
        </div>
        <div className="grid grid-cols-6 "> </div>
  </div>;
};

export default ActivityFeedPanel;
