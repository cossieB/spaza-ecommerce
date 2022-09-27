import React, { useState, useEffect } from "react";
import ApiError from "../utils/ApiError";

type FetchError = {errors: string[]}

export function useFetch<T  = any >(
    url: string, 
    setLoading: React.Dispatch<React.SetStateAction<boolean>> ,
    setError?: React.Dispatch<React.SetStateAction<number>>,
    dependencyArray: React.DependencyList = [] ): T  | undefined {
    const [data, setData] = useState<T>()
    useEffect(() => {
        getData<T>(url, setLoading)
            .then(res => setData(res))
            .catch(e => {
                
                setError && setError(e.code)
            })
    }, dependencyArray)
    return data
}

export async function getData<T = any>( url: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<T  | undefined> {
    try {
        const response = await fetch(url, {
            headers: {
                "accept": "application/json"
            }
        }); 
        const data = await response.json();
        if (response.status >= 400) {
            throw new ApiError(data.error || data.message, response.status)
        }
        return data as T
    } 
    catch (error) {
        console.log(error)
        throw error
    }
    finally {
        setLoading(false)
    }
}