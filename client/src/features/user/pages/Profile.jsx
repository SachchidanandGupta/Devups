import React, { useEffect } from "react";
import useAuthStore from "../../auth/store/authStore"; 
import useUserStore from "../stores/useUserStore"; 
import useUser from "../hooks/useUser"; 

import { SiLeetcode,SiCodeforces,SiGithub } from "react-icons/si";
import GithubHeatmap from "../components/GithubHeatmap";
const Profile = () => {
  const authUser = useAuthStore((state) => state.user);
  const userId = authUser?._id || authUser?.id;

  const { fetchProfile } = useUser();
  const userProfile = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);

  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
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
    codeforcesUsername
  } = userProfile || {};

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 font-sans pb-10">
      
      <div className="border-b border-zinc-800/60 pb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          My Profile
        </h2>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
          Manage your identity & stats
        </p>
      </div>

      {isLoading ? (
        <div className="w-full h-48 flex flex-col items-center justify-center bg-zinc-950 rounded-3xl border border-zinc-800 shadow-2xl">
          <div className="w-8 h-8 border-4 border-zinc-800 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-4 animate-pulse">
            Loading Profile...
          </p>
        </div>
      ) : (
        <div className="bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl flex flex-col md:flex-row gap-8 items-center md:items-start">
          
          <div className="relative w-32 h-32 rounded-3xl overflow-hidden bg-zinc-900 border-2 border-zinc-800 flex-shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
            {avatar ? (
              <img src={avatar} alt={username} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300 font-black text-5xl bg-gradient-to-br from-zinc-800 to-zinc-900">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute -bottom-1 -right-0 bg-zinc-900 px-3 py-1 rounded-tl-xl border-t border-l border-zinc-800">
              <span className="text-xs font-black text-cyan-400">Lvl {level}</span>
            </div>
          </div>

          <div className="flex flex-col flex-grow w-full">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-3xl font-black text-slate-100"><p>{username}</p></h3>
              <button className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-slate-300 text-sm font-bold rounded-xl border border-zinc-700 transition-colors">
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total XP</p>
                <p className="text-2xl font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">{xp}</p>
              </div>
              <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Current Streak</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-2xl font-black text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]">{streak}</p>
                  <span className="text-sm">🔥</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-zinc-800/60 pt-6">
              <div className="flex items-center gap-2 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
                <SiGithub className="text-slate-400" />
                <span className="text-xs font-bold text-slate-300">{githubUsername || "Not connected"}</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
                <SiLeetcode className="text-cyan-500" />
                <span className="text-xs font-bold text-slate-300">{leetcodeUsername || "Not connected"}</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
                <SiCodeforces className="text-yellow-500" />
                <span className="text-xs font-bold text-slate-300">{codeforcesUsername || "Not connected"}</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {userId && (
        <div className="w-full mt-4">
          <GithubHeatmap userId={userId} />
        </div>
      )}

    </div>
  );
};

export default Profile;