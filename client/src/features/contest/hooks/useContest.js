import useContestStore from "../stores/useContestStore";
import {
  getContests,
  completeFriendContest,
  createContest,
  getFriendContests,
  acceptContest,
  rejectContest,
  getUserContestHistory,
} from "../api/contest.api";

const useContest = () => {
  const platformContests = useContestStore((state) => state.platformContests);
  const incomingContests = useContestStore((state) => state.incomingContests);
  const activeContests = useContestStore((state) => state.activeContests);
  const completedContests = useContestStore((state) => state.completedContests);
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
      const [incoming, active, completed] = await Promise.all([
        getFriendContests("incoming"),
        getFriendContests("active"),
        getFriendContests("completed"),
      ]);
      useContestStore
        .getState()
        .setIncomingContests(incoming.friendContest || []);
      useContestStore.getState().setActiveContests(active.friendContest || []);
      useContestStore
        .getState()
        .setCompletedContests(completed.friendContest || []);
    } catch (error) {
      useContestStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useContestStore.getState().setIsLoading(false);
    }
  };

  const initiateContest = async (participantIds, startTime, endTime) => {
    useContestStore.getState().setIsLoading(true);
    try {
      await createContest(participantIds, startTime, endTime);
      await friendContest();
    } catch (error) {
      useContestStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useContestStore.getState().setIsLoading(false);
    }
  };

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

  return {
    contest,
    friendContest,
    initiateContest,
    concludeContest,
    acceptInvite,
    rejectInvite,
    userContestHistory,
    platformContests,
    activeContests,
    error,
    incomingContests,
    completedContests,
    isLoading,
  };
};

export default useContest;
