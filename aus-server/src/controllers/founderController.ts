import Founder from "../models/FounderModel";

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
