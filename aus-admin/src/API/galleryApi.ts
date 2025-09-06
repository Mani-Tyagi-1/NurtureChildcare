import axiosInstance from "./axiosInstance";

export const fetchAlbums = async () => {
  const res = await axiosInstance.get("/albums");
  return res.data;
};

export const getAlbumUploadUrl = async (file: File): Promise<{ uploadURL: string, fileUrl: string }> => {
  const res = await axiosInstance.get("/upload-gallery", {
    params: {
      filename: file.name,
      filetype: file.type
    }
  });
  return res.data; // returns { uploadURL, fileUrl }
};

export const createAlbum = async ({ name, media }: { name: string, media: { type: string, url: string }[] }) => {
  const res = await axiosInstance.post("/albums", { name, media });
  return res.data;
};

export const fetchAlbumById = async (id: string) => {
  const res = await axiosInstance.get(`/albums/${id}`);
  return res.data;
};

export const updateAlbum = async (id: string, data: { name: string; media: any[] }) => {
  const res = await axiosInstance.put(`/albums/${id}`, data);
  return res.data;
};

export const deleteAlbum = async (id: string) => {
  const res = await axiosInstance.delete(`/albums/${id}`);
  return res.data;
};

