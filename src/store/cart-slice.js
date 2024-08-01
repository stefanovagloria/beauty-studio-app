import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalPrice: 0 },
    reducers: {
        additem(state, action) {
            const newItem = action.payload;

            const existingItem = state.items.find(i => i.id === newItem.id);
            if (existingItem) {
                const itemIndex = state.items.findIndex(i => i.id === newItem.id);
                state.items[itemIndex].quantity++;
                state.totalPrice += newItem.price;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
                state.totalPrice += newItem.price;
            }


        },
        removeItem(state, payload) {
            const itemId = payload.id;
            const existingItem = state.items.find(i => i.id === itemId);

            if(existingItem.quantity === 1){
                state.items = state.items.filter(i => i.id !== itemId);
            }else{
                const itemIndex = state.items.findIndex(i => i.id === itemId);
                state.items[itemIndex].quantity--;
                state.totalPrice -= existingItem.price;
            }
         }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice;