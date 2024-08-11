import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./index"; // Make sure this points to the correct file
import { Product } from "./../models/product"; // Assuming Product is a TypeScript interface or class

// Define CartItem and CartState interfaces
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

// Initialize the initial state
const initialState: CartState = { items: [], totalPrice: 0, totalItems: 0 };

// Create a slice for cart state management
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((i) => i._id === newItem._id);
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
      const existingItem = state.items.find((i) => i._id === itemId);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((i) => i._id !== itemId);
        } else {
          existingItem.quantity--;
          state.totalPrice -= existingItem.price;
        }
        state.totalItems--;
      }
    },
    replaceCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.totalPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.totalItems = state.items.length;
    },
  },
});

// Define the getItemData function with proper typing
export const getItemData = () => {
  return async (dispatch: Dispatch) => {
    const getCartItems = async (): Promise<CartItem[]> => {
      const response = await axios.get(`http://localhost:4000/cart`);
      return response.data;
    };

    try {
      const data = await getCartItems();
      dispatch(cartActions.replaceCart(data));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };
};

// Define the sendItemData function with proper typing
export const sendItemData = (itemData: Product) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const addProductsToCart = async (itemDataWithQuantity: Product) => {
      if (itemDataWithQuantity?.quantity && itemDataWithQuantity.quantity > 1) {
        const id = itemDataWithQuantity._id;
        return await axios.put(
          `http://localhost:4000/cart/${id}`,
          itemDataWithQuantity
        );
      } else {
        return await axios.post(
          `http://localhost:4000/cart`,
          itemDataWithQuantity
        );
      }
    };

    try {
      const state = getState();
      const existingItem = state.cart?.items
        ? state.cart.items.find((i) => i._id === itemData._id)
        : undefined;

      const itemDataWithQuantity = existingItem
        ? { ...itemData, quantity: (existingItem.quantity || 1) + 1 }
        : { ...itemData, quantity: 1 };

      await addProductsToCart(itemDataWithQuantity);
      dispatch(cartActions.addItem(itemDataWithQuantity as CartItem));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };
};

// Define the removeItemData function with proper typing
export const removeItemData = (product: Product) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const removeFromProductCart = async () => {
      const state = getState();
      const existingItem = state.cart.items.find((i) => i._id === product._id);

      if (existingItem && existingItem.quantity === 1) {
        // DELETE
        return await axios.delete(
          `http://localhost:4000/cart/${product._id}`
        );
      } else if (existingItem) {
        // PUT
        return await axios.put(`http://localhost:4000/cart/${product._id}`, {
          ...product,
          quantity: existingItem.quantity - 1,
        });
      }
    };

    await removeFromProductCart();
    dispatch(cartActions.removeItem(product._id));
  };
};

// Export the actions and the reducer
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
