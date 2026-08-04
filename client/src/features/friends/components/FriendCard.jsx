import React, { useState } from "react";
import Avatar from "../../../shared/components/Avatar";
import { Link } from "react-router";
import { changeSpace } from "../../../shared/hooks/space";
const FriendCard = ({ friend, onUnfriend, onBlock }) => {
  const {
    _id,
    username = "Unknown",
    avatar,
    xp = 0,
    level = 1,
    currentXP,
    requiredXP,
    onlineStatus,
  } = friend || {};
  // console.log(friend)

  const progressPercentage = Math.floor((currentXP / requiredXP) * 100);

  return (
    <div className="flex justify-between items-center border border-border py-3 px-4 hover:bg-surface-2 font-sans transition-colors">
      <div className="flex items-center gap-3 flex-1 overflow-hidden">
        <Avatar data={friend} />
        <div className="flex flex-col flex-start">
          <span className="text-text-primary text-xl uppercase truncate font-bold  ">
            {changeSpace(username)}
          </span>
          {onlineStatus ? (
            <span className="text-accent text-xs font-light  uppercase ">
              online //
            </span>
          ) : (
            <span className="text-text-secondary text-xs font-light uppercase ">
              offline //
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
              XP:{currentXP}/{requiredXP}
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
        <Link to={`/profile/${_id}`}>
          <button className="border border-border text-text-primary text-xs px-2 py-1 cursor-pointer hover:bg-accent hover:text-black active:bg-danger active:border-danger active:text-text-primary  transition-colors">
            PROFILE
          </button>
        </Link>

        <button
          onClick={() => onUnfriend(_id)}
          className="border border-border text-text-primary text-xs px-2 py-1 cursor-pointer hover:bg-danger  transition-colors"
        >
          REMOVE
        </button>
        <button
          onClick={() => onBlock(_id)}
          className="border border-border text-danger text-xs px-2 py-1 hover:bg-danger hover:text-text-primary cursor-pointer  transition-colors"
        >
          BLOCK
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
