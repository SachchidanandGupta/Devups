import useContestStore from "../stores/useContestStore";
import {
  getContests,
  completeFriendContest,
  createContest,
  getFriendContests,
  acceptContest,
  rejectContest,
  getUserContestHistory,
  deleteContest
} from "../api/contest.api";

const useContest = () => {
  const platformContests = useContestStore((state) => state.platformContests);
  const incomingContests = useContestStore((state) => state.incomingContests);
  const activeContests = useContestStore((state) => state.activeContests);
  const completedContests = useContestStore((state) => state.completedContests);
  const hostedContests = useContestStore((state)=>state.hostedContests);
  const isLoading = useContestStore((state) => state.isLoading);
  const error = useContestStore((state) => state.error);
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

  const friendContest = async () => {
    useContestStore.getState().setIsLoading(true);
    try {
      const [incoming, active, completed,hosted] = await Promise.all([
        getFriendContests("incoming"),
        getFriendContests("active"),
        getFriendContests("completed"),
        getFriendContests("hosted"),
      ]);
      useContestStore
        .getState()
        .setIncomingContests(incoming.friendContest || []);
      useContestStore.getState().setActiveContests(active.friendContest || []);
      useContestStore
        .getState()
        .setCompletedContests(completed.friendContest || []);
      useContestStore.getState().setHostedContests(hosted.friendContest || []);
    } catch (error) {
      useContestStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useContestStore.getState().setIsLoading(false);
    }
  };

  const initiateContest = async (contestData) => {
    useContestStore.getState().setIsLoading(true);
    try {
      await createContest(contestData);
      await friendContest();
    } catch (error) {
      useContestStore
        .getState()
        .setError(error.response?.data?.message || error.message);
      throw error;
    } finally {
      useContestStore.getState().setIsLoading(false);
    }
  };

  const abortContest = async(contestId)=>{
    useContestStore.getState().setIsLoading(true);
    try{
      await deleteContest(contestId);
      await friendContest();
    }catch (error) {
      useContestStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useContestStore.getState().setIsLoading(false);
    }

  }

  const concludeContest = async (contestId) => {
    useContestStore.getState().setIsLoading(true);
    try {
      await completeFriendContest(contestId);

      await friendContest();
    } catch (error) {
      useContestStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useContestStore.getState().setIsLoading(false);
    }
  };

  const acceptInvite = async (contestId) => {
    useContestStore.getState().setIsLoading(true);
    try {
      await acceptContest(contestId);
      await friendContest();
    } catch (error) {
      useContestStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useContestStore.getState().setIsLoading(false);
    }
  };

  const rejectInvite = async (contestId) => {
    useContestStore.getState().setIsLoading(true);
    try {
      await rejectContest(contestId);
      await friendContest();
    } catch (error) {
      useContestStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useContestStore.getState().setIsLoading(false);
    }
  };

  const userContestHistory = async (userId) => {
    useContestStore.getState().setIsLoading(true);
    try {
      const data = await getUserContestHistory(userId);
      useContestStore.getState().setCompletedContests(data.contestHistory);
    } catch (error) {
      useContestStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useContestStore.getState().setIsLoading(false);
    }
  };

const markSolved = async (contestId, titleSlug, userId) => {
  try {
    const data = await markProblemSolved(contestId, titleSlug);
    useContestStore
      .getState()
      .markProblemSolvedLocally(contestId, userId, titleSlug);
    return data.entry;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    useContestStore.getState().setError(message);
    throw error;
  }
};

  return {
    contest,
    friendContest,
    initiateContest,
    concludeContest,
    acceptInvite,
    rejectInvite,
    userContestHistory,
    abortContest,
    markSolved,
    platformContests,
    activeContests,
    error,
    incomingContests,
    completedContests,
    hostedContests,
    isLoading,
  };
};

export default useContest;
