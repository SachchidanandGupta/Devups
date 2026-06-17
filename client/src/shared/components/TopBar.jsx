import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { CiBellOn } from "react-icons/ci";
import useAuthStore from "../../features/auth/store/authStore";
import useUserStore from "../../features/user/stores/useUserStore";
import useUser from "../../features/user/hooks/useUser";
import useContestStore from "../../features/contest/stores/useContestStore";
import useFriend from "../../features/friends/hooks/useFriend";
const TopBar = ({ pageField, searchBar }) => {
  const user = useAuthStore((state) => state.user) || {};
  const searchUsers = useUserStore((state) => state.searchResult) || {};
  const incomingContests = useContestStore((state) => state.incomingContests) || {};
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
              <div className="absolute w-full" ref={dropdownRef}>
                {searchUsers.map((s, index) => (
                  <div
                    className=" flex items-center justify-between gap-2 border bg-surface-2 border-border p-2  "
                    key={s._id}
                  >
                    <div className="flex gap-2">
                      <div className="relative w-10 h-10  overflow-hidden bg-surface-2 border border-border shrink-0 ">
                        {s.avatar ? (
                          <img
                            src={s.avatar}
                            alt="User"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-secondary font-bold font-mono text-xl bg-surface-2">
                            {s.username
                              ? s.username.charAt(0).toUpperCase()
                              : "U"}
                          </div>
                        )}
                      </div>
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
                          className="bg-accent px-5 py-2 hover:bg-text-primary cursor-pointer hover:text-text-secondary font-semibold"
                        >
                          Add
                        </button>
                      ) : (
                        <button className="bg-accent px-5 py-2 hover:bg-text-primary cursor-pointer hover:text-text-secondary font-semibold">
                          you
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
          {incomingContests.length > 0 ? (
            <div className="absolute top-0 right-1 h-auto w-auto m-1 text-sm flex justify-between items-center rounded-full  text-accent">
              {incomingContests.length}
            </div>
          ) : (
            ""
          )}
        </div>
        <Link to="/profile">
          <div className="relative w-10 h-10  overflow-hidden bg-surface-2 border border-accent shrink-0 ">
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
