import { getRecentActivity } from "../api/activityLog.api";
import useActivityLogStore from "../store/useActivityLogStore";

const useActivityLog = () => {
  const fetchActivity = async () => {
    useActivityLogStore.getState().setIsLoading(true);
    try {
      const data = await getRecentActivity();
      useActivityLogStore.getState().setActivities(data.activities);
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
  };
};
export default useActivityLog;