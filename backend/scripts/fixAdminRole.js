import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/note-taking-app';

const fixAdminRole = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(' MongoDB Connected');

    const admin = await User.findOne({ email: 'admin@noteapp.com' });
    
    if (admin) {
      admin.role = 'admin';
      await admin.save();
      console.log(' Admin role updated');
      console.log('Admin user:', JSON.stringify({
        name: admin.name,
        email: admin.email,
        role: admin.role,
        _id: admin._id
      }, null, 2));
    } else {
      console.log(' Admin user not found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error(' Error:', error);
    process.exit(1);
  }
};

fixAdminRole();

