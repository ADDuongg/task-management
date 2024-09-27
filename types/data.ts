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
    id: string,
    name: string,
    role: string,
    position: string,
    description: string,
    skills: string,
    date: string,
    avatar: StaticImageData
}