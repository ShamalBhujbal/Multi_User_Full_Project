import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/note-taking-app';

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(' MongoDB Connected');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@noteapp.com' });
    
    if (existingAdmin) {
      console.log(' Admin user already exists');
      if (!existingAdmin.role || existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log(' Updated existing user to admin role');
      }
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@noteapp.com',
      password: 'admin123', // Change this in production!
      role: 'admin',
    });

    console.log(' Admin user created successfully!');
    console.log(' Email: admin@noteapp.com');
    console.log(' Password: admin123');
    console.log('  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error(' Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();

