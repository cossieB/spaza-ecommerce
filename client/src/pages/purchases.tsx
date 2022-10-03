import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartHover } from ".";
import { CartHoverComponent, Loader, Toast } from "../components";
import { apiUrl } from "../globalVariables";
import { Game, Gop, Platform, Purchase, UserContext } from "../types";
import { formatDate } from "../utils/formatDate";
import { logout } from "../utils/loginout";

type Data = {
    purchase: Purchase
    game: Game
    gop: Gop
    platform: Platform
}

export function Purchases() {
    const location = useLocation()
    const [isLoading, setLoading] = useState(true)
    const { user, setUser } = useContext(UserContext)!
    const [purchases, setPurchases] = useState<Data[]>([])
    const navigate = useNavigate()
    const [mousedOver, setMousedOver] = useState<CartHover>()

    useEffect(() => {
        (async function () {
            if (!user) return navigate("/auth", {
                state: {
                    message: "Please log in to view your purchases.",
                    redirect: "/purchases"
                }
            })
            const response = await fetch(`${apiUrl}/auth/purchases`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })
            if (response.status == 401) {
                logout(setUser)
                navigate('/auth?type=login', {
                    state: {
                        message: "Your session has expired please login.",
                        redirect: "/purchases"
                    }
                })
            }
            const data = await response.json()
            setPurchases(data)
            setLoading(false)
        })()
    }, [])

    return (
        <div className="container shadow-lg" >
            <>
                {location.state && <Toast>{(location.state as Record<string, any>)?.message} </Toast>}
                <Loader isLoading={isLoading} >
                    <>
                        {purchases.length == 0 ?
                            <div className="fs-1 text">You have no purchases</div> :
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th className="col-3">Game</th>
                                        <th className="col-1">Platform</th>
                                        <th className="col-1">Price</th>
                                        <th className="col-1">Qty</th>
                                        <th className="col-3">Date</th>
                                        <th className="col-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchases.map(item =>
                                        <tr key={item.gop.sku} id={item.gop.sku} >
                                            <td
                                                onMouseOver={e => setMousedOver({ e, img: item.game.cover })}
                                                onMouseOut={() => setMousedOver(undefined)}>
                                                {item.game.title}
                                            </td>
                                            <td>
                                                {item.platform.name}
                                            </td>
                                            <td>
                                                {item.purchase.price.toFixed(2)}
                                            </td>
                                            <td>
                                                {item.purchase.quantity}
                                            </td>
                                            <td>
                                                {formatDate(item.purchase.date)}
                                            </td>
                                            <td>
                                                <div className="btn-group">
                                                    <Link className="btn btn-secondary" to={`/games/${item.game.gameId}?sku=${item.purchase.sku}`} >
                                                        Review &nbsp;
                                                        <i className="bi bi-pencil-square" title="Review" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        }
                        {mousedOver && <CartHoverComponent hover={mousedOver} />}
                    </>
                </Loader>
            </>
        </div >
    )
}