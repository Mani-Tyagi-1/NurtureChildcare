import { Request, Response } from 'express';
import Admin from '../models/AdminModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

    const token = jwt.sign(
      { id: admin._id }, // payload
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    return res.status(200).json({ message: 'Login successful', admin: { email: admin.email, superadmin: admin.superadmin }, token });
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

  if (!admin) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  return res.status(200).json({
    email: admin.email,
    superadmin: admin.superadmin,
  });
};
