import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  heatMap: null,
  searchResult: [],
  isLoading: false,
  error: null,

  setUser: (username) => set({ user: username }),
  setHeatMap: (data) => set({ heatMap: data }),
  setSearchResult: (data) => set({ searchResult:data }),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setError: (error) => set({ error: error }),
  deleteUser: () => set({ user: null, heatMap: null, error: null }),
}));

export default useUserStore;
