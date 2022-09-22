import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchSettings from "../components/SearchSettings";
import Tile from "../components/Tile";
import { apiUrl } from "../globalVariables";
import { Game, Gop, Platform } from "../types";
import useFetch from "../utils/useFetch";

type ApiData = {
    platform: Platform
    gop: Gop
    game: Game
}

export default function Search() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<ApiData[]>([])
    const [params] = useSearchParams("s");
    const query = params.get("s")
    useEffect(() => {
        (async function () {
            const response = await fetch(`${apiUrl}/search?s=${query}`)
            const info = await response.json();
            setData(info)
        })()
    }, [params])
    return (
        <div className="container bg-info">
            <SearchSettings setData={setData} />
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
                {data.length == 0 && <div className="fs-7-text">Nothing to see here...</div>  }
            </div>
        </div>
    )
}