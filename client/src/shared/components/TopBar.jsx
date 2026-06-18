import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { CiBellOn } from "react-icons/ci";
import useAuthStore from "../../features/auth/store/authStore";
import useUserStore from "../../features/user/stores/useUserStore";
import useUser from "../../features/user/hooks/useUser";
import useContestStore from "../../features/contest/stores/useContestStore";
import useFriend from "../../features/friends/hooks/useFriend";
import useFriendStore from "../../features/friends/store/useFriendStore";
import Dropdown from "./Dropdown";
import Avatar from "./Avatar";
const TopBar = ({ pageField, searchBar }) => {
  const user = useAuthStore((state) => state.user) || {};
  const searchUsers = useUserStore((state) => state.searchResult) || [];
  const incomingContests =
    useContestStore((state) => state.incomingContests) || [];
  const pendingRequests =
    useFriendStore((state) => state.pendingFriendRequests) || [];
  const { search } = useUser();
  const { request } = useFriend();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    if (!query.trim()) {
      useUserStore.getState().setSearchResult([]);
      setIsOpen(false);
      return;
    }
    const timer = setTimeout(() => {
      search(query);
      setIsOpen(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 mb-7 border-b border-border">
      <div className="flex items-center gap-4 ">
        <h2 className="text-2xl font-semibold sm:text-2xl font-mono text-accent">
          {pageField}
        </h2>
        <Link to="/">
          <h2 className="text-lg font-base sm:text-sm font-mono text-text-secondary hover:text-accent cursor-pointer">
            DASHBOARD
          </h2>
        </Link>
        <Link to="/activity">
          <h2 className="text-lg font-base sm:text-sm font-mono text-text-secondary hover:text-accent cursor-pointer">
            ACTIVITY
          </h2>
        </Link>
        <Link to="/settings">
          <h2 className="text-lg font-base sm:text-sm font-mono text-text-secondary hover:text-accent cursor-pointer">
            SETTINGS
          </h2>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {searchBar ? (
          <div className="relative">
            <input
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              type="text"
              placeholder="SEARCH_TERMINAL..."
              className=" text-sm bg-surface-2 pl-2 pr-6 py-2 border border-border-bright focus:outline-none focus:border-accent"
            />

            {isOpen && searchUsers && (
              <Dropdown
                dropdownRef={dropdownRef}
                searchUsers={searchUsers}
                user={user}
              />
            )}
          </div>
        ) : (
          ""
        )}
        <div className="relative">
          <CiBellOn
            size={24}
            className="hover:text-accent font-bold cursor-pointer p-2 h-auto w-auto border-none hover:bg-accent-dim rounded-full  "
          />
          {incomingContests.length + pendingRequests.length > 0 ? (
            <div className="absolute top-0 right-0 h-2 w-2 m-1 text-sm   rounded-full bg-accent  text-text-primary"></div>
          ) : (
            ""
          )}
        </div>
        <Link to="/profile">
         <Avatar data={user} style={"border-accent"}/>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
