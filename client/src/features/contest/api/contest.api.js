import axiosInstance from "../../../api/axiosInstance";


export async function getContests(){
    const response = await axiosInstance.get("/contest");
    return response.data;
}

export async function createContest(participantIds, startTime, endTime){
    const response = await axiosInstance.post("/contest/create",{
        participantIds, startTime, endTime
    });
    return response.data;
}

export async function getFriendContests(){
    const response = await axiosInstance.get("/contest/friends");
    return response.data
}

export async function completeFriendContest(contestId){
    const response = await axiosInstance.put(`/contest/complete/${contestId}`);
    return response.data
}

