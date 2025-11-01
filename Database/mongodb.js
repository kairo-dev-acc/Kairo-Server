import mongoose from 'mongoose';
import 'dotenv/config';

const MONGODB_URI_one = process.env.MONGODB_URI_one || 'mongodb://localhost:27017/mydatabase'; 
// const MONGODB_URI_two = 'mongodb://localhost:27017/mydatabase'; 

const connectDB = async () => {

    if(!MONGODB_URI_one) {
    console.error('MongoDB connection URIs are not defined in environment variables.');
    process.exit(1);
    }
  try {
    await mongoose.connect(MONGODB_URI_one)
    // await mongoose.connect(MONGODB_URI_two)  
    console.log('MongoDB connected successfully 😘');
  } catch (error) {
    console.error('MongoDB connection error😒:', error);
    process.exit(1);
  }
}

export default connectDB;