import { LogtimeInterface, MessageInterface, ProjectInterface, RoomInterface, TaskInterface, UsersInterface } from "./data"

export interface ApiResponse{
    status: number,
    error: string,
    message: string
}

export interface AuthResponse extends ApiResponse {
    token: string
}

export interface Pagination{
    currentPage: number,
    pageSize: number,
    totalPages: number,
    totalRecords: number,
}

export interface UsersResponse {
    users: UsersInterface[]
    pagination?: Pagination
}

export interface deleteApiResponse {
    message: string
}

export interface LoginResponse {
    token: string
    user: UsersInterface
}

export interface TasksResponse {
    tasks: TaskInterface[]
    pagination?: Pagination
}

export interface ProjectsResponse {
    projects: ProjectInterface[]
    pagination?: Pagination
}

export interface RoomsResponse {
    rooms: RoomInterface[]
}

export interface MessageResponse {
    messageResponse: MessageInterface[]
}

export interface LogtimeResponse {
    logtime: LogtimeInterface[]
    pagination?: Pagination
}