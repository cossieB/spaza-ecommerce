import React, { createContext, useReducer } from "react"
import { CartAction, cartReducer } from "../reducers/cartReducer"

type Skus = {
    sku: string,
    quantity: number,
    price: number
}

const initialState = {
    items: [] as Skus[],
    total: 0
}

export type CartState = typeof initialState

export type CartContextType = {
    cart: CartState,
    cartDispatch: React.Dispatch<CartAction>
}

export const CartContext = createContext<CartContextType | null>(null)

export function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [cart, cartDispatch] = useReducer(cartReducer, initialState)
    return (
        <CartContext.Provider value={{cart, cartDispatch}} >
            {children}
        </CartContext.Provider>
    )
}