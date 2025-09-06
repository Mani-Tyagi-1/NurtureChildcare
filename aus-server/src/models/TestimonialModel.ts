import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  message: string;
  photo: string;
  createdAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    photo: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const TestimonialModel = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
export default TestimonialModel;
