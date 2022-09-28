import { CartState } from "../components";

export type CartAction = {
    type: 'INCREMENT_ITEM' | 'DECREMENT_ITEM',
    payload: {
        sku: string,
        image: string,
        price: number
    }
}

export function cartReducer(state: CartState, action: CartAction): CartState {
    console.log(state)
    switch (action.type) {

        case 'INCREMENT_ITEM':
            let existingItem = state.items.find(item => item.sku == action.payload.sku)
            if (!existingItem) {
                const newItem: CartState["items"][number] = { ...action.payload, quantity: 1 }
                return { ...state, items: [...state.items, newItem] }
            }
            const newItem = { ...existingItem, quantity: existingItem.quantity + 1 }
            return { ...state, items: state.items.filter(i => i.sku != existingItem!.sku).concat([newItem]) }

        case 'DECREMENT_ITEM': 
            const item = state.items.find(item => item.sku == action.payload.sku);
            if (!item) throw new Error("Item not in state")
            if (item.quantity == 1) {
                return { ...state, items: state.items.filter(i => i.sku != item.sku) }
            }
            else if (item.quantity > 1) {
                const adjustedItem: CartState["items"][number] = {...item, quantity: item.quantity - 1};
                return { ...state, items: state.items.filter(i => i.sku != item!.sku).concat([adjustedItem]) }
            }
            else throw new Error("Negative quantity")
            
        default:
            throw new Error("Unimplemented action")
    }

}