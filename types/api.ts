
export interface apiResponse{
    status: number,
    error: string,
    message: string
}

export interface authResponse extends apiResponse {
    token: string
}