import { create } from "zustand";

const useXpStore = create((set) => ({
  xpHistory: [],
  isLoading: false,
  error: null,

  setXpHistory: (data) => set({ xpHistory: data }),
  prependXpEvent: (event) =>
    set((state) => ({ xpHistory: [event, ...state.xpHistory] })),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setError: (error) => set({ error: error }),
}));

export default useXpStore;