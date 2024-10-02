export interface registerInterface {
    username: string,
    phone_number: string,
    email: string,
    password: string,
    confirm_password?: string
}

export interface resetPasswordInterface {
    email: string,
    newPassword?: string
}