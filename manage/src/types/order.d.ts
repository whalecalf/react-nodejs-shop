import { CartType, GoodsType, UserType, CommentType } from ".";

export interface OrderQueryType{
    goods?:string;
    status?:string;
    current?:number;
    seller?:string;
    pageSize?:number;
    all?:boolean;
}

export interface OrderType{
    status: string;
    buyer: UserType;
    seller:UserType;
    createdAt:number;
    confirmedAt:number;
    num:number;
    ems:string;
    comment:CommentType;
    goods:GoodsType;
}