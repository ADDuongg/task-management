import { StaticImageData } from "next/image";

export interface TaskInterface {
    id: string,
    img: StaticImageData,
    name: string,
    done: string,
    startDate: string,
    dueDate: string,
    assignTo: string,
    reviewer: string,
    status: string,
    description: string,
    workToDo?: string[],
    taskOwner: string
}

export interface UsersInterface {
    _id:string
  email: string;
  password: string;
  account_role: number;
  specialization?: string;
  position?: string;
  username: string;
  description?: string;
  phone_number?: string;
  skills?: string[];
  avatar?: StaticImageData;
  date?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
