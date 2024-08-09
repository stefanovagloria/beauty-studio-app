import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";

import axios from "axios";
import { RootState } from "./index";

interface CartItem {
  _id: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

const initialState: CartState = { items: [], totalPrice: 0, totalItems: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find(i => i._id === newItem._id);
      if (existingItem) {
        existingItem.quantity++;
        state.totalPrice += newItem.price;
        state.totalItems++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
        state.totalPrice += newItem.price;
        state.totalItems++;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const existingItem = state.items.find(i => i._id === itemId);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(i => i._id !== itemId);
        } else {
          existingItem.quantity--;
          state.totalPrice -= existingItem.price;
        }
        state.totalItems--;
      }
    },
    replaceCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      state.totalItems = state.items.length;
    },
  },
});

export const getItemData = () => {
    return async (dispatch: Dispatch) => {

        const getCartItems = async () => {
            const response = await axios.get(`http://localhost:4000/cart`);
            return response.data;
        }

        try {
            const data = await getCartItems();
            dispatch(cartActions.replaceCart(data))
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message); // Safely access the message property
            } else {
                console.error('An unexpected error occurred');
            }
        }

    }
}

export const sendItemData = (itemData) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {

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
            if (error instanceof Error) {
                console.error(error.message); // Safely access the message property
            } else {
                console.error('An unexpected error occurred');
            }
        }

    }
}

export const removeItemData = (product) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {

        const removeFromProductCart = async () => {
            const state = getState();
            const existingItem = state.cart.items.find(i => i._id === product._id);

            if (existingItem.quantity === 1) {
                // DELETE 
                return await axios.delete(`http://localhost:4000/cart/${product._id}`, product._id);
            } else {

                //PUT
                return await axios.put(`http://localhost:4000/cart/${product._id}`, { ...product, quantity: existingItem.quantity - 1 });

            }
        }

        await removeFromProductCart();

        dispatch(cartActions.removeItem(product._id));
    }
}

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
