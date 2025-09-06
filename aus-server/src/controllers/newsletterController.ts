// src/controllers/newsletterController.ts
import { Response, Request } from "express";
import Newsletter from "../models/NewsletterModel";

interface AddNewsletterRequest extends Request {
  body: {
    name: string;
    pdfUrl: string;
  };
}

// Get all newsletters
export const getAllNewsletters = async (_req: Request, res: Response) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 }); // Newest first
    res.json(newsletters);
  } catch (err) {
    console.error("Fetch newsletters error:", err);
    res.status(500).json({ message: "Failed to fetch newsletters." });
  }
};

// Add new newsletter
export const addNewsletter = async (req: AddNewsletterRequest, res: Response) => {
  const { name, pdfUrl } = req.body;

  if (!name || !pdfUrl) {
    return res.status(400).json({ message: "Name and PDF URL are required." });
  }

  try {
    const newDoc = new Newsletter({ name, pdfUrl });
    await newDoc.save();
    res.status(201).json({ message: "Newsletter saved.", newsletter: newDoc });
  } catch (err) {
    console.error("Newsletter creation failed:", err);
    res.status(500).json({ message: "Server error saving newsletter." });
  }
};


// Delete newsletter
export const deleteNewsletter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newsletter = await Newsletter.findByIdAndDelete(id);

    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found." });
    }

    res.json({ message: "Newsletter deleted successfully." });
  } catch (err) {
    console.error("Delete newsletter error:", err);
    res.status(500).json({ message: "Failed to delete newsletter." });
  }
};
