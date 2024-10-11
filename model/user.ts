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
});

// Xuất model User
const UserModel: Model<UsersInterface> = mongoose.models.UserModel || mongoose.model<UsersInterface>('UserModel', UserSchema, 'User');

export default UserModel;
