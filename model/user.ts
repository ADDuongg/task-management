import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  account_role: number;
  specialization?: string;
  position?: string;
  description?: string;
  phone_number?: number;
  skills?: string[];
  avatar?: string;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
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
    type: Number,
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
const UserModel: Model<IUser> = mongoose.models.UserModel || mongoose.model<IUser>('UserModel', UserSchema, 'User');

export default UserModel;
