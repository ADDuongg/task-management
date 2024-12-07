import mongoose, { Schema, Model } from "mongoose";
import { MessageInterface } from "@/types";

const MessageSchema: Schema<MessageInterface> = new Schema(
  {
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: { type: String },
      createdAt: { type: Date, default: Date.now },
      readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    }
  ]
  },
  {
    timestamps: true,
  }
);

export const MessageModel: Model<MessageInterface> =
  mongoose.models.Message || mongoose.model<MessageInterface>("Message", MessageSchema, "Message");

