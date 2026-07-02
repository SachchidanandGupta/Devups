import React from "react";
import StreakCard from "../components/StreakCard";
import StatsCard from "../components/StatsCard";
import useAuth from "../../auth/hooks/useAuth";
import ActivityFeedPanel from "../../activityLog/components/ActivityFeedPanel";
import TopBar from "../../../shared/components/TopBar";
import GithubHeatmap from "../../user/components/GithubHeatmap";
import DailyProblem from "../components/DailyProblem";
const Dashboard = () => {
  const {user} = useAuth();  
  return (
    <div>
      
      <TopBar pageField={"Dashboard"} searchBar={true} />
      <div className="p-4 flex flex-col gap-4">
        <GithubHeatmap userId={user._id} />
        <div className="grid grid-cols-3 gap-4 ">
          <div className="col-span-1 ">
            <StatsCard />
          </div>
          <div className="col-span-2">
            <DailyProblem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
