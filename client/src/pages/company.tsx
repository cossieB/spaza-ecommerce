import { useState } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../components"
import Tile from "../components/Tile"
import { apiUrl } from "../globalVariables"
import { useFetch } from "../hooks"
import { Developer, Game, Gop, Platform, Publisher } from "../types"

type Mapper = {
    'dev': Developer
    'pub': Publisher
}

type P = {
    type: keyof Mapper
}

export function Company({ type }: P) {
    const { id } = useParams()
    const url = type == 'dev' ? `${apiUrl}/developers/${id}` : `${apiUrl}/publishers/${id}`;
    const [loading, setLoading] = useState(true)

    type Data = {
        item: Mapper[typeof type]
        games: {
            game: Game
            platform: Platform
            gop: Gop
        }[]
    }
    const response = useFetch<Data>(url, setLoading, [type, id])

    return (
        <div className="container shadow-lg">
            <Loader isLoading={loading}>
                <>
                    <div className="card mb-3 text-dark">
                        <img src={response?.item.logo} className="card-img-top" alt={response?.item.name} />
                        <div className="card-body">
                            <h5 className="card-title"> {response?.item.name} </h5>
                            <div className="card-text" dangerouslySetInnerHTML={{ __html: response?.item.summary || "" }} />
                            <p className="card-text" />
                        </div>
                    </div>
                    <div className="flex-row d-flex flex-wrap" >

                        {response?.games.map(item =>
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
                                platform={item.platform.name}
                            />
                        )}
                    </div>
                </>
            </Loader>
        </div>
    )
}