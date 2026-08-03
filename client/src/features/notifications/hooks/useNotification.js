import {
  clearAllNotifications,
  readNotification,
  getNotifications,
} from "../api/notification.api";

import useNotificationStore from "../store/useNotificationStore";

const useNotification = () => {
  const notifications = useNotificationStore((state)=>state.notifications);
  const isLoading = useNotificationStore((state)=>state.isLoading);
  const error = useNotificationStore((state)=>state.error);
  const prependNotification = useNotificationStore((state)=>state.prependNotification);
  const clearAll = useNotificationStore((state)=>state.clearAll);
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

  const read = async () => {
    useNotificationStore.getState().setIsLoading(true);
    try {
       await readNotification();
       await fetchNotifications();
    } catch (error) {
      useNotificationStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useNotificationStore.getState().setIsLoading(false);
    }
  };

  const clearNotifications = async () => {
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
    read,
    clearNotifications,
    notifications,
    prependNotification,
    isLoading,
    error,
    clearAll
  };
};

export default useNotification;