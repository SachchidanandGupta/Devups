import { getRecentActivity } from "../api/activityLog.api";
import useActivityLogStore from "../store/useActivityLogStore";

const useActivityLog = () => {
  const activities = useActivityLogStore((state)=>state.activities);
  const isLoading = useActivityLogStore((state)=>state.isLoading);
  const error = useActivityLogStore((state)=>state.error);
  const prependActivity = useActivityLogStore((state)=>state.prependActivity);
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
    fetchActivity,activities,isLoading,error,prependActivity
  }
};
export default useActivityLog;
