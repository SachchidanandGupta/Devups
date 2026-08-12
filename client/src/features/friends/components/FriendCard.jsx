import React from "react";
import Avatar from "../../../shared/components/Avatar";
import { Link } from "react-router-dom";
import { changeSpace } from "../../../shared/hooks/space";

const FriendCard = ({ friend, onUnfriend, onBlock }) => {
  const {
    _id,
    username = "Unknown",
    xp = 0,
    level = 1,
    currentXP = 0,
    requiredXP = 100,
    onlineStatus = false,
  } = friend || {};

  const progressPercentage = Math.min(
    100,
    Math.floor((currentXP / (requiredXP || 1)) * 100)
  );

  return (
    <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-stretch md:items-center border border-border md:border-b md:border-x-0 md:border-t-0 p-4 hover:bg-surface-2/60 font-sans transition-colors bg-surface-1/40 md:bg-transparent">
      
      {/* 1. Identifier Column */}
      <div className="col-span-4 flex items-center gap-3 overflow-hidden">
        <Avatar data={friend} />
        <div className="flex flex-col min-w-0">
          <span className="text-text-primary text-base sm:text-lg uppercase truncate font-bold tracking-wide">
            {changeSpace(username)}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`h-2 w-2 ${
                onlineStatus ? "bg-accent animate-pulse" : "bg-text-secondary/40"
              }`}
            />
            <span
              className={`text-xs font-sans uppercase ${
                onlineStatus ? "text-accent" : "text-text-secondary"
              }`}
            >
              {onlineStatus ? "ONLINE" : "OFFLINE"}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Row Divider */}
      <div className="md:hidden h-[1px] bg-border/40 my-1" />

      {/* 2. Level & Progress Stats Container */}
      <div className="col-span-5 grid grid-cols-3 md:grid-cols-5 gap-3 items-center">
        {/* Level Badge */}
        <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
          <span className="text-text-primary text-xs font-sans font-bold px-2.5 py-1 border border-border bg-black/50 text-nowrap">
            LVL {level}
          </span>
        </div>

        {/* XP Bar */}
        <div className="col-span-2 md:col-span-3 flex flex-col gap-1">
          <div className="flex justify-between items-center text-[10px] sm:text-xs font-sans text-text-secondary">
            <span>XP: {currentXP}/{requiredXP}</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-surface-2 h-2.5 border border-border overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Actions Button Column */}
      <div className="col-span-3 flex items-center justify-end gap-2 mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-border/40">
        <Link to={`/profile/${_id}`} className="flex-1 md:flex-initial">
          <button className="w-full uppercase border border-border text-text-primary text-xs px-2.5 py-1.5 font-sans font-semibold cursor-pointer hover:bg-accent hover:text-black active:bg-danger active:border-danger active:text-text-primary transition-colors">
            PROFILE
          </button>
        </Link>

        <button
          onClick={() => onUnfriend(_id)}
          className="flex-1 md:flex-initial uppercase border border-border text-text-primary text-xs px-2.5 py-1.5 font-sans font-semibold cursor-pointer hover:bg-danger hover:border-danger transition-colors"
        >
          REMOVE
        </button>

        <button
          onClick={() => onBlock(_id)}
          className="flex-1 md:flex-initial uppercase border border-border text-danger text-xs px-2.5 py-1.5 font-sans font-semibold hover:bg-danger hover:text-text-primary cursor-pointer transition-colors"
        >
          BLOCK
        </button>
      </div>

    </div>
  );
};

export default FriendCard;