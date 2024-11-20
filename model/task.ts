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
    estimateTime: { type: String },
  },
  {
    timestamps: true,
  }
);

const TaskModel: Model<TaskInterface> =
  mongoose.models.Task || mongoose.model<TaskInterface>("Task", TaskSchema, "Task");

export default TaskModel;
