// src/API/newsletterApi.ts
import axiosInstance from "./axiosInstance";

export const fetchNewsletters = async () => {
  const res = await axiosInstance.get("/newsletters");
  return res.data;
};

// NEW VERSION — expects `name` and `pdfUrl`
export const addNewsletter = async (name: string, pdfUrl: string) => {
  const res = await axiosInstance.post("/newsletters", { name, pdfUrl });
  return res.data;
};

export const deleteNewsletter = async (id: string) => {
  const res = await axiosInstance.delete(`/newsletters/${id}`);
  return res.data;
};
