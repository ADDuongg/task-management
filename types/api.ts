import { UsersInterface } from "./data"

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