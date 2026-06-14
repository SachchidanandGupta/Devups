import useContestStore from "../stores/useContestStore";
import {
  getContests,
  completeFriendContest,
  createContest,
  getFriendContests,
} from "../api/contest.api";

const useContest = () => {
  const contest = async () => {
    useContestStore.getState().setIsLoading(true);
    try {
      const data = await getContests();
      useContestStore.getState().setPlatformContests(data.contestData);
      
    } catch (error) {
      useContestStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useContestStore.getState().setIsLoading(false);
    }
  };

  const friendContest = async() =>{
    useContestStore.getState().setIsLoading(true);
    try{
        const data = await getFriendContests();
        useContestStore.getState().setFriendContests(data.friendContest);
    }catch(error){
        useContestStore.getState().setError(error.response?.data?.message || error.message);
    }finally{
        useContestStore.getState().setIsLoading(false);
    }
  }

  const initiateContest = async(participantIds, startTime, endTime) =>{
    useContestStore.getState().setIsLoading(true);
    try{
        await createContest(participantIds, startTime, endTime);
        await friendContest();
    }catch(error){
        useContestStore.getState().setError(error.response?.data?.message || error.message);
    }finally{
        useContestStore.getState().setIsLoading(false);
    }


  }

  const concludeContest = async(contestId) =>{
    useContestStore.getState().setIsLoading(true);
    try{

       await completeFriendContest(contestId);
        
        await friendContest();
    }catch(error){
        useContestStore.getState().setError(error.response?.data?.message || error.message);
    }finally{
        useContestStore.getState().setIsLoading(false);
    }
    
  }

  return {
    contest,
    friendContest,
    initiateContest,
    concludeContest
  }
};

export default useContest;
