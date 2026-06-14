import React from 'react';

const FriendCard = ({ friend, onUnfriend, onBlock }) => {
  const { _id, username = "Unknown", avatar, xp = 0, level = 1 } = friend || {};

  return (
    <div className="flex justify-between items-center border-b border-border py-3 px-4 hover:bg-surface-2 font-mono transition-colors">
      
      <div className="flex items-center gap-3 flex-1 overflow-hidden">
        <div className="w-8 h-8 bg-surface-2 border border-border flex items-center justify-center shrink-0">
          {avatar ? (
            <img src={avatar} alt={username} className="w-full h-full object-cover" />
          ) : (
            <span className="text-text-secondary text-sm">
              {username.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <span className="text-text-primary text-sm uppercase truncate">
          {username}
        </span>
      </div>

      <div className="flex-1 flex gap-8 text-sm">
        <span className="w-16 text-text-secondary">LVL {level}</span>
        <span className="w-24 text-accent font-bold">{xp} XP</span>
      </div>

      <div className="flex-1 flex gap-2 justify-end">
        <button
          onClick={() => onUnfriend(_id)}
          className="border border-danger text-danger text-xs px-2 py-1 hover:bg-danger-dim font-mono transition-colors"
        >
          UNFRIEND
        </button>
        <button
          onClick={() => onBlock(_id)}
          className="border border-border text-text-muted text-xs px-2 py-1 hover:bg-surface-2 font-mono transition-colors"
        >
          BLOCK
        </button>
      </div>

    </div>
  );
};

export default FriendCard;