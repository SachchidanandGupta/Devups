import axiosInstance from "../../../api/axiosInstance";

export async function getUserProfile(userId) {
  const response = await axiosInstance.get(`/user/${userId}`);
  return response.data;
}

export async function getUserLeetStats(userId) {
  const response = await axiosInstance.get(`/user/${userId}/leet-stats`);
  return response.data;
}

export async function getUserLeetCalander(userId) {
  const response = await axiosInstance.get(`/user/${userId}/leet-calander`);
  return response.data;
}

export async function getUserHeatMap(userId) {
  const response = await axiosInstance.get(`/user/${userId}/heatmap`);
  return response.data;
}

export async function getUserFriends(userId) {
  const response = await axiosInstance.get(`/friends/${userId}/friends`);
  return response.data;
}

export async function getUserActivity(userId) {
  const response = await axiosInstance.get(`/activity/${userId}`);
  return response.data;
}

export async function getUserContestHistory(userId) {
  const response = await axiosInstance.get(`/contest/${userId}/history`);
  return response.data;
}

export async function getFriendStatus(userId) {
  const response = await axiosInstance.get(`/friends/status/${userId}`);
  return response.data;
}
