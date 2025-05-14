import { UserQueryType, UserType } from "@/types/";
import request from "@/utils/request";
import qs from "qs"

export async function getUserList(params?:UserQueryType) {
   return request.get(`/api/users?${qs.stringify(params)}`)
}

export async function userAdd(params:UserType) {
   return request.post("/api/users", params)
} 

export async function getUserDetails(id:string) {
   return request.get(`/api/users/${id}`)
}

export async function userDelete(id:string) {
    return request.delete(`/api/users/${id}`)
}

export async function userUpdate(id:string,params:UserType) {
   return request.put(`/api/users/${id}`,params)
}

export async function login(params: Pick<UserType, "name" | "password">) {
   return request.post("/api/users/login", params);
}

export async function logout() {
   return request.get("/api/users/logout");
}
