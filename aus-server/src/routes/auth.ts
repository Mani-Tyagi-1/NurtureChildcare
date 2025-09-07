const express = require('express');
import { changePassword, getCurrentAdmin, listAdmins, loginAdmin, registerAdmin, resetAdminPassword } from "../controllers/authController";
import { requireAuth, requireSuperAdmin } from "../middleware/auth";

const router = express.Router();

router.post('/login-admin', loginAdmin);
router.post('/register-admin', requireSuperAdmin, registerAdmin);
router.get('/me', requireAuth, getCurrentAdmin);

router.post("/change-password", requireAuth, changePassword);

// (Optional) NEW: superadmin-only reset for any admin
router.post(
  "/admins/:id/reset-password",
  requireSuperAdmin,
  resetAdminPassword
);

// (Optional) NEW: superadmin-only list admins (for your profile table)
router.get("/admins", requireSuperAdmin, listAdmins);

export default router;
