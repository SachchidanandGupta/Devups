import axiosInstance from "../../../api/axiosInstance"

export async function getProfile(userId){
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;

}

export async function updateProfile(username=undefined,
    avatar=undefined,
    leetcodeUsername=undefined,
    githubUsername=undefined,
    codeforcesHandle=undefined,){
    const response = await axiosInstance.put("/user/update",{
        username,
    avatar,
    leetcodeUsername,
    githubUsername,
    codeforcesHandle
    });
    return response.data
}

export async function getHeatmap(userId){
    const response = await axiosInstance.get(`/user/${userId}/heatmap`);
    return response.data;

}

export async function deleteProfile(){
    const response = await axiosInstance.delete("/user/delete");
    return response.data;

}

export async function searchUsers(q){
    const response = await axiosInstance.get(`/user/search?q=${q}`);
    return response.data;
}