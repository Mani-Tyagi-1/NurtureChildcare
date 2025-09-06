import Admin from '../models/AdminModel';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const bootstrapSuperAdmin = async () => {
  try {
    const existing = await Admin.findOne({ superadmin: true });

    if (existing) {
      console.log('✅ Superadmin already exists. Skipping bootstrap.');
      return;
    }

    const email = process.env.BOOTSTRAP_ADMIN_EMAIL;
    const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;

    if (!email || !password) {
      console.warn('⚠️ BOOTSTRAP_ADMIN_EMAIL or PASSWORD not defined in .env. Skipping bootstrap.');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
      superadmin: true,
    });

    console.log(`✅ Bootstrapped superadmin created: ${newAdmin.email}`);
  } catch (err: any) {
    console.error('❌ Error bootstrapping superadmin:', err.message);
  }
};
