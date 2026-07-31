import { create } from "zustand";

const useFriendStore = create((set) => ({
  friends: [],
  pendingFriendRequests: [],
  isLoading: false,
  error: null,

  setFriends: (friend) => set({ friends: friend }),
  setPendingFriendRequests: (data) => set({ pendingFriendRequests: data }),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setError: (error) => set({ error: error }),
  setFriendOnlineStatus: (userId, isOnline) =>
    set((state) => ({
      friends: state.friends.map((friend) =>
        friend._id.toString() === userId
          ? { ...friend, onlineStatus: isOnline }
          : friend,
      ),
    })),
}));

export default useFriendStore;
