import express from "express";
import { generateFounderUploadURL } from "../controllers/uploadController";
import {
  createFounder,
  getFounder,

} from "../controllers/founderController";

const router = express.Router();

router.get("/", getFounder);
router.post("/", createFounder);
// Wrap async handler to catch errors and pass to next()
const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/upload-url", asyncHandler(generateFounderUploadURL)); // 👈 new route

export default router;
