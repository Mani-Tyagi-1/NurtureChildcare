// src/routes/blogRoutes.ts
const express = require('express');
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController";
import { requireAuth, requireSuperAdmin } from "../middleware/auth";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", requireAuth, createBlog);
router.put("/:id", requireSuperAdmin, updateBlog);
router.delete("/:id", requireSuperAdmin, deleteBlog);

export default router;
