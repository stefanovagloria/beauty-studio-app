export interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface CartState {
    items: CartItem[];
    totalPrice: number;
    totalItems: number;
  }