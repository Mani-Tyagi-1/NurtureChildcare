import mongoose from "mongoose";

const founderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    badges: [{ type: String }],
  },
  { timestamps: true } 
);

const Founder = mongoose.model("Founder", founderSchema);
export default Founder;
