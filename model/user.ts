import { UsersInterface } from '@/types';
import mongoose, { Model, Schema } from 'mongoose';

const UserSchema: Schema<UsersInterface> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  account_role: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
  },
  position: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  skills: {
    type: [String],
  },
  date: {
    type: Date
  },
  avatar: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  
},{
  timestamps: true, 
});

export const UserModel: Model<UsersInterface> = mongoose.models.User || mongoose.model<UsersInterface>('User', UserSchema, 'User');

