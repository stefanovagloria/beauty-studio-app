import { Product } from "./product";

export interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface CartState {
    items: Product[];
    totalPrice: number;
    totalItems: number;
  }