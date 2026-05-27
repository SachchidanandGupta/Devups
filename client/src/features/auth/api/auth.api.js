import axiosInstance from './axiosInstance';


export const registerUser = async(username,email,password)=>{
    const response = await axiosInstance.post("/auth/register",{username,email,password,});
    return response.data;

}
export const loginUser = async(username,email,password)=>{
    const response = await axiosInstance.post('/auth/login', {username, email, password });
    return response.data;
}

export const getMeUser = async()=>{
    const response = await axiosInstance.get("/auth/get-me");
    return response.data;
};

export const logOutUser = async()=>{
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
}