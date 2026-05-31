import React from "react";
import { FiCalendar, FiCheckCircle,  } from "react-icons/fi";
import { GoTrophy } from "react-icons/go";

const FriendContestCard = ({ contest, onComplete }) => {
 
  const {
    _id,
    participants = [],
    startTime,
    endTime,
    status = "pending", 
    winner, 
    scores, 
  } = contest || {};

  
  const formatTime = (dateStr) => {
    if (!dateStr) return "TBA";
    return new Date(dateStr)
      .toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", " •");
  };

  const normalizedStatus = status.toLowerCase();
  let statusStyles = "bg-zinc-800 text-slate-400 border-zinc-700";
  let statusGlow = "";

  if (normalizedStatus === "pending") {
    statusStyles = "bg-amber-500/10 text-amber-400 border-amber-500/30";
  } else if (normalizedStatus === "active") {
    statusStyles = "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
    statusGlow = "animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.4)]";
  } else if (normalizedStatus === "completed") {
    statusStyles = "bg-purple-500/10 text-purple-400 border-purple-500/30";
  }

  return (
    <div className="flex flex-col bg-zinc-900/40 rounded-2xl border border-zinc-800/60 hover:bg-zinc-900 hover:border-zinc-700/80 transition-all duration-300 group overflow-hidden h-full">
      
      <div className="flex justify-between items-center p-5 sm:p-6 border-b border-zinc-800/60">
        
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${statusStyles}`}>
          {normalizedStatus === "active" && (
            <div className={`w-2 h-2 rounded-full bg-cyan-400 ${statusGlow}`}></div>
          )}
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            {status}
          </span>
        </div>

        {normalizedStatus !== "completed" && (
          <button
            onClick={() => onComplete && onComplete(_id)}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-zinc-950 transition-colors duration-300"
          >
            <FiCheckCircle size={14} />
            Complete
          </button>
        )}
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-4 flex-grow">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Participants
        </p>
        
        <div className="flex items-center -space-x-3">
          {participants.map((user, index) => {
            const { username = "Unknown", avatar } = user || {};
            return (
              <div
                key={user._id || index}
                className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-900 flex-shrink-0 group-hover:border-zinc-800 transition-colors z-10"
                style={{ zIndex: participants.length - index }}
                title={username}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt={username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-lg bg-gradient-to-br from-zinc-700 to-zinc-800">
                    {username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            );
          })}
          
          {participants.length === 0 && (
            <span className="text-sm text-slate-500 italic">No participants</span>
          )}
        </div>
      </div>

      <div className="px-5 sm:px-6 pb-5">
        <div className="flex flex-col gap-1.5 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
          <div className="flex items-center gap-2 text-slate-400">
            <FiCalendar size={14} className="text-cyan-500/70" />
            <span className="text-xs font-medium">
              <strong className="text-slate-300 font-semibold">Starts:</strong> {formatTime(startTime)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <FiCalendar size={14} className="text-purple-500/70" />
            <span className="text-xs font-medium">
              <strong className="text-slate-300 font-semibold">Ends:</strong> {formatTime(endTime)}
            </span>
          </div>
        </div>
      </div>

      {normalizedStatus === "completed" && (
        <div className="bg-gradient-to-r from-purple-500/20 to-zinc-900 border-t border-purple-500/30 p-4 sm:p-5 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <GoTrophy size={18} className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                Winner
              </span>
              <span className="text-sm sm:text-base font-black text-slate-100">
                {winner?.username || winner || "TBD"}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FriendContestCard;