import axiosInstance from "../../../api/axiosInstance";


export const getProfile = async(username) =>{
     const response = await axiosInstance.get(`/user/${username}`);
     return response.data;
}

export const updateProfile = async(data) =>{
    const response = await axiosInstance.put("/user/update",data);
    return response.data;
}


export const deleteProfile = async() =>{
    const response = await axiosInstance.delete("/user/delete");
    return response.data;
}