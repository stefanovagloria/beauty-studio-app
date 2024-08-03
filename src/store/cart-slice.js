import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalPrice: 0, totalItems: 0 },
    reducers: {
        addItem(state, action) {
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
        replaceCart(state, action) {
            const cartItems = action.payload;
            state.items = cartItems;
            const sum = cartItems.reduce((acc, value) => {
                return acc + value.price
            }, 0);
            state.totalPrice = sum;
            state.totalItems = cartItems.length;
        }
    }
});

export const getItemData = () => {
    return async (dispatch) => {

        const getCartItems = async () => {
            const response = await axios.get(`http://localhost:4000/cart`);
        }

        try {
            const response = await getCartItems();
            dispatch()
            return response.json();
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const sendItemData = (itemData) => {
    return async (dispatch, getState) => {

        const addProductsToCart = async (itemDataWithQuantity) => {

            if (itemDataWithQuantity.quantity > 1) {
                const id = itemDataWithQuantity._id;
                console.log(id)
                return await axios.put(`http://localhost:4000/cart/${id}`, itemDataWithQuantity);
            } else {
                return await axios.post(`http://localhost:4000/cart`, itemDataWithQuantity);
            }


        }

        try {

            const state = getState();
            const existingItem = state.cart?.items ? state.cart.items.find(i => i._id === itemData._id) : {};

            const itemDataWithQuantity = existingItem ? { ...itemData, quantity: existingItem.quantity + 1 } :
                { ...itemData, quantity: Number(1) };

            await addProductsToCart(itemDataWithQuantity);
            dispatch(cartActions.addItem(itemData));

        } catch (error) {
            throw new Error(error.message);
        }

    }
}

export const removeItemData = (product) =>{
    return async (dispatch) =>{

        const removeFromProductCart = async () =>{
            const state = getState();
            const existingItem = state.cart.items.find(i => i._id === product._id);

            if(existingItem.quantity === 1){
                // DELETE 
                return await axios.delete(`http://localhost:4000/cart/${product._id}`, product._id);
            }else{

                //PUT
                return await axios.put(`http://localhost:4000/cart/${id}`,);

            }
        }

        await removeFromProductCart();

        dispatch(cartActions.removeItem(product._id));
    }
}

export const cartActions = cartSlice.actions;

export default cartSlice;