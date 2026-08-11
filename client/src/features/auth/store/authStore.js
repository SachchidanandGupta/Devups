import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  isInitialized: false,
  registrationEmail: null,

  setUser: (userData) => set({ user: userData }),
  setAuthenticated: (bool) => set({ isAuthenticated: bool }),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setError: (message) => set({ error: message }),
  setInitialized: (bool) => set({ isInitialized: bool }),
  setRegistrationEmail: (email) => set({ registrationEmail: email }),
  logout: () => set({ user: null, error: null, isAuthenticated: false }),
}));

export default useAuthStore;