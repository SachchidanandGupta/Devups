import useUserStore from "../stores/useUserStore";
import {
  getProfile,
  deleteProfile,
  getHeatmap,
  updateProfile,
  searchUsers,
  validateHandle,
} from "../api/user.api";
import useAuth from "../../auth/hooks/useAuth";
const useUser = () => {
  const user = useUserStore((state) => state.user);
  const heatMap = useUserStore((state) => state.heatMap);
  const isLoading = useUserStore((state) => state.isLoading);
  const githubLoading = useUserStore((state) => state.githubLoading);
  const error = useUserStore((state) => state.error);
  const searchResult = useUserStore((state) => state.searchResult);
  const setSearchResult = useUserStore((state) => state.setSearchResult);
  const { fetchMe } = useAuth();
  const fetchProfile = async (userId) => {
    useUserStore.getState().setIsLoading(true);
    try {
      const data = await getProfile(userId);
      useUserStore.getState().setUser(data.user);
    } catch (err) {
      useUserStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useUserStore.getState().setIsLoading(false);
    }
  };

  const updateUserProfile = async (userId, updateProfileData) => {
    const {
      username = undefined,
      avatar = undefined,
      leetcodeUsername = undefined,
      githubUsername = undefined,
      codeforcesHandle = undefined,
    } = updateProfileData || {};
    useUserStore.getState().setIsLoading(true);
    try {
      const data = await updateProfile({
        username,
        avatar,
        leetcodeUsername,
        githubUsername,
        codeforcesHandle,
      });
      await fetchProfile(userId);
      useUserStore.getState().setUser(data.user);
      await fetchMe();
      return data;
    } catch (err) {
      useUserStore
        .getState()
        .setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      useUserStore.getState().setIsLoading(false);
    }
  };

  const checkHandle = async (field, value) => {
    try {
      return await validateHandle(field, value);
    } catch (err) {
      return {
        valid: false,
        username: null,
        reason: "Could not verify — try again",
      };
    }
  };

  const userHeatMap = async (userId) => {
    useUserStore.getState().setGithubLoading(true);
    try {
      const data = await getHeatmap(userId);
      useUserStore.getState().setHeatMap(data.heatmap);
    } catch (err) {
      useUserStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useUserStore.getState().setGithubLoading(false);
    }
  };

  const deleteUser = async () => {
    useUserStore.getState().setIsLoading(true);
    try {
      const data = await deleteProfile();
      useUserStore.getState().deleteUser();
    } catch (err) {
      useUserStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useUserStore.getState().setIsLoading(false);
    }
  };

  const search = async (q) => {
    useUserStore.getState().setIsLoading(true);
    try {
      const data = await searchUsers(q);

      useUserStore.getState().setSearchResult(data.users);
    } catch (err) {
      useUserStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useUserStore.getState().setIsLoading(false);
    }
  };

  return {
    fetchProfile,
    updateUserProfile,
    userHeatMap,
    deleteUser,
    search,
    checkHandle,
    user,
    searchResult,
    error,
    isLoading,
    heatMap,
    githubLoading,
    setSearchResult,
  };
};

export default useUser;
