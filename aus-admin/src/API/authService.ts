import axiosInstance from "./axiosInstance";

export const loginAdmin = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/login-admin", {
    email,
    password,
  });
  return response.data;
};

export const registerAdmin = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/register-admin", {
    email,
    password,
  });
  return response.data;
};

export const getCurrentAdmin = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data; // { admin: {...} } or {...}
};

/**
 * Fetch all admins (superadmin-only endpoint).
 * Adjust the endpoint if your backend differs (e.g. '/admins' or '/users/admins').
 */
export const getAllAdmins = async () => {
  const res = await axiosInstance.get("/auth/admins");
  return res.data; // either { admins: [...] } or [...]
};

export const changePassword = async (params: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await axiosInstance.post("/auth/change-password", params);
  return res.data;
};