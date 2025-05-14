import { CategoryQueryType, CategoryType } from "@/types/";
import request from "@/utils/request";
import qs from "qs"

export async function getCategoryList(params?:CategoryQueryType) {
   return request.get(`/api/categories?${qs.stringify(params)}`)
}

export async function categoryAdd(params:CategoryType) {
   return request.post("/api/categories", params)
} 

export async function categoryDelete(id:string) {
    return request.delete(`/api/categories/${id}`)
}

export async function getCategoryDetails(id:string) {
   return request.get(`/api/categories/${id}`)
}

export async function categoryUpdate(id:string,params:CategoryType) {
   return request.put(`/api/categories/${id}`, params)
}