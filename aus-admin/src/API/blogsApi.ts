// src/API/blogApi.ts
import axiosInstance from './axiosInstance';

export const fetchBlogs = async () => {
  const res = await axiosInstance.get('/blogs');
  return res.data;
};

export const fetchBlogById = async (id: string) => {
  const res = await axiosInstance.get(`/blogs/${id}`);
  return res.data;
};

export const createBlog = async (blog: {
  title: string;
  content: string;
  tags: string[];
  images: string[]; // URLs or base64 depending on implementation
}) => {
  const res = await axiosInstance.post('/blogs', blog);
  return res.data;
};

export const updateBlog = async (id: string, blog: {
  title?: string;
  content?: string;
  tags?: string[];
  images?: string[];
}) => {
  const res = await axiosInstance.put(`/blogs/${id}`, blog);
  return res.data;
};

export const deleteBlog = async (id: string) => {
  const res = await axiosInstance.delete(`/blogs/${id}`);
  return res.data;
};
