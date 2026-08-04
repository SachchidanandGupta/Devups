import { getRecentActivity, getUserActivity, getContestActivity } from "../api/activityLog.api";
import useActivityLogStore from "../store/useActivityLogStore";

const useActivityLog = () => {
  const globalActivities = useActivityLogStore((state) => state.globalActivities);
  const contestActivities = useActivityLogStore((state) => state.contestActivities);
  const friendActivities = useActivityLogStore((state) => state.friendActivities);
  const userActivities = useActivityLogStore((state) => state.userActivities);
  const isLoading = useActivityLogStore((state) => state.isLoading);
  const error = useActivityLogStore((state) => state.error);

  const fetchGlobalActivity = async () => {
    useActivityLogStore.getState().setIsLoading(true);
    try {
      const data = await getRecentActivity("global");
      useActivityLogStore.getState().setGlobalActivities(data.activities);
    } catch (error) {
      useActivityLogStore.getState().setError(error.response?.data?.message || error.message);
    } finally {
      useActivityLogStore.getState().setIsLoading(false);
    }
  };

  const fetchFriendActivity = async () => {
    useActivityLogStore.getState().setIsLoading(true);
    try {
      const data = await getRecentActivity("friends");
      useActivityLogStore.getState().setFriendActivities(data.activities);
    } catch (error) {
      useActivityLogStore.getState().setError(error.response?.data?.message || error.message);
    } finally {
      useActivityLogStore.getState().setIsLoading(false);
    }
  };

  const fetchContestActivity = async (contestId) => {
    useActivityLogStore.getState().setIsLoading(true);
    try {
      const data = await getContestActivity(contestId);
      useActivityLogStore.getState().setContestActivities(data.activities, contestId);
    } catch (error) {
      useActivityLogStore.getState().setError(error.response?.data?.message || error.message);
    } finally {
      useActivityLogStore.getState().setIsLoading(false);
    }
  };

  const fetchUserActivity = async (userId) => {
    useActivityLogStore.getState().setIsLoading(true);
    try {
      const data = await getUserActivity(userId);
      useActivityLogStore.getState().setUserActivities(data.activities);
    } catch (error) {
      useActivityLogStore.getState().setError(error.response?.data?.message || error.message);
    } finally {
      useActivityLogStore.getState().setIsLoading(false);
    }
  };

  return {
    globalActivities,
    contestActivities,
    friendActivities,
    userActivities,
    isLoading,
    error,
    fetchGlobalActivity,
    fetchFriendActivity,
    fetchContestActivity,
    fetchUserActivity,
  };
};
export default useActivityLog;