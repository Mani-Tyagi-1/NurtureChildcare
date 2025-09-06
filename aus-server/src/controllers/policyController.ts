// src/controllers/policyController.ts
import { Request, Response } from "express";
import Policy from "../models/PolicyModel";

// GET all
export const getAllPolicies = async (_req: Request, res: Response) => {
  try {
    const policies = await Policy.find().sort({ createdAt: -1 });
    res.json(policies);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch policies." });
  }
};

// GET by ID
export const getPolicyById = async (req: Request, res: Response) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).json({ message: "Not found." });
    res.json(policy);
  } catch {
    res.status(500).json({ message: "Error retrieving policy." });
  }
};

// POST create
export const createPolicy = async (req: Request, res: Response) => {
  try {
    const { title, qrImageUrl, redirectLink } = req.body;
    const policy = new Policy({ title, qrImageUrl, redirectLink });
    await policy.save();
    res.status(201).json({ message: "Policy created", policy });
  } catch (err) {
    res.status(500).json({ message: "Failed to create policy." });
  }
};

// DELETE (optional)
export const deletePolicy = async (req: Request, res: Response) => {
  try {
    const deleted = await Policy.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found." });
    res.json({ message: "Deleted." });
  } catch {
    res.status(500).json({ message: "Delete failed." });
  }
};
