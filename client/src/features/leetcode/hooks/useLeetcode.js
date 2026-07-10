import { getDailyQuestions,getSearchProblems } from "../api/leetcode.api";
import leetcodeStore from "../store/leetcodeStore";

const useLeetcode = () => {
  const daily = leetcodeStore((state) => state.daily);
  const isLoading = leetcodeStore((state) => state.isLoading);
  const error = leetcodeStore((state) => state.error);
  const problemsSearch = leetcodeStore((state)=>state.problemsSearch);
  const searchLoading = leetcodeStore((state)=>state.searchLoading);
  const fetchDaily = async () => {
    leetcodeStore.getState().setIsLoading(true);
    try {
      const data = await getDailyQuestions();
      leetcodeStore.getState().setDaily(data.daily);
    } catch (err) {
      leetcodeStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      leetcodeStore.getState().setIsLoading(false);
    }
  };
  const searchQuestions = async (q) => {
    leetcodeStore.getState().setSearchLoading(true);
    try {
        const data = await getSearchProblems(q);
        leetcodeStore.getState().setProblemSearch(data.problems);
    } catch (err) {
      leetcodeStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      leetcodeStore.getState().setSearchLoading(false);
    }
  };
  return {
    fetchDaily,
    searchQuestions,
    searchLoading,
    problemsSearch,
    daily,
    isLoading,
    error,
  };
};

export default useLeetcode;
