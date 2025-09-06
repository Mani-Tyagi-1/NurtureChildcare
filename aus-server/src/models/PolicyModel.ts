// src/models/PolicyModel.ts
import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    qrImageUrl: { type: String, required: true },
    redirectLink: { type: String, required: true },
  },
  { timestamps: true }
);

const Policy = mongoose.model("Policy", policySchema);
export default Policy;
