export interface StoreQueryType{
    owner?: string;
    current?: number;
    pageSize?: number;
    all?:boolean;
}

export interface StoreType{
    _id:string;
    name: string;
    status: string;
    capital: number;
    createdAt: number;
    owner: number;
}