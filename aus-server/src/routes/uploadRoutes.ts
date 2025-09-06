const express = require('express');
import { generateBlogImageUploadURL, generateGalleryUploadURL, generateNewsletterUploadURL, generateTestimonialUploadURL, generateFounderUploadURL } from '../controllers/uploadController';

const router = express.Router();

router.get('/upload-url', generateTestimonialUploadURL); // For testimonials
router.get('/upload-blog-image', generateBlogImageUploadURL); // For Blogs
router.get('/upload-newsletter', generateNewsletterUploadURL); // For Newsletter
router.get("/upload-gallery", generateGalleryUploadURL); // For Gallery
router.get("/upload-founder", generateFounderUploadURL); // For Founder


export default router;
