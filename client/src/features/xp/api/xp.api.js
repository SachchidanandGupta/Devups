import axiosInstance from "../../../api/axiosInstance";

export async function getXpHistory(userId) {
  const response = await axiosInstance.get(`/xp/${userId}/history`);
  return response.data;
}