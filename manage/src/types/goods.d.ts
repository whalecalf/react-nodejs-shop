import { CategoryType } from "./category";

export interface GoodsQueryType{
    name?: string;
    category?: number;
    current?: number;
    pageSize?: number;
    all?:boolean;
}

export interface GoodsType{
    name:string;
    category:CategoryType;
    pics:array;
    createdAt:number;
    stock:number;
    description:string;
    seller:string;
    _id?:string;
    price:number;
}