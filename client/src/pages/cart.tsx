import { useContext } from "react"
import { CartContext } from "../components"

export function Cart() {
    const { cart, cartDispatch } = useContext(CartContext)!
    
    return (
        <div className="container shadow-lg" >
            {cart.items.length == 0 ?
                <div className="fs-1 text">You have nothing in your cart</div> :
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th className="col-6">Game</th>
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
                        <tr className="border-top">
                            <td>Total</td>
                            <td></td>
                            <td>{cart.total()}</td>
                            <td >
                                <span className="btn btn-success">Checkout</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            }
        </div>
    )
}