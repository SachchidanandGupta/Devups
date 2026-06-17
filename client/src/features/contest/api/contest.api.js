import axiosInstance from "../../../api/axiosInstance";


export async function getContests(){
    const response = await axiosInstance.get("/contest");
    return response.data;
}

export async function createContest( contestName,participantIds, startTime, endTime){
    const response = await axiosInstance.post("/contest/create",{
      contestName,  participantIds, startTime, endTime
    });
    return response.data;
}

export async function getFriendContests(type){
    const url = type ? `/contest/friends?type=${type}` : "/contest/friends";
    const response = await axiosInstance.get(url);
    
    return response.data
}

export async function completeFriendContest(contestId){
    const response = await axiosInstance.put(`/contest/complete/${contestId}`);
    return response.data
}

export async function acceptContest(contestId){
    const response = await axiosInstance.put(`/contest/invite/accept/${contestId}`);
    return response.data;
}

export async function rejectContest(contestId){
    const response = await axiosInstance.put(`/contest/invite/reject/${contestId}`);
    return response.data;
}

