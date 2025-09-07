// src/controllers/authController.ts
import { Request, Response } from 'express';
import Admin from '../models/AdminModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Utility: issue a fresh token (optional but nice after password change)
const issueToken = (adminId: string) =>
  jwt.sign({ id: adminId }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = issueToken(admin.id);
    return res
      .status(200)
      .json({ message: 'Login successful', admin: { email: admin.email, superadmin: admin.superadmin }, token });
  } catch (error: any) {
    console.error('Login error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const registerAdmin = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Admin with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    return res.status(201).json({ message: 'Admin registered successfully.', admin: { email } });
  } catch (err: any) {
    console.error('Register error:', err.message);
    return res.status(500).json({ message: 'Server error during registration.' });
  }
};

export const getCurrentAdmin = async (req: Request, res: Response) => {
  const admin = (req as any).admin;
  if (!admin) return res.status(401).json({ message: 'Not authorized' });

  return res.status(200).json({
    // id: admin._id,
    id: admin.id,
    email: admin.email,
    superadmin: admin.superadmin,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  });
};

/**
 * NEW: Change own password (requires requireAuth attaching req.admin)
 * Body: { currentPassword: string, newPassword: string }
 */
export const changePassword = async (req: Request, res: Response) => {
  const authAdmin = (req as any).admin;
  if (!authAdmin) return res.status(401).json({ message: 'Not authorized' });

  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'currentPassword and newPassword are required' });
  }
  if (String(newPassword).length < 8) {
    return res.status(400).json({ message: 'New password must be at least 8 characters long' });
  }

  try {
    const admin = await Admin.findById(authAdmin.id).select('+password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const ok = await bcrypt.compare(currentPassword, admin.password);
    if (!ok) return res.status(401).json({ message: 'Current password is incorrect' });

    const sameAsOld = await bcrypt.compare(newPassword, admin.password);
    if (sameAsOld) return res.status(400).json({ message: 'New password must be different from the old one' });

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    const token = issueToken(admin.id); // optional refresh
    return res.status(200).json({ message: 'Password updated successfully', token });
  } catch (e: any) {
    console.error('Change password error:', e.message);
    return res.status(500).json({ message: 'Server error updating password' });
  }
};

/**
 * (Optional) Superadmin: reset someone else’s password
 * Params: :id
 * Body: { newPassword: string }
 */
export const resetAdminPassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { newPassword } = req.body || {};
  if (!newPassword) return res.status(400).json({ message: 'newPassword is required' });
  if (String(newPassword).length < 8) {
    return res.status(400).json({ message: 'New password must be at least 8 characters long' });
  }

  try {
    const admin = await Admin.findById(id).select('+password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (e: any) {
    console.error('Reset password error:', e.message);
    return res.status(500).json({ message: 'Server error resetting password' });
  }
};

/**
 * (Optional) Superadmin: list all admins (for your Profile table)
 */
export const listAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await Admin.find({}, { email: 1, superadmin: 1, createdAt: 1 }).sort({ createdAt: -1 });
    return res.status(200).json({ admins });
  } catch (e: any) {
    console.error('List admins error:', e.message);
    return res.status(500).json({ message: 'Server error fetching admins' });
  }
};
