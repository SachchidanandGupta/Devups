import axios from 'axios';
import useAuthStore  from '../features/auth/store/authStore';

const axiosInstance = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) =>response,
    (error)=>{
        if(error.response?.status === 401) {
            useAuthStore.getState().logout()
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

