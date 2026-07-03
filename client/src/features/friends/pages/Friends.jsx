import React, { useEffect, useState, useRef } from "react";
import useFriend from "../hooks/useFriend";
import FriendCard from "../components/FriendCard";
import TopBar from "../../../shared/components/TopBar";
import { FriendSkeleton } from "../../../shared/ui/Skeleton";
import RequestDropdown from "../components/RequestDropdown";
import { getSocket } from "../../../shared/hooks/useSocket";
const Friends = () => {
  const {
    request,
    fetchFriends,
    removeFriend,
    block,
    response,
    requestsPending,
    friends,
    pendingFriendRequests = [],
    error,
    isLoading,
  } = useFriend();
  useEffect(() => {
    fetchFriends();
    requestsPending();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
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

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col font-mono w-full min-h-screen bg-black">
      <TopBar pageField="FRIEND_TERMINAL" />

      <div className="w-full p-4 sm:p-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div className="flex flex-col min-w-0">
            <h1 className="text-2xl sm:text-4xl font-bold uppercase truncate text-text-primary tracking-tight">
              friends ({friends?.length || 0} online)
            </h1>
            <div className="flex items-center gap-2 mt-1 uppercase text-xs sm:text-sm text-accent tracking-widest font-bold">
              <div className="h-2 w-2 bg-accent shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.6)] animate-pulse"></div>
              uplink stable // session: active
            </div>
          </div>

          <div
            className="flex items-center gap-3 shrink-0 relative"
            ref={dropdownRef}
          >
            <button className="uppercase border border-border text-text-primary text-xs sm:text-sm px-3 sm:px-4 py-1.5 font-bold cursor-pointer hover:bg-accent hover:border-accent hover:text-black transition-colors">
              Add Friend
            </button>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className={`uppercase border text-xs sm:text-sm px-3 sm:px-4 py-1.5 font-bold cursor-pointer transition-colors ${
                isOpen || pendingFriendRequests.length > 0
                  ? "border-accent text-accent hover:bg-accent hover:text-black"
                  : "border-border text-text-primary hover:bg-text-primary hover:text-black"
              }`}
            >
              Requests
              {pendingFriendRequests?.length > 0 && (
                <span className="ml-1.5">[{pendingFriendRequests.length}]</span>
              )}
            </button>

            {isOpen && (
              <div className="absolute top-full right-0 mt-2 z-50 min-w-[250px]">
                <RequestDropdown
                  requests={pendingFriendRequests}
                  accept={handleAccept}
                  decline={handleDecline}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between px-4 py-2 bg-surface-2 border border-border text-text-muted text-xs uppercase tracking-widest">
            <div className="flex-1 min-w-0 pr-4">IDENTIFIER</div>
            <div className="flex-1 flex gap-8 min-w-0">
              <div className="w-35">LEVEL</div>
              <div className="w-24 text-right sm:text-left">XP</div>
            </div>
            <div className="flex-1 text-right">ACTIONS</div>
          </div>

          <div className="flex flex-col border-x border-b border-border bg-black">
            {isLoading ? (
              <FriendSkeleton />
            ) : !friends || friends.length === 0 ? (
              <div className="text-text-muted text-xs sm:text-sm text-center py-20 uppercase tracking-widest">
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
