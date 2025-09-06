// src/models/BlogModel.ts
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    images: [{ type: String }],
  },
  { timestamps: true } // includes createdAt and updatedAt
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
