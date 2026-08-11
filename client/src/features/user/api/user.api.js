import axiosInstance from "../../../api/axiosInstance";

export async function getProfile(userId) {
  const response = await axiosInstance.get(`/user/${userId}`);
  return response.data;
}

export async function updateProfile(updatedData) {
  const {
    username = undefined,
    avatar = undefined,
    leetcodeUsername = undefined,
    githubUsername = undefined,
    codeforcesHandle = undefined,
  } = updatedData || {};
  const response = await axiosInstance.put("/user/update", {
    username,
    avatar,
    leetcodeUsername,
    githubUsername,
    codeforcesHandle,
  });
  return response.data;
}

export async function getHeatmap(userId) {
  const response = await axiosInstance.get(`/user/${userId}/heatmap`);
  return response.data;
}

export async function deleteProfile() {
  const response = await axiosInstance.delete("/user/delete");
  return response.data;
}

export async function searchUsers(q) {
  const response = await axiosInstance.get(`/user/search?q=${q}`);
  return response.data;
}

export async function validateHandle(field, value) {
  const response = await axiosInstance.post("/user/validate-handle", {
    field,
    value,
  });
  return response.data;
}
