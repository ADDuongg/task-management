'use client'
import { atom } from "jotai"
import { TaskInterface, TaskStatus } from "@/types"


const mockDataTask: TaskInterface[] = [
    {
        _id: '1',
        subject: 'Task 1',
        done: 90,
        startDate: '18/09/2024',
        dueDate: '19/09/2024',
        assignTo: 'duong',
        status: TaskStatus.OPENTODO,
        descriptions: '...',
        taskOwner: 'duong',
        workToDo: ['Understanding the tools in Figma','Understand the basics of making designs','Design a mobile application with figma'],
        estimateTime: '12h'
    },
]

export const dataTask = atom<TaskInterface[]>(mockDataTask)