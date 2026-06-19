import { create } from "zustand";

const useActivityLogStore = create((set) => ({
  activities: [],
  isLoading: false,
  error: null,

  setActivities: (data) => set({ activities: data }),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setError: (error) => set({ error: error }),
  prependActivity: (activity) =>
    set((state) => ({ activities: [activity, ...state.activities] })),
}));

export default useActivityLogStore;
