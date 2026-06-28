import { create } from "zustand";

const leetcodeStore = create((set) => ({
  daily: null,
  isLoading: false,
  error: null,

  setDaily: (data) => set({ daily: data }),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setError: (error) => set({ error: error }),
}));

export default leetcodeStore;
