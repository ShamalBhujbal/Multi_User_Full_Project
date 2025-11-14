import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config(); //dotenv is nodejs package 

if (!process.env.JWT_SECRET) {
  console.error(' Error: JWT_SECRET is not set in environment variables');
  console.error('Please create a .env file in the backend directory with JWT_SECRET');
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //It helps Express parse incoming form data and makes it available on req.body.

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/note-taking-app';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(' MongoDB Connected Successfully');
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(' MongoDB Connection Error:', error);
    process.exit(1);
  });

export default app;

