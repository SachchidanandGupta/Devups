import React from "react";
import Avatar from "./Avatar";

const Dropdown = ({searchUsers,dropdownRef,user,request}) => {

  
  return (
    <div
      className="flex flex-col  absolute w-full mt-1 border border-accent-muted "
      ref={dropdownRef}
    >
      <div className="text-accent font-bold text-sm px-2 py-1  border-0 border-border uppercase bg-accent-dim ">
        Search Output: users
      </div>
      <div>
        {searchUsers.map((s, index) => (
          <div
            className=" flex items-center hover:bg-accent-dim justify-between gap-2 border-t border-b py-2 bg-surface-2 border-border p-2  "
            key={s._id}
          >
            <div className="flex gap-2  ">
              <Avatar data={s}/>
              <div className="flex flex-col  justify-start">
                <span className="text-text-primary text-sm first-letter:uppercase font-bold">
                  {s.username}
                </span>
                <span className="text-xs text-accent font-semibold">
                  lvl:{s.level}
                </span>
              </div>
            </div>
            <div>
              {String(s._id) != String(user._id) ? (
                <button
                  onClick={() => request(s._id)}
                  className="bg-surface-2 text-accent border border-accent px-2 py-2  cursor-pointer text-xs hover:text-surface-2 hover:bg-accent font-semibold"
                >
                  + Add
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
