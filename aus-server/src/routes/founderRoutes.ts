import express from "express";
import { generateFounderUploadURL } from "../controllers/uploadController";
import {
  createFounder,
  deleteFounderById,
  deleteSingletonFounder,
  getFounder,
  updateFounderById,
  updateSingletonFounder,

} from "../controllers/founderController";

const router = express.Router();

router.get("/", getFounder);
router.post("/", createFounder);
// Wrap async handler to catch errors and pass to next()
const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/upload-url", asyncHandler(generateFounderUploadURL)); // 👈 new route


// UPDATE
router.put("/:id", updateFounderById);     // /api/founder/:id
router.put("/", updateSingletonFounder);   // /api/founder

// DELETE
router.delete("/:id", deleteFounderById);  // /api/founder/:id
router.delete("/", deleteSingletonFounder);// /api/founder

export default router;
