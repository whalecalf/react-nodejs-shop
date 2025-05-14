import { OrderQueryType, OrderType } from "@/types/";
import request from "@/utils/request";
import qs from "qs"

export async function getOrderList(params?:OrderQueryType) {
   return request.get(`/api/orders?${qs.stringify(params)}`)
}

export async function orderAdd(params?:OrderType) {
   return request.post("/api/orders", params)
} 

export async function orderDelete(id:string) {
   return request.delete(`/api/orders/${id}`)
}

export async function getOrderDetails(id:string) {
   return request.get(`/api/orders/${id}`)
}

export async function OrderUpdate(id:string,params:Partial<OrderType>) {
   return request.put(`/api/orders/${id}`, params)
}