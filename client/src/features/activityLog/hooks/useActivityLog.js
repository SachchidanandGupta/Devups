import { getRecentActivity, getUserActivity } from "../api/activityLog.api";
import useActivityLogStore from "../store/useActivityLogStore";

const useActivityLog = () => {
  const activities = useActivityLogStore((state) => state.activities);
  const userActivities = useActivityLogStore((state) => state.userActivities);
  const isLoading = useActivityLogStore((state) => state.isLoading);
  const error = useActivityLogStore((state) => state.error);
  const prependActivity = useActivityLogStore((state) => state.prependActivity);
  const fetchActivity = async (scope = "") => {
    useActivityLogStore.getState().setIsLoading(true);
    try {
      const data = await getRecentActivity(scope);
      useActivityLogStore.getState().setActivities(data.activities);
    } catch (error) {
      useActivityLogStore
        .getState()
        .setError(error.response?.data?.message || error.message);
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
      useActivityLogStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useActivityLogStore.getState().setIsLoading(false);
    }
  };

  return {
    fetchActivity,
    fetchUserActivity,
    userActivities,
    activities,
    isLoading,
    error,
    prependActivity,
  };
};
export default useActivityLog;
