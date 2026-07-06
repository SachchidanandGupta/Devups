import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router";
import { CiBellOn } from "react-icons/ci";
import useAuth from "../../features/auth/hooks/useAuth";
import useUser from "../../features/user/hooks/useUser";
import useContest from "../../features/contest/hooks/useContest";
import useFriend from "../../features/friends/hooks/useFriend";
import Dropdown from "./Dropdown";
import Avatar from "./Avatar";
import BellDropdown from "./BellDropdown";
import { getSocket } from "../hooks/useSocket";
import { MdOutlineTerminal } from "react-icons/md";
import Terminal from "./Terminal";
const TopBar = ({ pageField, searchBar }) => {
  const { user } = useAuth();
  const { search, searchResult, setSearchResult } = useUser();
  const { friendContest, incomingContests } = useContest();
  const { request, requestsPending, pendingFriendRequests } = useFriend();
  const searchUsers = searchResult;
  const pendingRequests = pendingFriendRequests;
  const location = useLocation();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    socket.on("friend:activity", () => {
      requestsPending();
      friendContest();
    });
    return () => socket.off("friend:activity");
  }, []);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const bellDropRef = useRef(null);
  const [isBellOpen, setIsBellOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleClickBellOutside(event) {
      if (bellDropRef.current && !bellDropRef.current.contains(event.target))
        setIsBellOpen(false);
    }
    document.addEventListener("mousedown", handleClickBellOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickBellOutside);
  }, []);

  return (
    <div className="  flex flex-col sm:flex-row sm:items-center justify-between p-4  border-b border-border">
      <div className="flex items-center gap-4 ">
        <h2 className="text-2xl font-semibold sm:text-2xl font-mono text-accent uppercase">
          {pageField}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        {searchBar ? (
          <div className="relative">
            <input
              onChange={(e) => {
                setIsBellOpen(false);
                setQuery(e.target.value);
              }}
              value={query}
              type="text"
              placeholder="SEARCH_TERMINAL..."
              className=" text-sm text-text-primary bg-surface-2 pl-2 pr-6 py-2 border border-border-bright focus:outline-none focus:border-accent"
            />

            {isOpen && searchUsers && (
              <Dropdown
                dropdownRef={dropdownRef}
                searchUsers={searchUsers}
                user={user}
                request={request}
              />
            )}
          </div>
        ) : (
          ""
        )}
        <div className="relative" ref={bellDropRef}>
          <CiBellOn
            size={36}
            onClick={() => {
              setIsOpen(false);
              setIsBellOpen(!isBellOpen);
            }}
            className={`cursor-pointer p-2 rounded-full transition-colors hover:bg-accent-dim hover:text-accent ${isBellOpen ? "text-accent bg-accent-dim" : "text-text-primary"}`}
          />

          {incomingContests.length + pendingRequests.length > 0 ? (
            <div className="absolute top-0 right-0 h-2 w-2 m-1 text-sm rounded-full bg-accent  text-text-primary"></div>
          ) : (
            ""
          )}
          {isBellOpen && (
            <BellDropdown
              ref={bellDropRef}
              contest={incomingContests}
              requests={pendingRequests}
            />
          )}
        </div>
        <div>
          <MdOutlineTerminal
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            size={24}
            className="hover:text-accent cursor-pointer"
          />
        </div>
        {isTerminalOpen && <Terminal />}
        <Link to={`/profile/${user._id}`}>
          <Avatar data={user} style={"border-accent"} />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
