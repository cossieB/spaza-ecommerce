type Methods = "GET" | "POST" | "PUT" | "DELETE"

export default async function (url: string, method: Methods = "GET", body?: { [key: string]: any }) {
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
    const data = await response.json()

    return data
}