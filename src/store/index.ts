import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import { useDispatch } from "react-redux";

// Create the Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Export the RootState and AppDispatch types for use throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
