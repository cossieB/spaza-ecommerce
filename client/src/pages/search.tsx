import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {Loader} from "../components";
import {SearchSettings} from "../components";
import Tile from "../components/Tile";
import { apiUrl } from "../globalVariables";
import { Game, Gop, Platform } from "../types";

type ApiData = {
    platform: Platform
    gop: Gop
    game: Game
}

export function Search() {
    const [data, setData] = useState<ApiData[]>([])
    const [loading, setLoading] = useState(true);
    const [params] = useSearchParams("s");
    const query = params.get("s")
    useEffect(() => {
        (async function () {
            const response = await fetch(`${apiUrl}/search?s=${query}`)
            const info = await response.json();
            setData(info)
            setLoading(false);
        })()
    }, [query])
    return (
        <div className="container">
            <SearchSettings setData={setData} />
            <Loader isLoading={loading}  >

                <div className="flex-row d-flex flex-wrap" >
                    {data.map(item =>
                        <Tile
                            key={item.gop.sku}
                            img={item.game.cover}
                            link={`/games/${item.game.gameId}/?sku=${item.gop.sku}`}
                            label={item.game.title}
                            details={item.game.summary}
                            logo={item.platform.logo}
                            price={item.gop.price}
                            discount={item.gop.discount}
                            quantity={item.gop.quantity}
                            sku={item.gop.sku}
                        />
                    )}
                    {data.length == 0 && <div className="fs-1 text bg-danger">Nothing to see here...</div>}
                </div>
            </Loader>
        </div >
    )
}