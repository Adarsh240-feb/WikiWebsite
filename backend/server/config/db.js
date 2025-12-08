// server/config/db.js (UPDATED)
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wiki_local';
    const conn = await mongoose.connect(uri, { dbName: process.env.MONGODB_DBNAME || undefined });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // do not exit here to allow process to continue in some environments
    throw error;
  }
};

export default connectDB; // Change module.exports to export default