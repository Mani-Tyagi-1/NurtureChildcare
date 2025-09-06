// src/controllers/blogController.ts
import { Request, Response } from "express";
import Blog from "../models/BlogModel";

// GET all blogs
export const getAllBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs." });
  }
};

// GET single blog
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found." });
    res.json(blog);
  } catch {
    res.status(500).json({ message: "Error retrieving blog." });
  }
};

// POST create blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, tags, images } = req.body;

    const blog = new Blog({ title, content, tags, images });
    await blog.save();

    res.status(201).json({ message: "Blog created.", blog });
  } catch (err) {
    res.status(500).json({ message: "Failed to create blog." });
  }
};

// PUT update blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBlog) return res.status(404).json({ message: "Blog not found." });
    res.json(updatedBlog);
  } catch {
    res.status(500).json({ message: "Failed to update blog." });
  }
};

// DELETE blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found." });
    res.json({ message: "Blog deleted successfully." });
  } catch {
    res.status(500).json({ message: "Failed to delete blog." });
  }
};
