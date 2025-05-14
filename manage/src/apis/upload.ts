import request from "@/utils/request";

export async function Upload(params?:any) {
    return request.post("/api/upload", params)
 } 

