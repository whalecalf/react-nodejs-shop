import { UserType } from ".";

export interface CommentType{
    _id:string;
    user:UserType;
    description:string;
    star:number;
    createdAt:number;
    response:CommentType;
}