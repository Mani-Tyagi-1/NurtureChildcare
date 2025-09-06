import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  password: string;
  superadmin?: boolean;
}

const adminSchema: Schema = new Schema<IAdmin>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  superadmin: {
    type: Boolean,
    default: false,
  },
});

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
export default Admin;
