import axiosInstance from "../../../api/axiosInstance";

export const getDailyQuestions = async function () {
  const response = await axiosInstance.get("/leetcode/daily");
  return response.data;
};

export const getSearchProblems = async function (q) {
  const response = await axiosInstance.get(`/leetcode/search?q=${q}`);
  return response.data;
};

export const getExploreProblems = async function (tags, q) {
  const params = new URLSearchParams();
  if (tags && tags.length > 0) params.append("tags", tags.join(","));
  if (q && q.trim() !== "") params.append("q", q);
  const response = await axiosInstance.get(
    `/leetcode/explore?${params.toString()}`,
  );
  return response.data;
};

export const getTopicTags = async function () {
  const response = await axiosInstance.get("/leetcode/tags");
  return response.data;
};
