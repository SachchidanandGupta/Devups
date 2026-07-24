import {
  getDailyQuestions,
  getSearchProblems,
  getExploreProblems,
  getTopicTags,
} from "../api/leetcode.api";
import leetcodeStore from "../store/leetcodeStore";

const useLeetcode = () => {
  const daily = leetcodeStore((state) => state.daily);
  const isLoading = leetcodeStore((state) => state.isLoading);
  const error = leetcodeStore((state) => state.error);
  const problemsSearch = leetcodeStore((state) => state.problemsSearch);
  const searchLoading = leetcodeStore((state) => state.searchLoading);
  const allTags = leetcodeStore((state) => state.allTags);
  const tagsLoading = leetcodeStore((state) => state.tagsLoading);
  const exploreResults = leetcodeStore((state) => state.exploreResults);
  const exploreLoading = leetcodeStore((state) => state.exploreLoading);
  const selectedTags = leetcodeStore((state) => state.selectedTags);
  const toggleTag = leetcodeStore((state) => state.toggleTag);
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

  const fetchTags = async () => {
    leetcodeStore.getState().setTagsLoading(true);
    try {
      const data = await getTopicTags();
      leetcodeStore.getState().setAllTags(data.topicTags);
    } catch (err) {
      leetcodeStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      leetcodeStore.getState().setTagsLoading(false);
    }
  };

  const searchExploreProblems = async (tags, q) => {
    leetcodeStore.getState().setExploreLoading(true);
    try {
      const data = await getExploreProblems(tags, q);
      leetcodeStore.getState().setExploreResults(data.tagProblems);
    } catch (err) {
      leetcodeStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      leetcodeStore.getState().setExploreLoading(false);
    }
  };

  return {
    fetchDaily,
    searchQuestions,
    fetchTags,
    searchExploreProblems,
    searchLoading,
    problemsSearch,
    daily,
    isLoading,
    error,
    allTags,
    tagsLoading,
    exploreResults,
    exploreLoading,
    selectedTags,
    toggleTag,
  };
};

export default useLeetcode;
