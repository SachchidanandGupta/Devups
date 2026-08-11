import useXpStore from "../store/useXpStore";
import { getXpHistory } from "../api/xp.api";

const useXp = () => {
  const xpHistory = useXpStore((state) => state.xpHistory);
  const isLoading = useXpStore((state) => state.isLoading);
  const error = useXpStore((state) => state.error);

  const fetchXpHistory = async (userId) => {
    useXpStore.getState().setIsLoading(true);
    try {
      const data = await getXpHistory(userId);
      useXpStore.getState().setXpHistory(data.xpEvents);
    } catch (error) {
      useXpStore.getState().setError(error.response?.data?.message || error.message);
    } finally {
      useXpStore.getState().setIsLoading(false);
    }
  };

  return { fetchXpHistory, xpHistory, isLoading, error };
};

export default useXp;