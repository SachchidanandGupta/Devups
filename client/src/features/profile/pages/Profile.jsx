import React, { useEffect } from "react";
import useAuth from "../../auth/hooks/useAuth";
import useUser from "../../user/hooks/useUser";
import useContest from "../../contest/hooks/useContest";
import { SiLeetcode, SiCodeforces, SiGithub } from "react-icons/si";
import GithubHeatmap from "../../user/components/GithubHeatmap";
import useProfile from "../hooks/useProfile";
import TopBar from "../../../shared/components/TopBar";
import ProfileAvatar from "../components/ProfileAvatar";
import { getLevelTitle } from "../../../shared/constants/levelTitles";
import useLeaderboard from "../../leaderboard/hooks/useLeaderboard";
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
    if(f._id.toString() === userId){
      globalRank = index+1;
    }
  });
  console.log(globalRankings);
  console.log(globalRank);
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
    <div className="flex flex-col bg-black min-h-screen">
      <TopBar pageField={"system_user_terminal"} searchBar={true} />
      <div className="w-full p-4 gap-4 flex flex-col font-mono">
        {isLoading ? (
          <div className="w-full h-48 flex flex-col items-center justify-center border border-border">
            <div className="w-8 h-8 border-4 border-border border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-4 animate-pulse">
              Loading Profile...
            </p>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-4">
            <div className="w-full  grid grid-cols-3 gap-4">
              <div className=" relative col-span-2 flex flex-col justify-end border border-border">
                <div className="absolute right-0 top-0 border-l border-b border-border p-2 uppercase text-text-secondary">
                  secure_session_active
                </div>
                <div className="p-8 flex justify-between">
                  <div className="flex items-center  gap-6">
                    <ProfileAvatar data={authUser} />
                    <div className="flex flex-col gap-2">
                      <span className="text-text-primary font-bold uppercase text-6xl">
                        {username}
                      </span>
                      <div className="flex gap-2 items-center">
                        <div className="text-black bg-accent px-3 py-1">
                          {getLevelTitle(level)}
                        </div>
                        <span className="text-accent text-2xl ">
                          // LVL {level}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end">
                    <button className="border cursor-pointer border-accent text-accent px-4 py-2 hover:text-black hover:bg-accent">
                      EDIT_NODES
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-2 font-mono border border-border p-4">
                <div className=" flex p-2 justify-between items-center border-b border-border">
                  <span className="text-text-secondary">_id:</span>
                  <span className="text-text-primary">{usercode}</span>
                </div>
                <div className=" flex p-2 justify-between items-center border-b border-border">
                  <span className="text-text-secondary">joined:</span>
                  <span className="text-text-primary">{joinedAt}</span>
                </div>
                <div className=" flex p-2 justify-between items-center border-b border-border">
                  <span className="text-text-secondary">uplink:</span>
                  <span className="text-accent">ACTIVE_SECURE</span>
                </div>
                <div className=" flex p-2 justify-between items-center border-b border-border">
                  <span className="text-text-secondary">platform:</span>
                  <span className="text-text-primary">CYBERSPACE_DEVUPS</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-accent animate-pulse"></div>
                  <span className="text-text-muted text-xs">
                    SYSYTEM OPERATIONAL
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full h-auto grid grid-cols-3 gap-4 ">
              <div className="col-span-2 border border-border p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-accent  font-bold">
                    TECH_SUBSTRATE
                  </span>
                  <span className="text-text-muted text-xs">
                    TOTAL_MASTERY: 3_UNITS
                  </span>
                </div>
                <div className="w-full flex justify-between">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="col-span-1 border border-border"></div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-4 gap-4 ">
          {userId && (
            <div className="col-span-3">
              <GithubHeatmap userId={userId} />
            </div>
          )}

          <div className="col-span-1 border border-border"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
