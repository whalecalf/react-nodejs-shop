import { LogsQueryType, LogsType } from "@/types/";
import request from "@/utils/request";
import qs from "qs"

export async function getLogsList(params?:LogsQueryType) {
   return request.get(`/api/logs?${qs.stringify(params)}`)
}

export async function logsAdd(params:LogsType) {
   return request.post("/api/logs", params)
} 

export async function logsDelete(id:string) {
   return request.delete(`/api/logs/${id}`)
}

export async function getLogsDetails(id:string) {
   return request.get(`/api/logs/${id}`)
}

export async function logsUpdate(id:string,params:LogsType) {
   return request.put(`/api/logs/${id}`, params)
}