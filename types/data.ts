import mongoose from "mongoose";
import { ProjectStatus, RoleEnum, SortEnum, TaskStatus } from "./commons";

export interface TaskInterface {
    _id: string;
    files?: string[];
    subject?: string;
    done?: number;
    startDate?: string;
    dueDate?: string;
    assignTo?: UsersInterface | string;
    status?: TaskStatus;
    descriptions?: string;
    workToDo?: string[];
    taskOwner?: UsersInterface | string;
    estimateTime?: string
    projectId?: string;
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

export interface sortInterface<T> {
  field: keyof T,
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
  assignTo?: UsersInterface | string | { label: string; value: string; }[];      
  dueDate: string;
  done: { label: string; value: number; }[] | number;      
  startDate: string;      
  status: TaskStatus;        
  subject?: string;      
  taskOwner?: UsersInterface | string | { label: string; value: string; }[];    
  descriptions?: string;
  estimateTime?: string;
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

export interface MessageInterface {
  _id?: string;
  roomId: mongoose.Schema.Types.ObjectId | string;
  messages?: {
    sender: UsersInterface | string;
    content: string;
    readBy?: UsersInterface[] | string[];
    createdAt?: Date;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}


export interface RoomInterface {
  _id: string;
  roomName: string; 
  creator: UsersInterface;
  participants: UsersInterface[]; 
  latestMessage: MessageInterface | string;
}

export interface RoomsFormRequest {
  roomName: string;
  participants: string[] | UsersInterface[] | { label: string; value: string; }[];
}

export interface MessageFormRequest {
  sender: string;
  room: string; 
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}