import { TaskInterface } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const TaskSchema: Schema<TaskInterface> = new Schema(
  {
    files: { type: [String] },
    subject: { type: String, required: true },
    done: { type: String },
    startDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    assignTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String },
    descriptions: { type: String },
    workToDo: { type: [String], default: [] },
    taskOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    estimateTime: { type: String },
  },
  {
    timestamps: true,
  }
);

export const TaskModel: Model<TaskInterface> =
  mongoose.models.Task || mongoose.model<TaskInterface>("Task", TaskSchema, "Task");

