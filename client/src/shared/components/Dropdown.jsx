import React from "react";
import Avatar from "./Avatar";

const Dropdown = ({searchUsers,dropdownRef,user,request}) => {
 console.log(searchUsers);
  
  return (
    <div
      className="flex flex-col absolute w-full mt-1 border border-accent-muted bg-surface-2 z-50"
      ref={dropdownRef}
    >
      <div className="text-accent font-bold text-xs px-2 py-1 border-b border-border uppercase bg-accent-dim tracking-widest">
        Search_Output: Users
      </div>
      
      {searchUsers && searchUsers.length > 0 ? (
        <div className="max-h-[300px] overflow-y-auto">
          {searchUsers.map((s) => (
            <div
              className="flex items-center hover:bg-accent-dim justify-between gap-2 border-b py-2 bg-surface-2 border-border p-2"
              key={s._id}
            >
              <div className="flex gap-2 items-center">
                <Avatar data={s} />
                <div className="flex flex-col justify-start">
                  <span className="text-text-primary text-sm first-letter:uppercase font-bold">
                    {s.username}
                  </span>
                  <span className="text-[10px] text-accent font-mono uppercase tracking-widest">
                    LVL:{s.level}
                  </span>
                </div>
              </div>
              <div>
                {String(s._id) !== String(user._id) && (
                  <button
                    onClick={() => request(s._id)}
                    className="bg-surface-2 text-accent border border-accent px-3 py-1.5 cursor-pointer text-xs hover:text-black hover:bg-accent font-bold transition-colors uppercase tracking-wider"
                  >
                    + Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1.5 h-[120px] bg-surface-2 p-4 text-center border-t border-border">
          <span className="text-accent text-sm font-bold tracking-wider uppercase">
            user_not_found
          </span>
          <span className="text-text-muted text-[10px] opacity-70 tracking-widest font-mono uppercase">
            ERR_NO_MATCH_IN_DATABASE
          </span>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
