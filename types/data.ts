import mongoose from "mongoose";
import { ProjectStatus, RoleEnum, SortEnum, TaskStatus } from "./commons";

export interface TaskInterface {
    _id: string;
    files?: string[];
    subject?: string;
    done?: string;
    startDate?: string;
    dueDate?: string;
    assignTo?: mongoose.Types.ObjectId;
    status?: TaskStatus;
    descriptions?: string;
    workToDo?: string[];
    taskOwner?: mongoose.Types.ObjectId;
    estimateTime?: string
    /* userId?: mongoose.Types.ObjectId[]; */
    projectId?: mongoose.Types.ObjectId;
    createdAt?: string;
    updatedAt?: string;
}

export interface UsersInterface {
    _id: string;
    email: string;
    password: string;
    account_role?: RoleEnum;
    specialization?: string;
    position?: string;
    username: string;
    description?: string;
    phone_number?: string;
    skills?: string[];
    avatar?: string;
    date?: string;
    createdAt?: Date;
    updatedAt?: Date;
    confirm_password?: string;
}
export interface filterInterface<T> {
  field: keyof T,
  value: string[]
};

export interface sortInterface {
  field: string,
  order: SortEnum
};

export interface UserFormRequest {
    _id: string;
    email: string;
    password: string;
    account_role?: string;
    specialization?: string;
    position?: string;
    username: string;
    description?: string;
    phone_number?: string;
    skills?: string[];
    avatar?: File | string;
    date?: string;
    confirm_password?: string;
}

export interface TaskFormRequest {
  assignTo?: string;      
  dueDate: string;        
  done: number;      
  startDate: string;      
  status: TaskStatus;        
  subject?: string;      
  taskOwner?: string;    
  descriptions?: string;
  estimateTime?: number;
  userId?: string[] 
  workToDo?: string[];
  files?: File[] | string[]
}

export interface ProjectInterface {
  _id: string;
  projectName: string;
  status?: ProjectStatus;
  description?: string;
  startDate?: string;
  dueDate?: string;
  taskId?: TaskInterface[];
  userId: UsersInterface[];
  createdAt?: string;
  updatedAt?: string;
}


export interface ProjectFormRequest {
  projectName: string;
  status: ProjectStatus;
  description?: string;
  startDate?: string;
  dueDate?: string;
  taskId?: string[] | TaskInterface[] | { label: string; value: string; }[];
  userId: string[] | UsersInterface[] | { label: string; value: string; }[];
}
