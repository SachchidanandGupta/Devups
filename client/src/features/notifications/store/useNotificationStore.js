import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notifications: [],
  isLoading: false,
  error: null,

  setNotifications: (data) => set({ notifications: data }),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setError: (error) => set({ error: error }),
  prependNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => String(n._id) != id),
    })),
  clearAll: () => set({ notifications: [], error: null }),
}));

export default useNotificationStore;