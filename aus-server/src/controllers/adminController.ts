import { Request, Response } from 'express';
import Admin from '../models/AdminModel';

// GET all admins
export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await Admin.find({}, '-password'); // omit password field
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching admins.' });
  }
};

// DELETE admin by ID
export const deleteAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    await Admin.findByIdAndDelete(id);
    res.json({ message: 'Admin deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting admin.' });
  }
};
