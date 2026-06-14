import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { CiBellOn } from "react-icons/ci";
const TopBar = ({ pageField, searchBar, user }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 mb-7 border-b border-border">
      <div className="flex items-center gap-4 ">
        <h2 className="text-2xl font-semibold sm:text-2xl font-mono text-accent">
          {pageField}
        </h2>
        <Link to="/">
          <h2 className="text-lg font-base sm:text-sm font-mono text-text-secondary hover:text-text-primary cursor-pointer">
            DASHBOARD
          </h2>
        </Link>
        <Link to="/activity">
          <h2 className="text-lg font-base sm:text-sm font-mono text-text-secondary hover:text-text-primary cursor-pointer">
            ACTIVITY
          </h2>
        </Link>
        <Link to="/settings">
          <h2 className="text-lg font-base sm:text-sm font-mono text-text-secondary hover:text-text-primary cursor-pointer">
            SETTINGS
          </h2>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {searchBar ? (
          <input
            type="text"
            placeholder="SEARCH_TERMINAL..."
            className=" text-sm bg-surface-2 pl-2 pr-6 py-2 border border-border-bright"
          />
        ) : (
          ""
        )}
        
        <CiBellOn size={24} className="hover:text-accent font-bold cursor-pointer p-2 h-auto w-auto border-none hover:bg-accent-dim rounded-full  " />
        <Link to="/profile">
          <div className="relative w-10 h-10 rounded-none overflow-hidden bg-surface-2 border border-border flex-shrink-0">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-secondary font-bold font-mono text-xl bg-surface-2">
                {user.username ? user.username.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
