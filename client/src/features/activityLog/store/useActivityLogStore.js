import { create } from "zustand";

const useActivityLogStore = create((set) => ({
  globalActivities: [],
  contestActivities: [],
  friendActivities: [],
  currentContestId: null,
  userActivities: [],

  isLoading: false,
  error: null,

  setGlobalActivities: (data) => set({ globalActivities: data }),
  setContestActivities: (data, contestId) =>
    set({ contestActivities: data, currentContestId: contestId }),
  setFriendActivities: (data) => set({ friendActivities: data }),
  setUserActivities: (data) => set({ userActivities: data }),

  prependGlobalActivity: (activity) =>
    set((state) => ({ globalActivities: [activity, ...state.globalActivities] })),
  prependContestActivity: (activity) =>
    set((state) =>
      String(activity.contestId) === String(state.currentContestId)
        ? { contestActivities: [activity, ...state.contestActivities] }
        : state
    ),
  prependFriendActivity: (activity) =>
    set((state) => ({ friendActivities: [activity, ...state.friendActivities] })),

  clearContestActivities: () => set({ contestActivities: [], currentContestId: null }),

  setIsLoading: (bool) => set({ isLoading: bool }),
  setError: (error) => set({ error: error }),
}));

export default useActivityLogStore;