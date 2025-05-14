export interface UserQueryType{
    name?: string;
    status?: number;
    current?: number;
    pageSize?: number;
    role: USER_ROLE;
    all?:boolean;
}

export interface UserType{
    name: string;
    nickName: string;
    password: string;
    _id?: string;
    sex: USER_SEX,
    role: USER_ROLE,
    status: USER_STATUS,
    phone:string;
    address:string;
    avatar:string;
}