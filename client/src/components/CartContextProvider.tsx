import React, { createContext, useReducer } from "react"
import { CartAction, cartReducer } from "../reducers/cartReducer"

export type CartItem = {
    sku: string,
    quantity: number,
    price: number,
    image: string,
    game: string,
    platform: string
}

const initialState = {
    items: [] as CartItem[],
    total() {
        const self = this;
        return self.items.reduce((prev, a) => prev + a.quantity * a.price , 0)
        
    } 
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