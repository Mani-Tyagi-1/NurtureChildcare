import axiosInstance from './axiosInstance';

export const loginAdmin = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/login-admin', {
    email,
    password,
  });
  return response.data;
};

export const registerAdmin = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/register-admin', {
    email,
    password,
  });
  return response.data;
};

export const getCurrentAdmin = async () => {
  const res = await axiosInstance.get('/auth/me');
  return res.data;
};