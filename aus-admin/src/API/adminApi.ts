import axiosInstance from './axiosInstance';

export const getAllAdmins = async () => {
  const res = await axiosInstance.get('/admins');
  return res.data;
};

export const deleteAdmin = async (id: string) => {
  const res = await axiosInstance.delete(`/admins/${id}`);
  return res.data;
};
