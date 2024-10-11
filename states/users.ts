import { atom } from 'jotai'

import { UsersInterface } from '@/types'



export const dataUsers = atom<UsersInterface[]>([])
export const currentUserState = atom<UsersInterface>()
export const userRoleState = atom<string>()
