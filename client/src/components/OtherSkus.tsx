import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { apiUrl } from "../globalVariables";
import { Platform } from "../types";
import useFetch from "../utils/useFetch";
import Loader from "./Loader";

interface P {
    platformIdToExclude: string
}

type Data = {
    pform: Platform,
    sku: string
}

export default function ({ platformIdToExclude }: P) {
    const {id: gameId} = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(0)
    const [query, setQuery] = useSearchParams();
    const sku = query.get('sku')
    const response = useFetch<Data[]>(`${apiUrl}/games/${gameId}/platforms`, setLoading, setError, [sku])
    return (
        <Loader isLoading={loading}>
            <div>
                {response?.
                filter(item => item.pform.platformId != platformIdToExclude).
                sort((a,b) => {
                    if (a.pform.name > b.pform.name) return 1
                    else return -1
                }).
                map(item => (
                    <div className="bg-light rounded mb-1 d-flex align-items-center px-3 btn" 
                    style={{height: '4rem'}} 
                    onClick={() => {
                        setQuery(`sku=${item.sku}`)
                    }}
                    >
                        <img
                            className="img-fluid h-75"
                            key={item.pform.platformId}
                            src={item.pform.logo} />
                    </div>
                ))}
            </div>
        </Loader>
    )
}