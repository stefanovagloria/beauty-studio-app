import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalPrice: 0, totalItems: 0 },
    reducers: {
        additem(state, action) {
            const newItem = action.payload;

            const existingItem = state.items.find(i => i._id === newItem._id);
            if (existingItem) {
                const itemIndex = state.items.findIndex(i => i._id === newItem._id);
                state.items[itemIndex].quantity++;
                state.totalPrice += newItem.price;
                state.totalItems++;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
                state.totalPrice += newItem.price;
                state.totalItems++;
            }


        },
        removeItem(state, action) {
            const itemId = action.payload;
            const existingItem = state.items.find(i => i._id === itemId);

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(i => i._id !== itemId);
                state.totalItems--;
            } else {
                const itemIndex = state.items.findIndex(i => i._id === itemId);
                state.items[itemIndex].quantity--;
                state.totalPrice -= existingItem.price;
                state.totalItems--;
            }
        },
    }
});

const sendItemData = (itemData) => {
    return (dispatch) => {

        

        dispatch(cartActions.additem(itemData));
    }
}

export const cartActions = cartSlice.actions;

export default cartSlice;