import axiosInstance from "../../../api/axiosInstance";

export const getDailyQuestions = async function () {
  const response = await axiosInstance.get("/leetcode/daily");
  return response.data;
};

export const getSearchProblems = async function(q){
    const response = await axiosInstance.get(`/leetcode/search?q=${q}`);
    return response.data;
}