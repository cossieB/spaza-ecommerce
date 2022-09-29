import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiUrl } from "../globalVariables"
import { Game, Gop, Platform } from "../types";
import sendData from "../utils/sendData";
import { useFetch } from "../hooks";

type ApiData = {
    platform: Platform
    gop: Gop
    game: Game
}

interface P {
    setData: React.Dispatch<React.SetStateAction<ApiData[]>>
}

export function SearchSettings({ setData }: P) {
    const [_platformsLoading, setPlatformsLoading] = useState(true);
    const [maxPrice, setMaxPrice] = useState(60)

    const [searchParams] = useSearchParams()
    const s = searchParams.get('s')
    let searhValue = "";
    useEffect(() => {
        (document.getElementById("searchName") as HTMLInputElement).value = s || ""
    }, [s])
    const platforms = useFetch<Platform[]>(`${apiUrl}/platforms`, setPlatformsLoading)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = document.getElementById("filters") as HTMLFormElement
        const fd = new FormData(form);
        const body = {
            text: s || "",
            maxPrice: 60,
            platformFilter: [] as string[]
        }
        fd.forEach((value, key) => {
            if (key == "maxPrice") {
                body.maxPrice = Number(value)
            }
            else if (key == "searchName") {
                body.text = value as string
            }
            else {
                body.platformFilter.push(key)
            }
        })
        if (body.platformFilter.length == 0) {
            const checkboxes = document.querySelectorAll('.form-check-input')
            checkboxes.forEach(box => box.classList.add('is-invalid'));
            (document.querySelector<HTMLDivElement>('.invalid-feedback'))!.style.display = 'block'
            return;
        }
        const response = await sendData(`${apiUrl}/search`, 'POST', body)
        setData(response)
    }
    return (
        <>
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <i className="bi bi-sliders mx-3 fs-5 btn" ></i>
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <form id="filters" onSubmit={handleSubmit} >
                                <label htmlFor="searchName">Search</label>
                                <input
                                    className="form-control"
                                    type="search"
                                    name="searchName"
                                    id="searchName"
                                    defaultValue={s || ""}
                                />
                                <label htmlFor="maxPrice" className="form-label row">
                                    <span className="col">Max Price</span>
                                    <span className="col"> {(document.getElementById("maxPrice") as HTMLInputElement)?.value || 60} </span>
                                </label>
                                <input
                                    name="maxPrice"
                                    type="range"
                                    id="maxPrice"
                                    min={1}
                                    max={100}
                                    className="form-control"
                                    value={maxPrice}
                                    onChange={e => {
                                        setMaxPrice(Number(e.target.value))
                                    }} />
                                {Array.isArray(platforms) && platforms.map(platform =>
                                    <div key={platform.platformId} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={platform.platformId}
                                            id={platform.name + " select"}
                                            name={platform.platformId}
                                            onChange={() => {
                                                const checkboxes = document.querySelectorAll('.form-check-input')
                                                checkboxes.forEach(box => box.classList.remove('is-invalid'));
                                                (document.querySelector<HTMLDivElement>('.invalid-feedback'))!.removeAttribute('style')
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor={platform.name + " select"}>
                                            {platform.name}
                                        </label>
                                    </div>
                                )}
                                <div className="invalid-feedback">
                                    Please select at least one platform
                                </div>
                                <button className="btn btn-primary" type="submit">Go</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}