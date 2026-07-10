import { create } from "zustand";

const leetcodeStore = create((set) => ({
  daily: null,
  isLoading: false,
  error: null,
  problemsSearch: [],
  searchLoading: false,

  setSearchLoading: (bool) => set({ searchLoading: bool }),
  setDaily: (data) => set({ daily: data }),
  setProblemSearch: (data) => set({ problemsSearch: data }),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setError: (error) => set({ error: error }),
}));

export default leetcodeStore;
