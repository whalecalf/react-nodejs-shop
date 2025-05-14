import {StoreQueryType, StoreType } from "@/types/";
import request from "@/utils/request";
import qs from "qs";

export async function getStoreList(params?:StoreQueryType) {
    return request.get(`/api/store?${qs.stringify(params)}`)
 }

export async function storeAdd(params?:StoreType) {
   return request.post("/api/store", params)
} 

export async function getStoreDetails(id:string) {
   return request.get(`/api/store/${id}`)
}

export async function storeDelete(id:string) {
    return request.delete(`/api/store/${id}`)
}

export async function storeUpdate(id:string,params:StoreType) {
   return request.put(`/api/store/${id}`,params)
}

