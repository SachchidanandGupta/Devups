import React, { useEffect } from "react";
import useFriend from "../hooks/useFriend";
import useFriendStore from "../store/useFriendStore";
import FriendCard from "../components/FriendCard";
import { FriendSkeleton } from "../../../shared/ui/Skeleton";

const Friends = () => {
  const { fetchFriends, removeFriend, block } = useFriend();

  const friends = useFriendStore((state) => state.friends);
  const isLoading = useFriendStore((state) => state.isLoading);

useEffect(() => {
  fetchFriends();
}, []);

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

  return (
    <div className="w-full p-2 pt-4 flex flex-col font-mono">
      
      <div className="border-b border-border pb-2 mb-7">
        <h2 className="text-accent font-bold text-xl">
          FRIENDS
        </h2>
        <p className="text-text-muted text-xs uppercase mt-1">
          YOUR_NETWORK
        </p>
      </div>

      <div className="flex justify-between px-4 py-2 border-b border-border text-text-muted text-xs uppercase">
        <div className="flex-1">DEVELOPER_IDENTITY</div>
        <div className="flex-1 flex gap-8">
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
  );
};

export default Friends;