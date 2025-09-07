import { Schema, model, Document } from "mongoose";

export interface IFounder extends Document {
  name: string;
  title: string;
  bio: string;
  image: string;
  badges: string[];
  createdAt: Date;
  updatedAt: Date;
}

const FounderSchema = new Schema<IFounder>(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    badges: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default model<IFounder>("Founder", FounderSchema);
