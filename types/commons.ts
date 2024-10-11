export enum RoleEnum {
    admin = 'admin',
    user = 'user'
}

export enum SortEnum {
    ASC = 'asc',
    DESC = 'desc'
}


export interface filterInterface {
    column: string,
    value: string
}

export interface sortInterface {
    column: string,
    order: SortEnum
}

export enum ActionData {
    CREATE= 'create',
    UPDATE= 'update',
    VIEW= 'view'
}