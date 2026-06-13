import React, { useEffect } from 'react';
import useFriend from '../hooks/useFriend';
import useFriendStore from '../store/useFriendStore';
import FriendCard from '../components/FriendCard'; 

const Friends = () => {
  const { 
    request, 
    fetchFriends, 
    removeFriend, 
    block, 
    response 
  } = useFriend();
  
  const friends = useFriendStore((state) => state.friends);
  const isLoading = useFriendStore((state) => state.isLoading);

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleUnfriend = async (id) => {
    await removeFriend(id);
    await fetchFriends(); 
  };

  const handleBlock = async (id) => {
    await block(id);
    await fetchFriends();
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col font-sans">
      
      {/* Header */}
      <div className="mb-8 border-b border-zinc-800/60 pb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          Friends
        </h2>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
          Your Network
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-zinc-800 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-4 animate-pulse">
              Loading Network...
            </p>
          </div>
        ) : friends && friends.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 border-dashed">
            <span className="text-4xl drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] mb-3">📭</span>
            <p className="text-slate-400 font-semibold">
              You haven't added any friends yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {friends?.map((friend) => (
              <FriendCard 
                key={friend._id || friend.id} 
                friend={friend} 
                onBlock={handleBlock}       
                onUnfriend={handleUnfriend} 
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Friends;