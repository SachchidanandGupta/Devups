import React, { useEffect, useState, useRef } from "react";
import useFriend from "../hooks/useFriend";
import useFriendStore from "../store/useFriendStore";
import FriendCard from "../components/FriendCard";
import TopBar from "../../../shared/components/TopBar";
import { FriendSkeleton } from "../../../shared/ui/Skeleton";
import RequestDropdown from "../components/RequestDropdown";
import { getSocket } from "../../../shared/hooks/useSocket";
const Friends = () => {
  const { fetchFriends, removeFriend, block, requestsPending, response } =
    useFriend();
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    socket.on("friend:activity", (data) => {
      console.log("friendRequest",data);
      fetchFriends();
      requestsPending();
    });
    return () => socket.off("friend:activity");
  }, []);

  const friends = useFriendStore((state) => state.friends);
  const isLoading = useFriendStore((state) => state.isLoading);
  const pendingFriendRequests =
    useFriendStore((state) => state.pendingFriendRequests) || [];

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

  const handleUnfriend = async (id) => {
    const prev = useFriendStore.getState().friends;
    useFriendStore.getState().setFriends(prev.filter((f) => f._id !== id));
    try {
      await removeFriend(id);
    } catch (err) {
      useFriendStore.getState().setFriends(prev);
    }
  };

  const handleBlock = async (id) => {
    const prev = useFriendStore.getState().friends;
    useFriendStore.getState().setFriends(prev.filter((f) => f._id !== id));
    try {
      await block(id);
    } catch (err) {
      useFriendStore.getState().setFriends(prev);
    }
  };

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
    <div className="flex flex-col">
      <TopBar pageField="FRIEND_TERMINAL" />
      <div className=" m-2 flex justify-between ">
        <div>
          <h1 className="text-4xl font-mono font-bold uppercase ">
            friends({friends?.length} online)
          </h1>
          <h1 className="uppercase flex gap-2 items-center text-accent">
            <div className="bg-accent h-2 w-2"></div>uplink stable // session:
            active
          </h1>
        </div>
        <div
          ref={dropdownRef}
          className=" grid grid-cols-2 gap-2 items-center relative "
        >
          <button className="uppercase border col-span-1 border-text-secondary text-text-primary px-4 py-1 font-bold cursor-pointer hover:bg-accent hover:text-surface">
            add friends
          </button>
          <button
            ref={dropdownRef}
            onClick={() => setIsOpen((prev) => !prev)}
            className="uppercase border col-span-1  border-text-secondary text-text-primary px-4 py-1 font-bold cursor-pointer hover:bg-text-primary  hover:text-surface"
          >
            request
            {pendingFriendRequests.length > 0 ? (
              <span>[{pendingFriendRequests.length}]</span>
            ) : (
              ""
            )}
            
          </button>

          {isOpen ? (
            <RequestDropdown
              requests={pendingFriendRequests}
              accept={handleAccept}
              decline={handleDecline}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="w-full p-2 pt-4 flex flex-col font-mono ">
        <div className="flex justify-between py-4 px-4  bg-surface-2 border border-border text-text-secondary text-sm uppercase">
          <div className="flex-1">DEVELOPER_IDENTITY</div>
          <div className="flex-1 flex justify-between">
            <div className="w-16">LEVEL</div>
            <div className="w-24">XP</div>
          </div>
          <div className="flex-1 text-right">ACTIONS</div>
        </div>

        <div className="flex flex-col">
          {isLoading ? (
            <FriendSkeleton />
          ) : !friends || friends.length === 0 ? (
            <div className="text-text-muted text-sm text-center py-20">
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
  );
};

export default Friends;
