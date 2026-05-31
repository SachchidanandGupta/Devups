import { create } from "zustand";

const useContestStore = create((set) => ({
  platformContests: [],
  friendContests: [],
  isLoading: false,
  error: null,

  setPlatformContests: (platContest) => set({ platformContests: platContest }),
  setFriendContests: (friendContest) => set({ friendContests: friendContest }),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setError: (error) => set({ error: error }),
}));

export default useContestStore;
