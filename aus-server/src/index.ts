import express from 'express';
import 'dotenv/config';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import testimonialRoutes from './routes/testimonialRoutes'
import { bootstrapSuperAdmin } from './utils/bootstrapSuperAdmin';
import adminRoutes from './routes/adminRoutes'
import newsletterRoutes from './routes/newsletterRoutes';
import blogRoutes from './routes/blogRoutes';
import uploadRoutes from './routes/uploadRoutes';
import albumRoutes from './routes/albumRoutes';
import founderRoutes from './routes/founderRoutes';
import policyRoutes from './routes/policyRoutes';
import chat from './routes/chat';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' })); // or higher -- REMOVE AFTER CLOUD😭
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // -- REMOVE AFTER CLOUD😭

app.use(cors()); 
app.use("/api/policies", policyRoutes); // Mount policy routes

// Connect to MongoDB
connectDB().then(() => {
  bootstrapSuperAdmin();
});

const uploadDir = path.join(__dirname, '..', 'uploads', 'newsletters');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Mount the router here
app.use('/api/auth', authRoutes); // Correct use
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/admins', adminRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // for accessing PDFs
app.use('/api/newsletters', newsletterRoutes); // ✅ This will prefix all newsletter routes
app.use('/api/blogs', blogRoutes);
app.use('/api', uploadRoutes);
app.use('/api', albumRoutes);
app.use('/api/chat', chat)
app.use("/api/founder", founderRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);


});

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Server is working!' });
});

