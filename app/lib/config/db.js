import mongoose from 'mongoose';

const ConnectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/BlogApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default ConnectDB;
