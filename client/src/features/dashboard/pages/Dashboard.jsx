import React from 'react';
import XPbar from '../components/XPbar';
import StreakCard from '../components/StreakCard';
import StatsCard from '../components/StatsCard';
import useAuthStore from '../../auth/store/authStore';
import useAuth from '../../auth/hooks/useAuth';
import ActivityFeedPanel from '../../activityLog/components/ActivityFeedPanel';
const Dashboard = () => {
  const user = useAuthStore((state) => state.user)
  return (
    <div className=" p-4 sm:p-8 lg:p-12 font-sans selection:bg-cyan-500/30 ">
     
     
      <div className="max-w-6xl mx-auto space-y-8 lg:space-y-12">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/60 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-500 tracking-tight mb-1">
              Command Center
            </h1>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
              Welcome back, {user?.username || "developer"}
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/50 px-4 py-2 rounded-full">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">System Online</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start pt-4">
          
          <div className="flex flex-col space-y-6 lg:space-y-8 w-full items-center lg:items-end">
            <XPbar />
            <StreakCard />
          </div>
          
          <div className="flex w-full justify-center lg:justify-start h-full">
            <StatsCard />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;