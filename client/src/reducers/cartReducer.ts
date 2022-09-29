import { CartItem, CartState } from "../components";

export type CartAction = {
    type: 'INCREMENT_ITEM',
    payload: {
        sku: string,
        image: string,
        price: number,
        game: string
    }
} | {
    type: 'DECREMENT_ITEM' | 'REMOVE_ITEM',
    payload: string
}

export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {

        case 'INCREMENT_ITEM':
            const index = state.items.findIndex(item => item.sku == action.payload.sku)
            if (index == -1) {
                const newItem: CartState["items"][number] = { ...action.payload, quantity: 1 }
                return { ...state, items: [...state.items, newItem] }
            }
            else {
                const existingItem = state.items[index]

                const newArray = state.items.reduce((prev, a) => {
                    if (a.sku == existingItem.sku) return prev.concat({ ...a, quantity: existingItem.quantity + 1 })
                    else return prev.concat(a)
                }, [] as CartItem[])
                return { ...state, items: newArray }
            }

        case 'DECREMENT_ITEM':
            const item = state.items.find(item => item.sku == action.payload);
            if (!item) throw new Error("Item not in state")
            if (item.quantity == 1) {
                return { ...state, items: state.items.filter(i => i.sku != item.sku) }
            }
            else if (item.quantity > 1) {
                const newArray = state.items.reduce((prev, a) => {
                    if (a.sku == item.sku) return prev.concat({ ...a, quantity: item.quantity - 1 })
                    else return prev.concat(a)
                }, [] as CartItem[])
                return { ...state, items: newArray }
            }
            else throw new Error("Negative quantity")

        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(i => i.sku != action.payload) }
        default:
            throw new Error("Unimplemented action")
    }

}
