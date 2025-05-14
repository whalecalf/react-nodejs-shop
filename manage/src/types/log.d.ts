import { UserType } from ".";

export interface LogsQueryType{
    user?: string;
    type?: string;
    current?: number;
    pageSize?: number;
    all?:boolean;
}

export interface LogsType{
    name:string;
    type?: string;
    user?: UserType;
    time:number;
    description:string;
    address:string;
    _id?:string;
}