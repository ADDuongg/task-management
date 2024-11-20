import { atom } from "jotai"
import { TaskInterface } from "@/types"


const mockDataTask: TaskInterface[] = [
    {
        id: '1',
        img: ['https://res.cloudinary.com/dijksrvpg/image/upload/v1728547773/p6qcleaifg6m2f55or9a.jpg'],
        subject: 'Task 1',
        done: '90%',
        startDate: '18/09/2024',
        dueDate: '19/09/2024',
        assignTo: 'duong',
        status: 'doing',
        description: '...',
        taskOwner: 'duong',
        workToDo: ['Understanding the tools in Figma','Understand the basics of making designs','Design a mobile application with figma'],
        userId: ['1'],
        estimateTime: '12h'
    },
]

export const dataTask = atom<TaskInterface[]>(mockDataTask)