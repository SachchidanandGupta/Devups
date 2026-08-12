import React, { useEffect, useState, useRef } from "react";
import useFriend from "../hooks/useFriend";
import useUser from "../../user/hooks/useUser";
import FriendCard from "../components/FriendCard";
import { FriendSkeleton } from "../../../shared/ui/Skeleton";
import RequestDropdown from "../components/RequestDropdown";
import AddFriendDrop from "../components/AddFriendDrop";

const Friends = () => {
  const {
    fetchFriends,
    removeFriend,
    block,
    response,
    requestsPending,
    friends = [],
    pendingFriendRequests = [],
    isLoading,
  } = useFriend();

  const { search, searchResult, setSearchResult } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const dropdownRef = useRef(null);
  const addRef = useRef(null);

  useEffect(() => {
    fetchFriends();
    requestsPending();
  }, []);

  const handleAccept = async (requestId, requestResponse) => {
    await response(requestId, requestResponse);
    await fetchFriends();
    await requestsPending();
  };

  const handleDecline = async (requestId, requestResponse) => {
    await response(requestId, requestResponse);
    await fetchFriends();
    await requestsPending();
  };

  const handleUnfriend = async (id) => await removeFriend(id);
  const handleBlock = async (id) => await block(id);

  // Outside click handlers
  useEffect(() => {
    function handleClickOutside(event) {
      if (addRef.current && !addRef.current.contains(event.target)) {
        setIsAddOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col font-sans w-full min-h-screen bg-black text-text-primary">
      <div className="w-full p-3 sm:p-6 flex flex-col gap-6 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
          <div className="flex font-bold uppercase min-w-0">
            <div className="w-1 bg-accent mr-3 shrink-0"></div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-xl sm:text-3xl font-sans truncate tracking-wide">
                friends_({friends?.length || 0} online)
              </h1>
              <div className="flex items-center gap-2 mt-1 uppercase text-xs sm:text-sm text-accent tracking-widest font-bold">
                <span className="truncate">
                  uplink stable // session: active
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            {/* Add Friend Dropdown */}
            <div className="relative" ref={addRef}>
              <button
                onClick={() => setIsAddOpen((prev) => !prev)}
                className="uppercase border border-accent text-accent text-xs sm:text-sm px-3 sm:px-4 py-2 font-bold cursor-pointer hover:bg-accent hover:border-accent hover:text-black active:bg-danger active:border-danger active:text-text-primary transition-colors"
              >
                + Add Friend
              </button>
              {isAddOpen && (
                <div className="absolute top-full right-0 mt-2 z-50 w-[280px] sm:w-[320px]">
                  <AddFriendDrop
                    close={setIsAddOpen}
                    addRef={addRef}
                    search={search}
                    results={searchResult}
                    setSearchResult={setSearchResult}
                  />
                </div>
              )}
            </div>

            {/* Friend Requests Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={`uppercase border text-xs sm:text-sm px-3 sm:px-4 py-2 font-bold cursor-pointer transition-colors ${
                  isOpen || pendingFriendRequests.length > 0
                    ? "bg-accent text-black border-accent"
                    : "border-border-white text-text-primary hover:bg-text-primary hover:text-black"
                }`}
              >
                Requests
                {pendingFriendRequests?.length > 0 && (
                  <span className="ml-1.5 font-extrabold">
                    [{pendingFriendRequests.length}]
                  </span>
                )}
              </button>

              {isOpen && (
                <div className="absolute top-full right-0 mt-2 z-50 w-[280px] sm:w-[320px]">
                  <RequestDropdown
                    requests={pendingFriendRequests}
                    accept={handleAccept}
                    decline={handleDecline}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="flex flex-col">
          {/* Table Header (Desktop Only) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2.5 bg-surface-2 border border-border text-text-secondary text-xs uppercase tracking-widest font-sans">
            <div className="col-span-4">IDENTIFIER</div>
            <div className="col-span-2 text-center">LEVEL</div>
            <div className="col-span-3">PROGRESS (XP)</div>
            <div className="col-span-3 text-right">ACTIONS</div>
          </div>

          {/* Cards List Container */}
          <div className="flex flex-col gap-3 md:gap-0 border-t md:border-t-0 md:border-x md:border-b border-border bg-black">
            {isLoading ? (
              <FriendSkeleton />
            ) : !friends || friends.length === 0 ? (
              <div className="text-text-muted text-xs sm:text-sm text-center py-16 uppercase tracking-widest font-sans border border-border md:border-none">
                NO_FRIENDS_FOUND
              </div>
            ) : (
              friends.map((friend) => (
                <FriendCard
                  key={friend._id || friend.id}
                  friend={friend}
                  onUnfriend={handleUnfriend}
                  onBlock={handleBlock}
                />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Friends;