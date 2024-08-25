export interface Characteristic {
  key: string;
  value: string;
}

export interface Product {
    _id: string;
    category: string;
    characteristics: Characteristic[];
    description: string;
    name: string;
    photos: (string | File)[]; // Allow both string URLs and File objects
    price: number ;
    promoPrice?: number;  
    relatedProducts: Product[]; // Assuming related products are of the same type
    quantity?: number; // Optional for CartItem purposes
  
  }
  