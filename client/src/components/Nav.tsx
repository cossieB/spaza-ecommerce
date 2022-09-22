import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../globalVariables";
import { Game } from "../types";
import debounce from "../utils/debounce";
import sendData from "../utils/sendData";

export default function Nav() {
    const [games, setGames] = useState<Game[]>([])
    const navigator = useNavigate()
    const search = debounce(async (text: any) => {
        if (text == "") return;
        const data = await sendData(`${apiUrl}/search/autocomplete?text=${text}`)
        setGames(data)
    })

    return (
        <>
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark position-sticky">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={''}><i className="bi bi-joystick"></i></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={''}>Link</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to={''} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to={''}>Action</Link></li>
                                    <li><Link className="dropdown-item" to={''}>Another action</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="http://cossie-91.web.app" rel="noreferrer" target="_blank" >About Me</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to={''} className="nav-link disabled">Disabled</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={e => {
                            e.preventDefault();
                            const {value} = (document.getElementById('searchInput') as HTMLInputElement);
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
                    </div>
                </div>
            </nav>
            {(games.length > 0) &&
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
            }
        </>
    )
}
