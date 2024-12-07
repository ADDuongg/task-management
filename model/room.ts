import { RoomInterface } from "@/types";
import mongoose, { Schema, Model } from "mongoose";



const RoomSchema: Schema<RoomInterface> = new Schema(
  {
    roomName: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Message'
    },
  },
  {
    timestamps: true, 
  }
);

export const RoomModel: Model<RoomInterface> =
  mongoose.models.Room || mongoose.model<RoomInterface>("Room", RoomSchema, "Room");

