// -----------------------------------------------------------------------------
// Copyright (c) 2025 Kairo. All rights reserved.
//
// This file is part of a proprietary project owned by Kairo.
// Unauthorized copying, modification, distribution, or use of this file,
// in whole or in part, is strictly prohibited without written permission.
// -----------------------------------------------------------------------------
// *MongoDB Connection Setup
import mongoose from 'mongoose';
import 'dotenv/config';

// *Load MongoDB connection URIs from environment variables
const MONGODB_URI_one = process.env.MONGODB_URI_one; 
// const MONGODB_URI_two = 'mongodb://localhost:27017/mydatabase'; 

// *Function to connect to MongoDB
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