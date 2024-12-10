'use server'
import { LogtimeInterface } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const LogtimeSchema: Schema<LogtimeInterface> = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    activity: { type: String },
    comment: { type: String },
    dateLogtime: { type: String },
    timeLogtime: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const LogtimeModel: Model<LogtimeInterface> =
  mongoose.models.Logtime || mongoose.model<LogtimeInterface>("Logtime", LogtimeSchema, "Logtime");

