import {ApiError} from "../types";

type Methods = "GET" | "POST" | "PUT" | "DELETE"
export default async function <T = any>(url: string, method?: "GET"): Promise<T | ApiError>;
export default async function <T = any>(url: string, method: Exclude<Methods, "GET"> , body?: { [key: string]: any }): Promise<T | ApiError>;
export default async function <T = any>(url: string, method?: Methods, body?: { [key: string]: any }) {
    
    method = method || "GET";
    const obj: RequestInit = {
        method
    }
    if (body) {
        obj.headers = {
            "Content-Type": "application/json"
        }
        obj.body = JSON.stringify(body)
    }
    const response = await fetch(url, obj)
    const data: T | ApiError = await response.json()

    return data
}

