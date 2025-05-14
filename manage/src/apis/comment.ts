import { CommentType } from "@/types/comment";
import request from "@/utils/request";
import qs from "qs"

// export async function getCommentList(params?:CommentQueryType) {
//    return request.get(`/api/comments?${qs.stringify(params)}`)
// }

export async function commentAdd(params?:Partial<CommentType>) {
   return request.post("/api/comment", params)
} 

export async function commentDelete(id:string) {
   return request.delete(`/api/comment/${id}`)
}

export async function getCommentDetails(id:string) {
   return request.get(`/api/comment/${id}`)
}

export async function CommentUpdate(id:string,params:Partial<CommentType>) {
   return request.put(`/api/comment/${id}`, params)
}