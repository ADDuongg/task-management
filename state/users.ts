import { atom } from "jotai"
import user from '@/assets/images/user.png'
import { UsersInterface } from "@/types"


const mockDataUsers: UsersInterface[] = [
    {
        id: '1',
        avatar: user,
        name: 'Task 1',
        description: "Hi, I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web . . .",
        date: '23/02/2002',
        position: 'Senior Web Developer',
        role: 'Leader',
        skills: 'ReactJS'
    },
    {
        id: '1',
        avatar: user,
        name: 'Task 1',
        description: "Hi, I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web . . .",
        date: '23/02/2002',
        position: 'Senior Web Developer',
        role: 'Leader',
        skills: 'ReactJS'
    },
    {
        id: '1',
        avatar: user,
        name: 'Task 1',
        description: "Hi, I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web . . .",
        date: '23/02/2002',
        position: 'Senior Web Developer',
        role: 'Leader',
        skills: 'ReactJS'
    },
    {
        id: '1',
        avatar: user,
        name: 'Task 1',
        description: '...',
        date: '23/02/2002',
        position: 'Senior Web Developer',
        role: 'Leader',
        skills: 'ReactJS'
    },
    {
        id: '1',
        avatar: user,
        name: 'Task 1',
        description: '...',
        date: '23/02/2002',
        position: 'Senior Web Developer',
        role: 'Leader',
        skills: 'ReactJS'
    },
   
]

export const dataUsers = atom<UsersInterface[]>(mockDataUsers)