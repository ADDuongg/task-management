import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
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
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
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


const UserModel: Model<IUser> = mongoose.models.UserModel || mongoose.model<IUser>('UserModel', UserSchema, 'User');

export default UserModel;

