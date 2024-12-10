export enum RoleEnum {
    ADMIN = 'admin',
    USER = 'user'
}

export enum SortEnum {
    ASC = 'asc',
    DESC = 'desc'
}

export enum ActionData {
    CREATE= 'create',
    UPDATE= 'update',
    DELETE='delete',
    VIEW= 'view',
    VIEW_LOGTIME= 'view_logtime',
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

export enum EnumActivity {
    DEVELOPMENT= 'Development',
    TRAINING= 'Training',
    BUG_FIX= 'Bug-Fix',
    DESIGN= 'Design',
    TESTING= 'Testing',
    ANALYSIS= 'Analysis',
}