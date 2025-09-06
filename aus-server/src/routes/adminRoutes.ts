const express = require('express');
import { getAllAdmins, deleteAdmin } from '../controllers/adminController';
import { requireSuperAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/', requireSuperAdmin, getAllAdmins);
router.delete('/:id', requireSuperAdmin, deleteAdmin);

export default router;
