import React, { useEffect } from "react";
import StreakCard from "../components/StreakCard";
import StatsCard from "../components/StatsCard";
import useAuth from "../../auth/hooks/useAuth";
import ActivityFeedPanel from "../../activityLog/components/ActivityFeedPanel";
import TopBar from "../../../shared/components/TopBar";
import GithubHeatmap from "../../user/components/GithubHeatmap";
import DailyProblem from "../components/DailyProblem";
import { FaGithub } from "react-icons/fa";
import { DashboardSkeleton } from "../../../shared/ui/Skeleton";
const Dashboard = () => {
  const { user, isLoading } = useAuth();
  return (
    <div>
      <TopBar pageField={"Dashboard"} searchBar={true} />

      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <div className="p-4 flex flex-col gap-4">
          {user?.githubUsername ? (
            <div className="lg:col-span-3 overflow-hidden bg-black border border-border">
              {user._id && <GithubHeatmap userId={user._id} />}
            </div>
          ) : (
            <div className="lg:col-span-3 flex flex-col gap-4 p-4 overflow-hidden bg-black border border-border">
              <div className=" text-accent ">
                COMMIT_VELOCITY // LINK_REQUIRED{" "}
              </div>
              <div className="border border-dashed border-accent-dim flex flex-col gap-4 items-center justify-center w-full h-50">
                <span className="text-text-muted animate-pulse">
                  [NO_DATA_SIGNAL]
                </span>
                <button className="text-accent border flex gap-2 items-center border-accent px-5 py-2 cursor-pointer  hover:bg-accent hover:text-black active:bg-danger active:text-text-primary active:border-none  ">
                  <FaGithub />
                  <span>INITIALIZE_GITHUB_NODE</span>
                </button>
              </div>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4 ">
            <div className="col-span-1 ">
              <StatsCard user={user} />
            </div>
            <div className="col-span-2">
              <DailyProblem />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
