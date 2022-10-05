import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../globalVariables";
import { useFetch } from "../hooks";
import { UserContext } from "../types"
import sendData from "../utils/sendData";
import { Loader } from "./Loader";

interface P {
    toReview: {
        sku: string;
        title: string;
        platform: string;
    }
}

interface Data {
    content: string
    rating: number
}

export function Review({ toReview }: P) {
    const { user } = useContext(UserContext)!
    const [rating, setRating] = useState(0)
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true);
        (async function () {
            if (toReview.sku == "") return;
            const response = await fetch(`${apiUrl}/reviews/review/sku/${toReview.sku}`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                setRating(data.rating);
                setContent(data.content);
            }
            else if (response.status == 401) return navigate('/auth?type=login', {
                state: {
                    message: "Your sessions has expired. Please log in again.",
                    redirect: "/purchases"
                }
            })
            else {
                setRating(0);
                setContent("");
            }
            setLoading(false)
        })()
    }, [toReview.sku])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (rating == 0) return;
        const response = await fetch(`${apiUrl}/reviews/rate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`
            },
            body: JSON.stringify({
                sku: toReview.sku,
                rating,
                review: content
            })
        })
        let feedback = {
            message: "",
            className: ""
        }
        if (response.status >= 500) {
            feedback.message = "Something went wrong"
            feedback.className = "bg-danger"
        }
        else if (response.status == 401) return navigate('/auth?type=login', {
            state: {
                message: "Your sessions has expired. Please log in again.",
                redirect: "/purchases"
            }
        })
        else if (response.status >= 400) {
            feedback.message = (await response.json()).errors[0]
        }
        else if (response.ok) {
            feedback.message = "Review successfully posted"
            feedback.className = "bg-success"
        }
        const feedbackDiv = document.getElementById('reviewFeedback') as HTMLDivElement
        feedbackDiv.className = feedback.className + " text-white"
        feedbackDiv.innerText = feedback.message
        setTimeout(() => {
            feedbackDiv.className = ""
            feedbackDiv.innerText = ""
        }, 2500)
    }
    return (
        <div className="offcanvas offcanvas-start text-dark" data-bs-backdrop="static" tabIndex={-1} id="staticBackdrop" aria-labelledby="staticBackdropLabel">
            <Loader isLoading={loading} >
                <>
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="staticBackdropLabel"> {toReview.title} </h5>
                        <small> {toReview.platform} </small>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <form onSubmit={handleSubmit}>
                            {[...Array(5)].map((_v, i) => i + 1).map(elem => <Star key={elem} rating={rating} value={elem} setRating={setRating} />)}
                            <div>
                                <label htmlFor="reviewText">Review</label>
                                <textarea className="form-control" name="reviewText" id="reviewText" value={content} onChange={e => setContent(e.target.value)} rows={10} maxLength={200} />
                            </div>
                            <div>
                                <label htmlFor="reviewName">Name</label>
                                <input type="text" className="form-control" readOnly value={user?.displayName} />
                            </div>
                            <div id="reviewFeedback" />
                            <button className="btn btn-success" disabled={rating == 0} type="submit">
                                {rating ? "Submit" : "Please give a rating"}
                            </button>
                        </form>
                    </div>
                </>
            </Loader>
        </div>
    )
}

interface P1 {
    rating: number,
    value: number,
    setRating: React.Dispatch<React.SetStateAction<number>>
}

function Star({ rating, value, setRating }: P1) {
    function rate() {
        setRating(value)
    }
    return (
        rating < value ? <i onClick={rate} className="fs-1 text bi bi-star" /> : <i onClick={rate} className="fs-1 text bi bi-star-fill text-warning" />
    )
}