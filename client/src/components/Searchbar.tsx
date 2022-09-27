import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../globalVariables";
import { Game } from "../types";
import debounce from "../utils/debounce";
import sendData from "../utils/sendData";

interface Props {
    games: Game[],
    setGames: React.Dispatch<React.SetStateAction<Game[]>>
}



export function Searchbar({setGames}: Pick<Props, 'setGames'>) {
    
    const navigator = useNavigate()
    const search = debounce(async (text: any) => {
        if (text == "") return;
        const data = await sendData(`${apiUrl}/search/autocomplete?text=${text}`)
        setGames(data)
    })
    return (
        <>
            <form className="d-flex" role="search" onSubmit={e => {
                e.preventDefault();
                const { value } = (document.getElementById('searchInput') as HTMLInputElement);
                if (value == "") return;
                setGames([]);
                (document.getElementById('searchInput') as HTMLInputElement).value = ""
                navigator(`/search?s=${value}`)
            }}>
                <input id="searchInput" onChange={(e) => {
                    search(e.target.value)
                    if (e.target.value.length == 0) {
                        setGames([])
                    }
                }} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

        </>
    )
}

export function SearchedGames({games, setGames }: Props) {
    return (
        <div className="position-absolute w-50 text-end end-0 mx-5" style={{ zIndex: 99 }} >
            {games.map(game =>
                <Link key={game.gameId} to={`/games/${game.gameId}`}
                    onClick={() => {
                        setGames([]);
                        (document.getElementById('searchInput') as HTMLInputElement).value = ""
                    }}>
                    <div className="bg-light mb-1 row">
                        <p>{game.title}</p>
                    </div>
                </Link>
            )}
        </div>
    )
}