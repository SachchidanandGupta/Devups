import useUserStore from "../stores/useUserStore";
import {
  getProfile,
  deleteProfile,
  getHeatmap,
  updateProfile,
  searchUsers
} from "../api/user.api";

const useUser = () => {
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

  const updateUserProfile = async (
    username = null,
    avatar = null,
    leetcodeUsername = null,
    githubUsername = null,
    codeforcesHandle = null,
  ) => {
    useUserStore.getState().setIsLoading(true);
    try {
      const data = await updateProfile(
        username,
        avatar,
        leetcodeUsername,
        githubUsername,
        codeforcesHandle,
      );
      useUserStore.getState().setUser(data.user)
    } catch (err) {
      useUserStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useUserStore.getState().setIsLoading(false);
    }
  };

  const userHeatMap = async(userId) =>{
    useUserStore.getState().setIsLoading(true);
    try {
      const data = await getHeatmap(userId);
      useUserStore.getState().setHeatMap(data.heatmap)
    } catch (err) {
      useUserStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useUserStore.getState().setIsLoading(false);
    }
      
  }

  const deleteUser = async() =>{
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
  }

  const search =  async(q) =>{
    useUserStore.getState().setIsLoading(true);
    try{
       const data =  await searchUsers(q);

       useUserStore.getState().setSearchResult(data.users);
    }catch(err){
      useUserStore.getState().setError(err.response?.data?.message || err.message);
    }finally{
      useUserStore.getState().setIsLoading(false);
    }
  }

  return {
    fetchProfile,
    updateUserProfile,
    userHeatMap,
    deleteUser,
    search
  }
};

export default useUser;
