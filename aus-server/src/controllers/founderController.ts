import Founder, { IFounder } from "../models/FounderModel";
import { Request, Response, NextFunction, RequestHandler } from "express";
import mongoose from "mongoose";


// GET /api/founder
export const getFounder = async (req: any, res: any) => {
  try {
    const founder = await Founder.findOne().sort({ createdAt: -1 }); // 🔄 Most recent
    res.json(founder);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch founder" });
  }
};
  

// POST /api/founder
export const createFounder = async (req: any, res:any) => {
  
  console.log(req.body);
  const { name, title, bio, image, badges } = req.body;

  try {
    const newFounder = new Founder({ name, title, bio, image, badges });
    await newFounder.save();
    res.status(201).json(newFounder);
  } catch (err) {
    res.status(400).json({ error: "Failed to create founder" });
  }
};



function normalizePayload(body: any): Partial<IFounder> {
  const payload: Partial<IFounder> = {};
  if (typeof body.name === "string") payload.name = body.name.trim();
  if (typeof body.title === "string") payload.title = body.title.trim();
  if (typeof body.bio === "string") payload.bio = body.bio.trim();
  if (typeof body.image === "string") payload.image = body.image.trim();

  if (Array.isArray(body.badges)) {
    payload.badges = body.badges.map((b: any) => String(b).trim()).filter(Boolean);
  } else if (typeof body.badges === "string") {
    payload.badges = body.badges
      .split(",")
      .map((b: string) => b.trim())
      .filter(Boolean);
  }

  return payload;
}

// Helper: get the single founder (if you treat this as a singleton)
async function getSingleton(): Promise<IFounder | null> {
  // Change this if you prefer a specific rule. This grabs the newest.
  return Founder.findOne().sort({ createdAt: -1 }).exec();
}



// PUT /api/founder/:id
export const updateFounderById: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid founder id." });
      return;
    }
    const payload = normalizePayload(req.body);
    const updated = await Founder.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }).exec();
    if (!updated) {
      res.status(404).json({ message: "Founder not found." });
      return;
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// PUT /api/founder
export const updateSingletonFounder: RequestHandler = async (req, res, next) => {
  try {
    const existing = await getSingleton();
    if (!existing) {
      res.status(404).json({ message: "No founder to update." });
      return;
    }
    const payload = normalizePayload(req.body);
    existing.set(payload);
    const saved = await existing.save();
    res.status(200).json(saved);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/founder/:id
export const deleteFounderById: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid founder id." });
      return;
    }
    const deleted = await Founder.findByIdAndDelete(id).exec();
    if (!deleted) {
      res.status(404).json({ message: "Founder not found." });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// DELETE /api/founder
export const deleteSingletonFounder: RequestHandler = async (_req, res, next) => {
  try {
    const existing = await getSingleton();
    if (!existing) {
      res.status(404).json({ message: "No founder to delete." });
      return;
    }
    await Founder.deleteOne({ _id: existing._id }).exec();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

