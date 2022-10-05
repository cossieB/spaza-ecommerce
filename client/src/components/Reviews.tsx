import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { apiUrl } from "../globalVariables"
import { useFetch } from "../hooks"
import { formatDate } from "../utils/formatDate"
import { Loader } from "./Loader"

type Data = {
    user: string
    content: string
    dateCreated: Date,
    dateEdited?: Date,
    rating: 1 | 2 | 3 | 4 | 5
}

export function Reviews() {
    const [loading, setLoading] = useState(true)
    const [query] = useSearchParams()
    const sku = query.get('sku')
    const response = useFetch<Data[]>(`${apiUrl}/reviews/${sku}`, setLoading, undefined, [sku])

    return (
        <Loader isLoading={loading}>
            <div>
                {response?.map(item => <ReviewPost data={item} key={item.user} /> )}
                { response?.length == 0 && <div> This item has no reviews yet. Be the first to review it </div> }
            </div>
        </Loader>
    )
}

function ReviewPost({data}: {data: Data}) {
    const ratingMap = {
        5: <i className="bi bi-5-square-fill" style={{fontSize: '10rem'}} />,
        4: <i className="bi bi-4-square-fill" style={{fontSize: '10rem'}} />,
        3: <i className="bi bi-3-square-fill" style={{fontSize: '10rem'}} />,
        2: <i className="bi bi-2-square-fill" style={{fontSize: '10rem'}} />,
        1: <i className="bi bi-1-square-fill" style={{fontSize: '10rem'}} />,
    }
    return (
        <div className="card mb-3 text-dark" style={{maxWidth: 540}}>
            <div className="row g-0">
                <div className="col-md-4 fs-1 d-flex justify-content-center align-items-center" >
                    { ratingMap[data.rating] }
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title"> {data.user} </h5>
                        <p className="card-text"> {data.content} </p>
                        <p className="card-text"><small className="text-muted"> {formatDate(data.dateCreated)} </small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}