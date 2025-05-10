import { COLLECT,UNCOLLECT } from "../constants";

export function setCollect(collect){
    return{
        collect,
        type:COLLECT
    }
}

export function removeCollect(id){
    return{
        id,
        type:UNCOLLECT
    }
}