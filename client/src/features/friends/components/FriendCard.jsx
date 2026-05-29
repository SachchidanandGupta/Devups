import React from 'react';
import { FiUserX, FiSlash } from 'react-icons/fi'; // Suggested icons for actions

const FriendCard = ({ friend, onUnfriend, onBlock }) => {
  
  // Destructure with fallbacks
  const { _id, username = "Unknown", avatar, xp = 0, level = 1 } = friend || {};

  return (
    <div className="flex items-center justify-between bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/60 hover:bg-zinc-900 hover:border-zinc-700/80 transition-all duration-300 group">
      
      {/* Left Side: Avatar and User Info */}
      <div className="flex items-center gap-4">
        
        {/* Avatar with Letter Fallback */}
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 flex-shrink-0 group-hover:border-zinc-500 transition-colors">
          {avatar ? (
            <img src={avatar} alt={username} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl bg-gradient-to-br from-zinc-700 to-zinc-800">
              {username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Username & Level Badge */}
        <div className="flex flex-col">
          <span className="text-base sm:text-lg font-bold text-slate-200 group-hover:text-white transition-colors truncate max-w-[120px] sm:max-w-[200px]">
            {username}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-slate-400 border border-zinc-700 tracking-wide">
              Lvl {level}
            </span>
            <span className="text-[10px] font-bold text-cyan-500/70">
              {xp} XP
            </span>
          </div>
        </div>
      </div>

      {/* Right Side: Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Unfriend Button */}
        <button 
          onClick={() => onUnfriend(_id)}
          className="flex items-center justify-center w-9 h-9 sm:w-auto sm:px-3 sm:py-1.5 rounded-lg bg-zinc-800 text-slate-400 hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500/30 border border-transparent transition-all duration-200"
          title="Unfriend"
        >
          <FiUserX size={16} className="sm:mr-1.5" />
          <span className="text-xs font-bold hidden sm:block">Remove</span>
        </button>

        {/* Block Button */}
        <button 
          onClick={() => onBlock(_id)}
          className="flex items-center justify-center w-9 h-9 sm:w-auto sm:px-3 sm:py-1.5 rounded-lg bg-zinc-800 text-slate-400 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 border border-transparent transition-all duration-200"
          title="Block User"
        >
          <FiSlash size={16} className="sm:mr-1.5" />
          <span className="text-xs font-bold hidden sm:block">Block</span>
        </button>

      </div>
    </div>
  );
};

export default FriendCard;