'use server'
import { ProjectInterface } from "@/types";
import mongoose, { Model, Schema } from "mongoose";
import TaskModel from "./task";
import UserModel from "./user";
const ProjectSchema: Schema<ProjectInterface> = new Schema(
  {
    projectName: { type: String },
    status: {type: String},
    description: {type: String},
    startDate: {type: String},
    dueDate: {type: String},
    taskId:  [{ type: mongoose.Schema.Types.ObjectId, ref: TaskModel}],
    userId:  [{ type: mongoose.Schema.Types.ObjectId, ref: UserModel }]
  },
  {
    timestamps: true,
  }
);

const ProjectModel: Model<ProjectInterface> =
  mongoose.models.Project || mongoose.model<ProjectInterface>("Project", ProjectSchema, "Project");

export default ProjectModel;
