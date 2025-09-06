// src/models/NewsletterModel.ts
import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pdfUrl: { type: String, required: true },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

export default Newsletter;
