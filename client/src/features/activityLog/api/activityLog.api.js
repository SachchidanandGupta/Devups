import axiosInstance from "../../../api/axiosInstance";

export const getRecentActivity = async () => {
  const response = await axiosInstance.get("/activity");
  return response.data;
};
