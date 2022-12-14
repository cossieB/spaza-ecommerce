import { useContext } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { UserContext } from "../types"
import { CartContext } from "./CartContextProvider"

interface P {
    img: string
    label: string
    link: string
    details?: string
    logo: string
    price: number
    discount: number
    quantity: number
    sku: string
    platform: string
}

export default function Tile(props: P) {
    const { img, label, link, logo, price: basePrice, discount, quantity, sku, platform } = props;
    const temp = (1 - discount / 100) * basePrice
    const price = (Math.round(temp * 100) / 100).toFixed(2);
    const { user } = useContext(UserContext)!
    const { cart, cartDispatch } = useContext(CartContext)!
    return (
        <div className="card card-dark mb-3 mx-1 text-bg-secondary shadow" style={{ flex: 1, minWidth: '18rem' }} >
            <img src={img} className="card-img-top h-75" alt={`${label}`} />
            <div className="card-body">
                <h5 className="card-title">{label}</h5>
                <div className="rounded mb-2 py-1 bg-light d-flex justify-content-center align-items-center" style={{ height: '2rem' }}>
                    <img className="h-100 w-100" src={logo} alt="" />
                </div>
                <div className="row">
                    <div className="col-5">
                        <strong><i className="bi bi-currency-dollar"></i>{price}</strong>
                    </div>
                    <div className="col-7">
                        {discount > 0 && (
                            <>
                                <s>{basePrice}</s>&nbsp;
                                <span className="bg-success">{discount}&#37;</span>
                            </>
                        )}
                    </div>
                </div>
                {(quantity < 10) && (<div className="row bg-danger"> {quantity == 0 ? "Out of stock 😢" : `Hurry!!! Only ${quantity} remaining`} </div>)}
            </div>
            <div className="btn-group mb-2">
                <Link className="btn btn-info" to={link} >
                    <i className="bi bi-info"></i>
                    <span>Details</span>
                </Link>
                {user ?
                    <button className="btn btn-success"
                        onClick={() => {
                            cartDispatch({
                                type: 'INCREMENT_ITEM', payload: {
                                    image: img,
                                    price: Number(price),
                                    sku,
                                    game: label,
                                    platform
                                }
                            })
                        }}
                    >
                        <i className="bi bi-cart-plus"></i>
                        <span>
                            &nbsp; Add to cart
                        </span>
                    </button> :
                    <Link to={"/auth"} className="btn btn-success">
                        <i className="bi bi-cart-plus"></i>
                        <span>
                            &nbsp; Login
                        </span>
                    </Link>

                }
            </div>
        </div>
    )
}

export function Info(props: Pick<P, 'price' | 'discount' | 'quantity' | 'logo' | 'sku' | 'img' | 'label' | 'platform'>) {
    const { price: basePrice, discount, quantity, logo, sku, img, label, platform } = props;
    const temp = (1 - discount / 100) * basePrice
    const price = (Math.round(temp * 100) / 100);
    const dollars = Math.floor(price)
    const cents = price - dollars
    const { user } = useContext(UserContext)!
    const { cart, cartDispatch } = useContext(CartContext)!
    return (
        <div className="card card-dark mb-3 mx-1 text-bg-secondary shadow w-100"  >
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-around " style={{ height: '9rem', }}>
                    <div>
                        <strong className="fs-3 text" >
                            <i className="bi bi-currency-dollar" />
                            {dollars}
                        </strong>
                        <sup className="small faded"> {cents.toFixed(2).slice(2)} </sup>
                    </div>
                    {discount > 0 && (
                        <div className="fs-7 text">
                            <s style={{ opacity: 0.7 }}>{basePrice}</s>&nbsp;
                            <span className="bg-success">-{discount}&#37;</span>
                        </div>
                    )}
                </div>
                {(quantity < 10) && (<div className="row bg-danger"> {quantity == 0 ? "Out of stock 😢" : `Hurry!!! Only ${quantity} remaining`} </div>)}
            </div>
            <div className="btn-group mb-2">
                {user ?
                    <button className="btn btn-success"
                        onClick={() => {
                            cartDispatch({
                                type: 'INCREMENT_ITEM', payload: {
                                    image: img,
                                    price: temp,
                                    sku,
                                    game: label,
                                    platform
                                }
                            })
                        }}
                    >
                        <i className="bi bi-cart-plus"></i>
                        <span>
                            &nbsp; Add to cart
                        </span>
                    </button> :
                    <Link to={"/auth"} className="btn btn-success">
                        <i className="bi bi-cart-plus"></i>
                        <span>
                            &nbsp; Login
                        </span>
                    </Link>
                }
            </div>
            <div className="rounded mb-2 py-1 bg-light d-flex justify-content-center align-items-center" style={{ height: '2rem' }}>
                <img className="h-100 w-100" src={logo} alt="" />
            </div>
        </div>
    )
}