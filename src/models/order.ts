import { Product } from "./product";
import { User } from "./user";

export interface Order{
    _id: string;
    date: string;
    products: Product[];
    status: string;
    totalPrice: number;
    user: User
}