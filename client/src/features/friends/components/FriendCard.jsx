import React from "react";

const FriendCard = ({ friend, onUnfriend, onBlock, isOnline }) => {
  const { _id, username = "Unknown", avatar, xp = 0, level = 1 } = friend || {};
  const xpInCurrentLevel = xp % 100;
  const progressPercentage = Math.floor((xpInCurrentLevel / 100) * 100);
  const xpToNextLevel = 100 - xpInCurrentLevel;

  return (
    <div className="flex justify-between items-center border border-border py-3 px-4 hover:bg-surface-2 font-mono transition-colors">
      <div className="flex items-center gap-3 flex-1 overflow-hidden">
        <div className="w-10 h-10 bg-surface-2 border border-border flex items-center justify-center shrink-0">
          {avatar ? (
            <img
              src={avatar}
              alt={username}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-text-secondary text-sm">
              {username.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex flex-col flex-start">
          <span className="text-text-primary text-xl uppercase truncate font-mono ">
            {username}
          </span>
          {isOnline ? (
            <span className="text-accent text-xs font-light  uppercase font-mono">
              online
            </span>
          ) : (
            <span className="text-text-secondary text-xs font-light uppercase font-mono">
              offline
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-between text-sm">
        <span className="w-16 text-text-primary px-2 flex justify-center py-2 border-2 border-border text-nowrap ">
          LVL {level}
        </span>
        <div className="w-54 ">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary text-xs font-mono ">
              XP:{xp}
            </span>
            <span className="text-text-secondary text-xs font-mono ">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-surface  h-3 overflow-hidden border border-border flex flex-col">
            <div
              className=" bg-accent  h-full   "
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-2 justify-end">
        <button className="border border-border text-text-primary text-xs px-2 py-1 cursor-pointer hover:bg-accent font-mono transition-colors">
          PROFILE
        </button>
        <button
          onClick={() => onUnfriend(_id)}
          className="border border-border text-text-primary text-xs px-2 py-1 cursor-pointer hover:bg-danger font-mono transition-colors"
        >
          REMOVE
        </button>
        <button
          onClick={() => onBlock(_id)}
          className="border border-border text-danger text-xs px-2 py-1 hover:bg-danger hover:text-text-primary cursor-pointer font-mono transition-colors"
        >
          BLOCK
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
