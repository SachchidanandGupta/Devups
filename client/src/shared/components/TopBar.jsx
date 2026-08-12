import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { CiBellOn } from "react-icons/ci";
import { MdOutlineTerminal } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import useAuth from "../../features/auth/hooks/useAuth";
import useUser from "../../features/user/hooks/useUser";
import useContest from "../../features/contest/hooks/useContest";
import useFriend from "../../features/friends/hooks/useFriend";
import useNotification from "../../features/notifications/hooks/useNotification";
import Dropdown from "./Dropdown";
import Avatar from "./Avatar";
import BellDropdown from "./BellDropdown";
import Terminal from "./Terminal";

const pageFields = [
  { path: "/contest/create", pageField: "create_session" },
  { path: "/contest", pageField: "contest_terminal" },
  { path: "/leaderboard", pageField: "leaderboard_terminal" },
  { path: "/profile", pageField: "system_user_terminal" },
  { path: "/friends", pageField: "friend_terminal" },
  { path: "/", pageField: "Dashboard" },
];

const TopBar = ({ onToggleMenu }) => {
  const { user } = useAuth();
  const { search, searchResult, setSearchResult } = useUser();
  const { friendContest, incomingContests } = useContest();
  const { requestsPending, pendingFriendRequests } = useFriend();
  const { clearNotifications, notifications, fetchNotifications, read } = useNotification();

  const searchUsers = searchResult;
  const pendingRequests = pendingFriendRequests;
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isBellOpen, setIsBellOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const dropdownRef = useRef(null);
  const bellDropRef = useRef(null);
  const prevBellState = useRef(false);

  const activeNotifications = notifications.filter((s) => s.status === "unread");

  useEffect(() => {
    requestsPending();
    friendContest();
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResult([]);
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (bellDropRef.current && !bellDropRef.current.contains(event.target)) {
        setIsBellOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function updateRead() {
      if (prevBellState.current && !isBellOpen && activeNotifications?.length > 0) {
        await read();
      }
      prevBellState.current = isBellOpen;
    }
    updateRead();
  }, [isBellOpen]);

  const matchedItem = pageFields.find((item) => {
    const currentPath = location.pathname;
    if (currentPath === item.path) return true;
    if (item.path !== "/" && currentPath.startsWith(`${item.path}/`)) return true;
    return false;
  });

  return (
    <header className="flex flex-wrap items-center justify-between p-3 sm:p-4 border-b border-border-white bg-black gap-3">
      {/* Title & Hamburger Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMenu}
          className="lg:hidden text-text-primary hover:text-accent p-1 cursor-pointer focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <HiMenuAlt3 size={28} />
        </button>

        {matchedItem && (
          <h2 className="text-lg sm:text-2xl font-semibold font-sans text-accent uppercase tracking-wider">
            {matchedItem.pageField}
          </h2>
        )}
      </div>

      {/* Right Actions / Tools */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end sm:flex-initial">
        {/* Search Bar */}
        <div className="relative flex-1 sm:flex-initial max-w-[200px] sm:max-w-xs" ref={dropdownRef}>
          <input
            onChange={(e) => {
              setIsBellOpen(false);
              setQuery(e.target.value);
            }}
            value={query}
            type="text"
            placeholder="SEARCH..."
            className="w-full text-xs sm:text-sm text-text-primary bg-surface-2 px-2.5 py-1.5 sm:py-2 border border-border-bright focus:outline-none focus:border-accent"
          />

          {isOpen && searchUsers && (
            <Dropdown
              dropdownRef={dropdownRef}
              searchUsers={searchUsers}
              user={user}
              setIsOpen={setIsOpen}
            />
          )}
        </div>

        {/* Notifications Icon */}
        <div className="relative" ref={bellDropRef}>
          <button
            onClick={() => {
              setIsOpen(false);
              setIsBellOpen(!isBellOpen);
            }}
            className={`p-1.5 sm:p-2 rounded-full transition-colors hover:bg-accent-dim hover:text-accent focus:outline-none ${
              isBellOpen ? "text-accent bg-accent-dim" : "text-text-primary"
            }`}
            aria-label="Notifications"
          >
            <CiBellOn size={26} className="sm:w-[30px] sm:h-[30px]" />
          </button>

          {(incomingContests?.length || 0) +
            (pendingRequests?.length || 0) +
            (activeNotifications?.length || 0) > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent animate-pulse" />
          )}

          {isBellOpen && (
            <BellDropdown
              clearAll={clearNotifications}
              setIsBellOpen={setIsBellOpen}
              ref={bellDropRef}
              contest={incomingContests}
              requests={pendingRequests}
              notifications={notifications}
            />
          )}
        </div>

        {/* Terminal Toggle Button */}
        <div>
          <button
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="p-1.5 text-text-primary hover:text-accent transition-colors focus:outline-none"
            aria-label="Toggle Terminal"
          >
            <MdOutlineTerminal size={26} className="sm:w-[28px] sm:h-[28px]" />
          </button>
        </div>

        {isTerminalOpen && <Terminal />}

        {/* User Profile Avatar */}
        <Link to={`/profile/${user?._id}`}>
          <Avatar data={user} style="border-accent hover:opacity-80 transition-opacity" />
        </Link>
      </div>
    </header>
  );
};

export default TopBar;