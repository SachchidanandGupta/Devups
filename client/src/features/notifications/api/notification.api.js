import axiosInstance from "../../../api/axiosInstance";

export const getNotifications = async () => {
  const response = await axiosInstance.get("/notifications");
  return response.data;
};

export const readNotification = async () => {
  const response = await axiosInstance.put("/notifications/read");
  return response.data;
};

export const clearAllNotifications = async () => {
  const response = await axiosInstance.put("/notifications/clear-all");
  return response.data;
};
