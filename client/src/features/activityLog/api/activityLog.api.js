import axiosInstance from "../../../api/axiosInstance";

export const getRecentActivity = async (scope) => {
  const response = await axiosInstance.get(`/activity?scope=${scope}`);
  return response.data;
};


export const getUserActivity = async(userId) =>{
  const response = await axiosInstance.get(`/activity/${userId}`);
  return response.data;
}