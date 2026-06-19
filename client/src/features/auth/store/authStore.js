import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  isInitialized: false,

  setUser: (userData) => set({ user: userData }),
  setAuthenticated: (bool) => set({ isAuthenticated: bool }),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setError: (message) => set({ error: message }),
  setInitialized: (bool) => set({ isInitialized: bool }),
  logout: () => set({ user: null, error: null, isAuthenticated: false }),
}));

export default useAuthStore;
