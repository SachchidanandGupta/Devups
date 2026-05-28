import {
  loginUser,
  registerUser,
  getMeUser,
  logOutUser,
} from "../api/auth.api";
import useAuthStore from "../store/authStore";

  const useAuth = () => {
  const login = async (identifier, password) => {
    useAuthStore.getState().setIsLoading(true);
    try {
      const data = await loginUser(identifier, password);
      useAuthStore.getState().setUser(data.user);
      useAuthStore.getState().setAuthenticated(true);
    } catch (err) {
      useAuthStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useAuthStore.getState().setIsLoading(false);
    }
  };

  const register = async(username,email,password) =>{
    useAuthStore.getState().setIsLoading(true);
    try{
        const data = await registerUser(username,email,password);
        useAuthStore.getState().setUser(data.user);
        useAuthStore.getState().setAuthenticated(true);
        
    }catch(error){
        useAuthStore.getState().setError(error.response?.data?.message || error.message);
    }finally{
        useAuthStore.getState().setIsLoading(false);
    }
  };
  const fetchMe = async ()=>{
    useAuthStore.getState().setIsLoading(true);
    try{
        const data = await getMeUser();
        useAuthStore.getState().setUser(data.user);
        useAuthStore.getState().setAuthenticated(true);
        
      }catch(error){
        useAuthStore.getState().setError(error.response?.data?.message|| error.message)
      }finally{
        useAuthStore.getState().setIsLoading(false)
        useAuthStore.getState().setInitialized(true);
    }
  }

  const logout = async()=>{
    useAuthStore.getState().setIsLoading(true);
    try{
        const data = await logOutUser();
        useAuthStore.getState().logout();

    }catch(error){
        useAuthStore.getState().setError(error.response?.data?.message|| error.message);
    }finally{
        useAuthStore.getState().setIsLoading(false);
    }
  }

  return {
    login,
    register,
    logout,
    fetchMe,
  };
};
export default useAuth;

