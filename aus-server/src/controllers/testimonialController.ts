import { Request, Response } from 'express';
import TestimonialModel from '../models/TestimonialModel';

// Create a new testimonial
export const createTestimonial = async (req: Request, res: Response) => {
  const { name, message, photo } = req.body;

  if (!name || !message || !photo) {
    return res.status(400).json({ error: 'Name, message, and photo are required.' });
  }

  try {
    const newTestimonial = await TestimonialModel.create({ name, message, photo });
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create testimonial.' });
  }
};

// Get all testimonials (optionally sorted)
export const getAllTestimonials = async (_req: Request, res: Response) => {
  try {
    const testimonials = await TestimonialModel.find().sort({ createdAt: -1 }); // Newest first
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials.' });
  }
};

// Delete a testimonial by ID
export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await TestimonialModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Testimonial not found.' });
    res.json({ message: 'Testimonial deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial.' });
  }
};
