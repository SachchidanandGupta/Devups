import axiosInstance from "../../../api/axiosInstance";

export const sendRequest = async(receiverId) =>{
    const response = await axiosInstance.post(`/friends/send/${receiverId}`);
    return response.data;
}

export const pendingRequests = async() =>{
    const response = await axiosInstance.get(`/friends/requests`);
    return response.data;
}

export const respondRequest =  async(requestId,requestResponse) =>{
   const response = await axiosInstance.put(`/friends/respond/${requestId}`,{
       requestResponse
   });
   return response.data;
}

export const unFriend = async(friendId) =>{
    const response = await axiosInstance.delete(`/friends/unfriend/${friendId}`);
    return response.data
}

export const blockUser = async(blockUserId) =>{
    const response = await axiosInstance.put(`/friends/block/${blockUserId}`);
    return response.data
}

export const unblockUser = async(unBlockUserId) => {
    const response = await axiosInstance.put(`/friends/unblock/${unBlockUserId}`);
    return response.data
}

export const getFriends = async() =>{
    const response = await axiosInstance.get("/friends/");
    return response.data;
}