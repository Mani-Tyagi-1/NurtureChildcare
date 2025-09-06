const express = require('express');
import { getCurrentAdmin, loginAdmin, registerAdmin } from "../controllers/authController";
import { requireAuth, requireSuperAdmin } from "../middleware/auth";

const router = express.Router();

router.post('/login-admin', loginAdmin);
router.post('/register-admin', requireSuperAdmin, registerAdmin);
router.get('/me', requireAuth, getCurrentAdmin);

export default router;
