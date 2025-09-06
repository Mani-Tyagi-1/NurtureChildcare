const express = require('express');
import {
  createTestimonial,
  getAllTestimonials,
  deleteTestimonial,
} from '../controllers/testimonialController';
import { generateTestimonialUploadURL } from '../controllers/uploadController';
import { requireAuth, requireSuperAdmin } from '../middleware/auth'; // ✅ use newly added middleware

const router = express.Router();

// Any authenticated admin can fetch testimonials
router.get('/', getAllTestimonials);

// Only authenticated admin can add testimonials (or use requireSuperAdmin if needed)

router.post('/', requireAuth, createTestimonial);

// Only authenticated super admin can delete testimonials
router.delete('/:id', requireSuperAdmin, deleteTestimonial);

// NEW: Upload URL route
router.get('/generate-upload-url', requireSuperAdmin, generateTestimonialUploadURL);

export default router;
