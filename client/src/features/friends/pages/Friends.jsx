import React, { useEffect } from "react";
import useFriend from "../hooks/useFriend";
import useFriendStore from "../store/useFriendStore";
import FriendCard from "../components/FriendCard";
import TopBar from "../../../shared/components/TopBar";
import { FriendSkeleton } from "../../../shared/ui/Skeleton";

const Friends = () => {
  const { fetchFriends, removeFriend, block } = useFriend();

  const friends = useFriendStore((state) => state.friends);
  const isLoading = useFriendStore((state) => state.isLoading);
  const pendingFriendRequests = useFriendStore((state)=>state.pendingFriendRequests)||[];
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
  console.log(isLoading);
  return (
    <div className="flex flex-col">
      <TopBar pageField="FRIEND_TERMINAL" searchBar={true} />
      <div className=" m-2 flex justify-between ">
        <div>
          
          <h1 className="text-4xl font-mono font-bold uppercase ">friends({friends?.length} online)</h1>
          <h1 className="uppercase flex gap-2 items-center text-accent">
            <div className="bg-accent h-2 w-2"></div>uplink stable // session: active
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <button className="uppercase border border-border text-text-secondary px-4 py-1 font-bold cursor-pointer hover:bg-accent hover:text-text-primary">
            add friends
          </button>
          <button className="uppercase border border-border text-text-secondary px-4 py-1 font-bold cursor-pointer hover:bg-accent hover:text-text-primary">
            request({pendingFriendRequests.length})
          </button>
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
