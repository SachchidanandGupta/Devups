import React, { useEffect } from "react";
import useAuth from "../../auth/hooks/useAuth";
import useUser from "../../user/hooks/useUser";
import useContest from "../../contest/hooks/useContest";
import { BsThreeDotsVertical } from "react-icons/bs";
import GithubHeatmap from "../../user/components/GithubHeatmap";
import useProfile from "../hooks/useProfile";
import TopBar from "../../../shared/components/TopBar";
import ProfileAvatar from "../components/ProfileAvatar";
import { getLevelTitle } from "../../../shared/constants/levelTitles";
import useLeaderboard from "../../leaderboard/hooks/useLeaderboard";
import XPbar from "../../dashboard/components/XPBar2";
import PlatformCard from "../components/PlatformCard";
const Profile = () => {
  const { user: authUser } = useAuth();
  const { createdAt, _id } = authUser;
  const joinedAt = createdAt.slice(0, 10).replace(/-/g, ".");
  const usercode = _id.slice(0, 8);
  const userId = authUser?._id || authUser?.id;
  const { userContestHistory, completedContests } = useContest();
  const { fetchProfile } = useUser();
  const { fetchProfileData, profile: userProfile, isLoading } = useProfile();
  const { globalRankings, fetchGlobal } = useLeaderboard();
  let globalRank = 0;
  globalRankings.map((f, index) => {
    if (f._id.toString() === userId) {
      globalRank = index + 1;
    }
  });
  const top = ((globalRank / globalRankings.length) * 100).toFixed(1);
  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
      userContestHistory(userId);
      fetchProfileData(userId);
      fetchGlobal();
    }
  }, [userId]);

  const {
    username = "Developer",
    avatar,
    level = 1,
    xp = 0,
    streak = 0,
    githubUsername,
    leetcodeUsername,
    codeforcesUsername,
  } = userProfile || {};

  return (
    <div className="flex flex-col bg-black min-h-screen font-mono">
  <TopBar pageField={"system_user_terminal"} searchBar={true} />
  
  <div className="w-full p-4 gap-4 flex flex-col font-mono">
    {isLoading ? (
      <div className="w-full h-48 flex flex-col items-center justify-center border border-border">
        <div className="w-8 h-8 border-4 border-border border-t-accent rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-text-muted uppercase tracking-widest mt-4 animate-pulse">
          Loading Profile...
        </p>
      </div>
    ) : (
      <div className="flex flex-col w-full gap-4">
        
     
        <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-4">
          
          <div className="relative lg:col-span-2 flex flex-col justify-end border border-border bg-black">
            <div className="absolute right-0 top-0 border-l border-b border-border p-1.5 sm:p-2 text-[10px] sm:text-xs uppercase text-text-secondary tracking-widest">
              secure_session_active
            </div>
            
            <div className="p-4 sm:p-8 flex flex-col sm:flex-row justify-between gap-6 sm:gap-4 mt-8 sm:mt-0">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 min-w-0">
                <ProfileAvatar data={authUser} />
                <div className="flex flex-col items-center sm:items-start gap-2 min-w-0">
                  <span className="text-text-primary font-bold uppercase text-4xl sm:text-6xl truncate max-w-full text-center sm:text-left">
                    {username}
                  </span>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 items-center mt-1">
                    <div className="text-black bg-accent px-3 py-1 text-xs sm:text-sm font-bold tracking-widest">
                      {getLevelTitle(level)}
                    </div>
                    <span className="text-accent text-lg sm:text-2xl font-bold shrink-0">
                      // LVL {level}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-end items-center sm:items-end shrink-0">
                <button className="border border-accent text-accent text-xs sm:text-sm font-bold tracking-widest px-4 py-2 hover:text-black hover:bg-accent transition-colors w-full sm:w-auto">
                  EDIT_NODES
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-2 font-mono border border-border p-4 bg-black">
            <div className="flex p-2 justify-between items-center border-b border-border text-xs sm:text-sm min-w-0">
              <span className="text-text-secondary shrink-0">_id:</span>
              <span className="text-text-primary truncate ml-2">{usercode}</span>
            </div>
            <div className="flex p-2 justify-between items-center border-b border-border text-xs sm:text-sm">
              <span className="text-text-secondary">joined:</span>
              <span className="text-text-primary truncate ml-2">{joinedAt}</span>
            </div>
            <div className="flex p-2 justify-between items-center border-b border-border text-xs sm:text-sm">
              <span className="text-text-secondary">uplink:</span>
              <span className="text-accent truncate ml-2 font-bold">ACTIVE_SECURE</span>
            </div>
            <div className="flex p-2 justify-between items-center border-b border-border text-xs sm:text-sm">
              <span className="text-text-secondary shrink-0">platform:</span>
              <span className="text-text-primary truncate ml-2">CYBERSPACE_DEVUPS</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-4">
              <div className="w-2 h-2 bg-accent shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.8)] animate-pulse"></div>
              <span className="text-text-muted text-[10px] sm:text-xs tracking-widest uppercase">
                SYSTEM OPERATIONAL
              </span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-4">
          
          <div className="lg:col-span-2 border border-border p-4 sm:p-6 flex flex-col gap-4 bg-black">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-base sm:text-lg text-accent font-bold tracking-widest">
                EXTERNAL_SYNC_NODES
              </span>
              <span className="text-text-muted text-[10px] sm:text-xs uppercase tracking-widest">
                STATUS: SYNCHRONIZED
              </span>
            </div>
            
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <PlatformCard
                platfrom={"github"}
                platfromUsername={githubUsername}
                style={"text-text-secondary"} 
              />
              <PlatformCard
                platfrom={"leetcode"}
                platfromUsername={leetcodeUsername}
                style={"text-warning"}
              />
              <PlatformCard
                platfrom={"codeforces"}
                platfromUsername={codeforcesUsername}
                style={"text-danger"}
              />
            </div>
          </div>

          <div className="lg:col-span-1 border border-border flex flex-col items-center justify-center p-6 gap-6 bg-black">
            <div className="flex flex-col gap-1 items-center justify-center text-center">
              <span className="text-text-secondary text-sm sm:text-base uppercase tracking-widest">
                global_ranking
              </span>
              <span className="text-accent font-bold text-5xl sm:text-6xl">
                #{globalRank}
              </span>
              <span className="text-text-primary text-xs sm:text-sm mt-2 tracking-widest uppercase">
                top {top}% // {globalRankings.length} users
              </span>
            </div>
            <div className="w-full ">
              <XPbar />
            </div>
          </div>
        </div>

        
        <div className="w-full flex flex-col lg:grid lg:grid-cols-4 gap-4">
          
         
          <div className="lg:col-span-3 overflow-hidden bg-black border border-border">
            {userId && <GithubHeatmap userId={userId} />}
          </div>

          
          <div className="lg:col-span-1 border border-border uppercase bg-black flex flex-col min-h-[200px]">
            <div className="text-accent text-sm sm:text-base font-bold tracking-widest flex items-center justify-between p-3 border-b border-border">
              <span>connected_peers</span>
              <div className="text-text-secondary hover:bg-surface-2 hover:text-accent cursor-pointer transition-colors rounded p-1.5">
                <BsThreeDotsVertical />
              </div>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center text-text-muted text-xs">
              NO_PEERS_DETECTED
            </div>
          </div>
        </div>

      </div>
    )}
  </div>
</div>
  );
};

export default Profile;
