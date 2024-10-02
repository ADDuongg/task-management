'use server'

import mongoose from 'mongoose';

const MONGODB_URI: string = process.env.REACT_APP_MONGODB_URI || 'mongodb://127.0.0.1:27017/tasks_management';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let isConnected: boolean | null = null; 

export const dbConnect = async () => {
  if (isConnected) {
    return; 
  }

  try {
    await mongoose.connect(MONGODB_URI); 
    isConnected = true; 
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};