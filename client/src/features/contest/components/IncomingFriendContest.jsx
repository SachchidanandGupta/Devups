import React from "react";

const IncomingFriendContest = ({ contest, onAccept, onReject }) => {
  const { _id, creator, contestName, endTime } = contest || {};
  return (
    <div className="border border-border gap-2 p-4 flex flex-col min-w-0">
      <div className="flex items-center justify-start gap-2 min-w-0">
        <div className="relative w-10 h-10 overflow-hidden bg-surface-2 border border-border group-hover:border-accent shrink-0">
          {creator.avatar ? (
            <img
              src={creator.avatar}
              alt="User"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-secondary font-bold font-mono text-xl bg-surface-2">
              {creator.username
                ? creator.username.charAt(0).toUpperCase()
                : "U"}
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <span className="first-letter:uppercase font-bold text-xl text-text-primary truncate block">
            {creator.username}
          </span>
          <span className="uppercase text-xs text-accent truncate block mt-0.5">
            invites you to: "{contestName}"
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1 mt-1">
        <button
          onClick={() => onAccept?.(_id)}
          className="col-span-4 bg-accent px-1 py-2 border border-border font-bold text-text-muted cursor-pointer active:scale-95 hover:bg-text-primary hover:border-border transition-colors truncate"
        >
          Accept
        </button>
        <button
          onClick={() => onReject?.(_id)}
          className="col-span-1 bg-surface border border-border cursor-pointer hover:border-danger hover:text-danger flex items-center justify-center transition-colors"
        >
          x
        </button>
      </div>
    </div>
  );
};

export default IncomingFriendContest;
