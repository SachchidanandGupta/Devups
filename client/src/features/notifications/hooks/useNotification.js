import {
  clearAllNotifications,
  clearNotification,
  getNotifications,
} from "../api/notification.api";

import useNotificationStore from "../store/useNotificationStore";

const useNotification = () => {
  const fetchNotifications = async () => {
    useNotificationStore.getState().setIsLoading(true);
    try {
      const data = await getNotifications();
      useNotificationStore.getState().setNotifications(data.notification);
      
    } catch (error) {
      useNotificationStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useNotificationStore.getState().setIsLoading(false);
    }
  };

  const clear = async (id) => {
    useNotificationStore.getState().setIsLoading(true);
    try {
      const data = await clearNotification(id);
      useNotificationStore.getState().removeNotification(id);
    } catch (error) {
      useNotificationStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useNotificationStore.getState().setIsLoading(false);
    }
  };

  const clearFriendTerminal = async () => {
    useNotificationStore.getState().setIsLoading(true);
    try {
      const data = await clearAllNotifications();
      useNotificationStore.getState().clearAll();
    } catch (error) {
      useNotificationStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useNotificationStore.getState().setIsLoading(false);
    }
  };
  return {
    fetchNotifications,
    clear,
    clearFriendTerminal,
  };
};
