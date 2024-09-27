import { atom } from "jotai"
import task from '@/assets/images/task1.png'
import { TaskInterface } from "@/types"


const mockDataTask: TaskInterface[] = [
    {
        id: '1',
        img: task,
        name: 'Task 1',
        done: '90%',
        startDate: '18/09/2024',
        dueDate: '19/09/2024',
        assignTo: 'duong',
        reviewer: 'son',
        status: 'doing',
        description: '...',
        taskOwner: 'duong',
        workToDo: ['Understanding the tools in Figma','Understand the basics of making designs','Design a mobile application with figma']
    },
    {
        id: '1',
        img: task,
        name: 'Task 1',
        done: '90%',
        startDate: '18/09/2024',
        dueDate: '19/09/2024',
        assignTo: 'duong',
        reviewer: 'son',
        status: 'doing',
        description: '...',
        taskOwner: 'duong',
        workToDo: ['Understanding the tools in Figma','Understand the basics of making designs','Design a mobile application with figma']
    },
    {
        id: '1',
        img: task,
        name: 'Task 1',
        done: '90%',
        startDate: '18/09/2024',
        dueDate: '19/09/2024',
        assignTo: 'duong',
        reviewer: 'son',
        status: 'doing',
        description: '...',
        taskOwner: 'duong',
        workToDo: ['Understanding the tools in Figma','Understand the basics of making designs','Design a mobile application with figma']
    },
    {
        id: '1',
        img: task,
        name: 'Task 1',
        done: '90%',
        startDate: '18/09/2024',
        dueDate: '19/09/2024',
        assignTo: 'duong',
        reviewer: 'son',
        status: 'doing',
        description: '...',
        taskOwner: 'duong',
        workToDo: ['Understanding the tools in Figma','Understand the basics of making designs','Design a mobile application with figma']
    },
    {
        id: '1',
        img: task,
        name: 'Task 1',
        done: '90%',
        startDate: '18/09/2024',
        dueDate: '19/09/2024',
        assignTo: 'duong',
        reviewer: 'son',
        status: 'doing',
        description: '...',
        taskOwner: 'duong',
        workToDo: ['Understanding the tools in Figma','Understand the basics of making designs','Design a mobile application with figma']
    },
]

export const dataTask = atom<TaskInterface[]>(mockDataTask)