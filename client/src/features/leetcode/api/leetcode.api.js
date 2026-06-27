import axiosInstance from "../../../api/axiosInstance";

 export const getDailyQuestions = async function(){
     const response = await axiosInstance.get("/daily");
    return response.data;
}