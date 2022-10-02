import { CSSProperties, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../components"
import { apiUrl } from "../globalVariables"
import { UserContext } from "../types"
import { logout } from "../utils/loginout"

type Hover = {
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>
    img: string
}

export function Cart() {
    const { cart, cartDispatch } = useContext(CartContext)!
    const { user, setUser } = useContext(UserContext)!
    const [errors, setErrors] = useState<string[]>([])
    const [mousedOver, setMousedOver] = useState<Hover>()  
    const navigate = useNavigate()

    async function checkout() {
        const { total, ...others } = cart;
        type ApiRes = {
            errors: {
                [sku: string]: string[]
            }
        } | {

        }
        const response = await fetch(`${apiUrl}/auth/purchase`, {
            method: 'POST',
            body: JSON.stringify({ ...others, total: total.apply(cart) }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user!.token}`
            }
        })
        if (response.status == 401) {
            logout(setUser)
            navigate("/auth?type=login", {state: {message: "Your session expired please log in again."}})
        }
        const data: ApiRes = await response.json()

        if ('errors' in data) {
            let errs: string[] = []
            const keys = Object.keys(data.errors)
            keys.forEach(item => {
                errs = [...errs, ...data.errors[item]]
                const elem = document.getElementById(item) as HTMLTableRowElement
                elem.classList.add("table-danger")
                setTimeout(() => {
                    elem.classList.remove("table-danger")
                }, 5000)
            })
            setErrors(errs)
        }
        
    }
    return (
        <div className="container shadow-lg" >
            {cart.items.length == 0 ?
                <div className="fs-1 text">You have nothing in your cart</div> :
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th className="col-3">Game</th>
                            <th className="col-3">Platform</th>
                            <th className="col-1">Price</th>
                            <th className="col-1">Quantity</th>
                            <th className="col-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.items.map(item =>
                            <tr key={item.sku} id={item.sku} >
                                <td 
                                onMouseOver={e => setMousedOver({e, img: item.image})}
                                onMouseOut={() => setMousedOver(undefined)}>
                                    {item.game}
                                </td>
                                <td>
                                    {item.platform}
                                </td>
                                <td>
                                    {item.price.toFixed(2)}
                                </td>
                                <td>
                                    {item.quantity}
                                </td>
                                <td>
                                    <div className="btn-group" >
                                        <span className="btn btn-info" onClick={() => {
                                            cartDispatch({ type: 'INCREMENT_ITEM', payload: item })
                                            setErrors([])
                                        }}>
                                            <i className="bi bi-arrow-up-circle"></i>
                                        </span>
                                        <span className="btn btn-warning" onClick={() => {
                                            cartDispatch({ type: 'DECREMENT_ITEM', payload: item.sku })
                                            setErrors([])
                                        }}>
                                            <i className="bi bi-arrow-down-circle"></i>
                                        </span>
                                        <span className="btn btn-danger" onClick={() => {
                                            cartDispatch({ type: 'REMOVE_ITEM', payload: item.sku })
                                            setErrors([])
                                        }}>
                                            <i className="bi bi-x-circle"></i>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        )}
                        <tr className="table-success">
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td>{cart.total.apply(cart).toFixed(2)}</td>
                            <td >
                                <span onClick={checkout} className="btn btn-success">
                                    <i className="bi bi-cart-check" />
                                    Checkout
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            }
            <div  >
                {errors.map(err => <p className="bg-danger" key={err}>{err}</p>)}
            </div>
            {mousedOver && <HoverComponent hover={mousedOver} />}
        </div>
    )
}

interface P {
    hover: Hover
}
function HoverComponent({hover}: P) {
    const {e, img} = hover 
    const style: CSSProperties = {
        position: 'absolute',
        top: e.clientY + 50,
    }
    return (
        <img style={style} src={img} />
    )
}