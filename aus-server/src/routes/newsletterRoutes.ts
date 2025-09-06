// src/routes/newsletterRoutes.ts
const express = require('express');
import {
  addNewsletter,
  deleteNewsletter,
  getAllNewsletters,
} from "../controllers/newsletterController";
import { uploadNewsletter } from "../utils/multer";
import { requireAuth, requireSuperAdmin } from "../middleware/auth";

const router = express.Router();

router.get("/", getAllNewsletters);
router.post("/", requireAuth, addNewsletter);
router.delete("/:id", requireSuperAdmin, deleteNewsletter);

export default router;
