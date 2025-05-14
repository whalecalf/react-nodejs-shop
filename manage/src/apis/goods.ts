import { GoodsQueryType, GoodsType } from "@/types/";
import request from "@/utils/request";
import qs from "qs"

export async function getGoodsList(params?:GoodsQueryType) {
   return request.get(`/api/goods?${qs.stringify(params)}`)
}

export async function goodsAdd(params:GoodsType) {
   return request.post("/api/goods", params)
} 

export async function goodsDelete(id:string) {
   return request.delete(`/api/goods/${id}`)
}

export async function getGoodsDetails(id:string) {
   return request.get(`/api/goods/${id}`)
}

export async function goodsUpdate(id:string,params:GoodsType) {
   return request.put(`/api/goods/${id}`, params)
}