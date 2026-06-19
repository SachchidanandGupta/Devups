import axiosInstance from "../../../api/axiosInstance";

export const getNotifications = async () => {
  const response = await axiosInstance.get("/notifications");
  return response.data;
};

export const clearNotification = async (notificationId) => {
  const response = await axiosInstance.put(`/notifications/${notificationId}`);
  return response.data;
};

export const clearAllNotifications = async () => {
  const response = await axiosInstance.put("/notifications/clear-all");
  return response.data;
};
