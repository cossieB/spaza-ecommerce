import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Game, UserContext } from "../types";
import { CartContext, Searchbar, SearchedGames } from "./";

export function Nav() {
    const [games, setGames] = useState<Game[]>([])
    const { user, setUser } = useContext(UserContext)!
    const { cart } = useContext(CartContext)!
    return (
        <>
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark position-sticky" style={{ zIndex: 99 }}>
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
                            {user ?
                                <li className="nav-item dropdown" >
                                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">{user.displayName}</a>
                                    <ul className="dropdown-menu" style={{ zIndex: 99 }}>
                                        <li><Link className="dropdown-item" to={''}>Purchases</Link></li>
                                        <li><Link className="dropdown-item" to={''}>Reviews</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <div className="btn btn-danger"
                                                onClick={() => {
                                                    setUser(null);
                                                    localStorage.removeItem('user');
                                                }}>
                                                Logout
                                            </div>
                                        </li>
                                    </ul>
                                </li> :
                                <li className="nav-item">
                                    <Link to={'/auth'} className="nav-link">Login</Link>
                                </li>
                            }
                            {user &&
                                <li className="nav-item"  >
                                    <Link className="nav-link" to={'/cart'}>Cart
                                        <span className="badge bg-primary rounded-pill">{cart.items.reduce((prev , item) => item.quantity + prev, 0)}</span>
                                    </Link>

                                </li>
                            }
                        </ul>
                        <Searchbar setGames={setGames} />
                    </div>
                </div>
            </nav>
            <SearchedGames games={games} setGames={setGames} />
        </>
    )
}
