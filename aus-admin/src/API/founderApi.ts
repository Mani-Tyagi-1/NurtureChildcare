import axios from "axios";

export const getFounderUploadUrl = async (file: File) => {
  const res = await axios.post("http://localhost:5000/api/founder/upload-url", {
    filename: file.name,
    contentType: file.type,
  });
  return res.data; // { uploadURL, fileUrl }
};

export const createFounder = async (data: {
  name: string;
  title: string;
  bio: string;
  image: string;
  badges: string[];
}) => {
  return await axios.post("http://localhost:5000/api/founder", data);
};
