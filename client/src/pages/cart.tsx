import { useContext } from "react"
import { CartContext } from "../components"
import { apiUrl } from "../globalVariables"
import { UserContext } from "../types"
import sendData from "../utils/sendData"

export function Cart() {
    const { cart, cartDispatch } = useContext(CartContext)!
    const {user} = useContext(UserContext)!
    async function checkout() {
        const {total, ...others} = cart;
        const response = await fetch(`${apiUrl}/auth/purchase`, {
            method: 'POST',
            body: JSON.stringify({...others, total: total.apply(cart)}),
            headers: {
                "Content-Type": "application/json",
                Authorization: `BEARER ${user!.token}`
            }
        })
        
        console.log(response)
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
                            <tr key={item.sku} >
                                <td>
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
                                        }}>Up</span>
                                        <span className="btn btn-warning" onClick={() => {
                                            cartDispatch({ type: 'DECREMENT_ITEM', payload: item.sku })
                                        }}>Down</span>
                                        <span className="btn btn-danger" onClick={() => {
                                            cartDispatch({ type: 'REMOVE_ITEM', payload: item.sku })
                                        }}>Remove</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                        <tr className="table-border">
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td>{cart.total()}</td>
                            <td >
                                <span onClick={checkout} className="btn btn-success">Checkout</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            }
        </div>
    )
}