import axiosInstance from "../../../api/axiosInstance";

export const registerUser = async (username, email, password) => {
  const response = await axiosInstance.post("/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (identifier, password) => {
  const response = await axiosInstance.post("/auth/login", {
    identifier,
    password,
  });
  return response.data;
};

export const getMeUser = async () => {
  const response = await axiosInstance.get("/auth/get-me");
  return response.data;
};

export const logOutUser = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const verifyEmail = async (token) => {
  console.log("here it is");

  const response = await axiosInstance.get(`/auth/verify-email`, {
    params: { token },
  });
  return response.data;
};

export const resendVerification = async (identifier) => {
  const response = await axiosInstance.post("/auth/resend-verification", {
    identifier,
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axiosInstance.post("/auth/forgot-password", {
    email,
  });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await axiosInstance.post("/auth/reset-password", {
    token,
    newPassword,
  });
  return response.data;
};
