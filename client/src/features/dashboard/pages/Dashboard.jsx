import React, { useEffect } from "react";
import StreakCard from "../components/StreakCard";
import StatsCard from "../components/StatsCard";
import useAuth from "../../auth/hooks/useAuth";
import GithubHeatmap from "../../user/components/GithubHeatmap";
import DailyProblem from "../components/DailyProblem";
import { FaGithub } from "react-icons/fa";
import { DashboardSkeleton } from "../../../shared/ui/Skeleton";
import useFriend from "../../friends/hooks/useFriend";
const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const { fetchFriends } = useFriend();
  useEffect(() => {
    fetchFriends();
  }, []);
  return (
    <div>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <div className="p-4 flex flex-col gap-4">
          {user?.githubUsername ? (
            <div className="w-full overflow-hidden bg-black border border-border">
              {user._id && <GithubHeatmap userId={user._id} />}
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4 p-4 overflow-hidden bg-black border border-border">
              <div className="text-accent font-bold tracking-widest">
                COMMIT_VELOCITY // LINK_REQUIRED
              </div>
              <div className="border border-dashed border-accent-dim flex flex-col gap-4 items-center justify-center w-full min-h-[200px]">
                <span className="text-text-muted animate-pulse font-bold tracking-widest uppercase">
                  [NO_DATA_SIGNAL]
                </span>
                <button className="text-accent border flex gap-2 items-center border-accent px-5 py-2 cursor-pointer hover:bg-accent hover:text-black active:bg-danger active:text-text-primary active:border-danger transition-colors uppercase font-bold tracking-wider">
                  <FaGithub size={16} />
                  <span>INITIALIZE_GITHUB_NODE</span>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 h-full">
              <StatsCard user={user} />
            </div>
            <div className="lg:col-span-2 h-full">
              <DailyProblem />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
