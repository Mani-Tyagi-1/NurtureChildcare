// src/routes/policyRoutes.ts
const express = require("express");
import {
  getAllPolicies,
  getPolicyById,
  createPolicy,
  deletePolicy,
} from "../controllers/policyController";
import { requireAuth, requireSuperAdmin } from "../middleware/auth";

const router = express.Router();

router.get("/", getAllPolicies);
router.get("/:id", getPolicyById);
router.post("/", createPolicy);
// router.post("/", requireAuth, createPolicy);
router.delete("/:id", deletePolicy);
// router.delete("/:id", requireSuperAdmin, deletePolicy);

export default router;
