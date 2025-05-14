import { UserType,GoodsType } from ".";

export interface CartType{
    user: UserType;
    goods:GoodsType;
    num:number;
    isBuy:boolean;
    
}