import axiosInstance from "../../../api/axiosInstance";

export const sendRequest = async(receiverId) =>{
    const response = await axiosInstance.post(`/friend/send/${receiverId}`);
    return response.data;
}

export const respondRequest =  async(requestId,requestResponse) =>{
   const response = await axiosInstance.put(`/friend/respond/${requestId}`,{
       requestResponse
   });
   return response.data;
}

export const unFriend = async(friendId) =>{
    const response = await axiosInstance.delete(`/friend/unfriend/${friendId}`);
    return response.data
}

export const blockUser = async(blockUserId) =>{
    const response = await axiosInstance.put(`/friend/block/${blockUserId}`);
    return response.data
}

export const getFriends = async() =>{
    const response = await axiosInstance.get("/friend/");
    return response.data;
}