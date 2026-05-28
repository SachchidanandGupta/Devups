import axiosInstance from "../../../api/axiosInstance";

export const getGlobalLeaderboard = async () =>{
    const response = await axiosInstance.get("/leaderboard/global");
    return response.data;
}

export const getFriendLeaderboard = async () =>{
    const response = await axiosInstance.get("/leaderboard/friends");
    return response.data;
}