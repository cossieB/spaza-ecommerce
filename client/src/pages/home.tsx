import { useEffect, useState } from "react"
import {Loader} from "../components";
import Tile from "../components/Tile"
import { apiUrl } from "../globalVariables";
import { useFetch } from "../hooks";
import { Game, Gop } from "../types";
import { Platform } from "../types/Platform";

type Data = {
    game: Game
    platform: Platform
    gop: Gop
}

export function Home() {
    const [loading, setLoading] = useState(true);
    const response = useFetch<Data[]>(`${apiUrl}/products?limit=12`, setLoading)
    return (
        <div className="container shadow-lg" >
            <h1>Spaza Game Store</h1>
            <h2> Games </h2>
            <Loader isLoading={loading}>
                <div>
                    {(Array.isArray(response)) && (
                        <div className="flex-row d-flex flex-wrap" >
                            {response.map(item =>
                                <Tile
                                    img={item.game.cover}
                                    link={`/games/${item.game.gameId}/?sku=${item.gop.sku}`}
                                    label={item.game.title}
                                    key={item.gop.sku}
                                    details={item.game.summary}
                                    logo={item.platform.logo}
                                    price={item.gop.price}
                                    discount={item.gop.discount}
                                    quantity={item.gop.quantity}
                                    sku={item.gop.sku}
                                />)}
                        </div>
                    )}
                </div>
            </Loader>
            <h2> Developers </h2>

            <h2>Publishers</h2>
        </div>
    )
}