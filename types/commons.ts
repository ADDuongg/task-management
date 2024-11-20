export enum RoleEnum {
    ADMIN = 'admin',
    USER = 'user'
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

export enum TaskStatus {
    DOING= 'doing',
    REVIEW= 'reivew',
    OPENTODO= 'open/todo',
}

export enum ProjectStatus {
    OPEN= 'open',
    CLOSE= 'close',
}