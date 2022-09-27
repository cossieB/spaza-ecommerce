import { useEffect, useState } from "react"
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom"
import { NotFound, ServerError } from "../components/Errors"
import {Loader} from "../components"
import {OtherSkus} from "../components"
import { Info } from "../components/Tile"
import { apiUrl } from "../globalVariables"
import { Game, Platform, Gop, Developer, Publisher } from "../types"
import { getData } from "../hooks";

type Data = {
    game: Game
    platform: Platform
    gop: Gop
    developer: Developer
    publisher: Publisher
}

export function ProductPage() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(0)
    const { id } = useParams()
    const [query, setQuery] = useSearchParams();
    const sku = query.get('sku')

    const [data, setData] = useState<Data>();
    useEffect(() => {
        (async function() {
            try {
                if (sku != null) {
                    const response = await getData<Data>(`${apiUrl}/products/${sku}`, setLoading)
                    setData(response)
                }
                else {
                    const q1 = await  getData(`${apiUrl}/games/${id}/platforms`, setLoading); 
                    const response = await getData<Data>(`${apiUrl}/products/${q1[0].sku}`, setLoading)
                    setQuery(`sku=${q1[0].sku}`)
                    setData(response)
                }
            } 
            catch (e: any) {
                setError(e.code)    
            }
        })()
    }, [sku])

    function handleClick() {

    }

    return (
        <div className="container shadow-lg" >
            {error >= 500 ? ServerError : error >= 400 ? NotFound :
                <Loader isLoading={loading} >
                    <>
                        <h1 className="col-12" > {data?.game.title} </h1>
                        <div className="row">
                            <Link className="col link-dark" to={`/developers/${data?.game.developerId}`}>{data?.developer.name}</Link>
                            <Link className="col link-dark" to={`/publishers/${data?.game.publisherId}`}>{data?.publisher.name}</Link>
                        </div>
                        <div className="row">
                            {/* Cover image */}
                            {<img src={data?.game.cover} className="img-thumnail col" alt="" />}
                            
                            <div className="col d-flex justify-content-center align-items-center">
                                <Info
                                    discount={data?.gop.discount || 0}
                                    price={data?.gop.price || 0}
                                    quantity={data?.gop.quantity || 0}
                                    logo={data?.platform.logo || ""}
                                />
                            </div>

                            <div className="col">
                                <p>Also available on</p>
                                <OtherSkus platformIdToExclude={data?.platform.platformId || ""} />
                            </div>
                        </div>
                        <div className="">
                            <h2>Description</h2>
                            <p dangerouslySetInnerHTML={{ __html: data?.game.summary || "" }} ></p>
                        </div>
                        <h2>Trailer</h2>
                        <div className="W-100" dangerouslySetInnerHTML={{ __html: data?.game.trailer || "" }} ></div>
                    </>
                </Loader>
            }
        </div >
    )
}