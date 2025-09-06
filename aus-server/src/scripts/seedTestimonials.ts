
import dotenv from 'dotenv';
dotenv.config();
console.log('URI =', process.env.MONGO_URI);


import mongoose from 'mongoose';
import TestimonialModel from '../models/TestimonialModel'; // adjust path if needed

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    // Clear entire testimonials collection
    await TestimonialModel.deleteMany({});
    console.log("Cleared existing testimonials");

    // Insert one dummy testimonial
    const testimonial = {
      name: "Zahra Azami",
      message: "I love working with Nurture. They offer the best combination of professionalism and personal connection. Always ready to guide and support.",
      photo: "https://aus.syd1.digitaloceanspaces.com/aus/testimonials/12dd161d-da30-4255-a975-23bc9df1972b.jpg"
    };

    await TestimonialModel.create(testimonial);
    console.log("Inserted dummy testimonial successfully");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
