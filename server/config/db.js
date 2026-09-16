import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/digital_student_assistance_network';
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Primary MongoDB connection failed (${error.message}). Connecting to local MongoDB...`);
    try {
      const localUri = 'mongodb://127.0.0.1:27017/digital_student_assistance_network';
      const conn = await mongoose.connect(localUri);
      console.log(`MongoDB Connected (Local): ${conn.connection.host}`);
    } catch (localErr) {
      console.error(`MongoDB connection error: ${localErr.message}`);
    }
  }
};

export default connectDB;
