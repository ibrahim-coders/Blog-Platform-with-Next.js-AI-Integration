import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // fixed spelling
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
  },
  password: {
    type: String, // fixed type
    required: true, // fixed spelling
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent OverwriteModelError in Next.js
export default mongoose.models.User || mongoose.model('User', userSchema);
