import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../globalVariables";
import { UserContext } from "../types"
import sendData from "../utils/sendData";

interface P {
    toReview: {
        sku: string;
        title: string;
        platform: string;
    }    
}

export function Review({toReview}: P) {
    const {user} = useContext(UserContext)!
    const [rating, setRating] = useState(0)
    const navigate = useNavigate()
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (rating == 0) return;
        const response = await fetch(`${apiUrl}/auth/rate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`
            },
            body: JSON.stringify({
                sku: toReview.sku,
                rating,
                review: (document.getElementById('reviewText') as HTMLTextAreaElement).value || ""
            })
        })
        if (response.status == 401 ) return navigate('/auth?type=login', {state: {
            message: "Your sessions has expired. Please log in again.",
            redirect: "/purchases"
        }})

    }
    return (
        <div className="offcanvas offcanvas-start text-dark" data-bs-backdrop="static" tabIndex={-1} id="staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="staticBackdropLabel"> {toReview.title} </h5>
                <small> {toReview.platform} </small> 
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <form onSubmit={handleSubmit}>
                    { [...Array(5)].map((_v, i) => i+1).map(elem => <Star rating={rating} value={elem} setRating={setRating}  />) }
                    <div>
                        <label htmlFor="reviewText">Review</label>
                        <textarea className="form-control" name="reviewText" id="reviewText" rows={10} maxLength={200} />
                    </div>
                    <div>
                        <label htmlFor="reviewName">Name</label>
                        <input type="text" className="form-control" readOnly value={user?.displayName} />
                    </div>
                    <button className="btn btn-success" disabled={rating == 0}>
                        { rating ? "Submit" : "Please give a rating" }
                    </button>
                </form>
            </div>
        </div>
    )
}

interface P1 {
    rating: number, 
    value: number,
    setRating: React.Dispatch<React.SetStateAction<number>>
}

function Star({rating, value, setRating}: P1) {
    function rate() {
        setRating(value)
    }
    return (
        rating < value ? <i onClick={rate} className="fs-1 text bi bi-star"/> : <i onClick={rate} className="fs-1 text bi bi-star-fill text-warning"/>
    )
}