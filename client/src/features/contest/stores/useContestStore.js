import { create } from "zustand";

const useContestStore = create((set) => ({
  platformContests: [],
  incomingContests: [],
  activeContests: [],
  completedContests: [],
  hostedContests:[],
  isLoading: false,
  error: null,

  setPlatformContests: (data) => set({ platformContests: data }),
  setIncomingContests: (data) => set({ incomingContests: data }),
  setActiveContests: (data) => set({ activeContests: data }),
  setCompletedContests: (data) => set({ completedContests: data }),
  setHostedContests:(data)=>set({hostedContests:data}),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setError: (error) => set({ error: error }),
}));

export default useContestStore;
