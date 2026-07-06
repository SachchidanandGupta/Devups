import {
  loginUser,
  registerUser,
  getMeUser,
  logOutUser,
} from "../api/auth.api";
import useAuthStore from "../store/authStore";

const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const error = useAuthStore((state) => state.error);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const setError = useAuthStore((state) => state.setError);
  const setUser = useAuthStore((state) => state.setUser);
  const fetchMe = async () => {
    useAuthStore.getState().setIsLoading(true);
    try {
      const data = await getMeUser();
      useAuthStore.getState().setUser(data.user);
      useAuthStore.getState().setAuthenticated(true);
    } catch (error) {
      useAuthStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useAuthStore.getState().setIsLoading(false);
      useAuthStore.getState().setInitialized(true);
    }
  };

  const login = async (identifier, password) => {
    useAuthStore.getState().setIsLoading(true);
    try {
      await loginUser(identifier, password);
      await fetchMe(); // fetch full user data immediately after login
    } catch (err) {
      useAuthStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useAuthStore.getState().setIsLoading(false);
    }
  };

  const register = async (username, email, password) => {
    useAuthStore.getState().setIsLoading(true);
    try {
      await registerUser(username, email, password);
      await fetchMe();
    } catch (error) {
      useAuthStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useAuthStore.getState().setIsLoading(false);
    }
  };

  const logout = async () => {
    useAuthStore.getState().setIsLoading(true);
    try {
      const data = await logOutUser();
      useAuthStore.getState().logout();
    } catch (error) {
      useAuthStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useAuthStore.getState().setIsLoading(false);
    }
  };

  return {
    login,
    register,
    logout,
    fetchMe,
    user,
    isInitialized,
    isAuthenticated,
    isLoading,
    error,
    setError,
    setUser,
  };
};
export default useAuth;
