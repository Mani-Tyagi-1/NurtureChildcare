import axiosInstance from './axiosInstance';

export const fetchTestimonials = async () => {
  const res = await axiosInstance.get('/testimonials');
  return res.data;
};

export const deleteTestimonial = async (id: string) => {
  const res = await axiosInstance.delete(`/testimonials/${id}`);
  return res.data;
};

export const addTestimonial = async (data: {
  name: string;
  message: string;
  photo: string;
}) => {
  const res = await axiosInstance.post('/testimonials', data);
  return res.data;
};
