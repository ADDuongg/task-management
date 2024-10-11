import { StaticImageData } from "next/image";
import { RoleEnum, SortEnum } from "./commons";
import { RcFile } from "antd/lib/upload";

export interface TaskInterface {
    id: string;
    img: StaticImageData;
    name: string;
    done: string;
    startDate: string;
    dueDate: string;
    assignTo: string;
    reviewer: string;
    status: string;
    description: string;
    workToDo?: string[];
    taskOwner: string;
}

export interface UsersInterface {
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
    avatar?: string;
    date?: string;
    createdAt?: Date;
    updatedAt?: Date;
    confirm_password?: string;
}
export interface filterInterface {
  field: keyof UsersInterface,
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

