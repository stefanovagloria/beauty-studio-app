export class Product {
    _id: string;
    name: string;
    price: number;
    promoPrice?: number; // Optional property
    photos: string[]; // Assuming photos are an array of strings (URLs)
    characteristics: Record<string, any>[]; // Array of objects with key-value pairs
    description: string;
    relatedProducts: Product[]; // Assuming related products are of the same type
    quantity?: number; // Optional for CartItem purposes
  
    constructor(
      _id: string,
      name: string,
      price: number,
      photos: string[],
      characteristics: Record<string, any>[],
      description: string,
      relatedProducts: Product[],
      promoPrice?: number,
      quantity?: number
    ) {
      this._id = _id;
      this.name = name;
      this.price = price;
      this.promoPrice = promoPrice;
      this.photos = photos;
      this.characteristics = characteristics;
      this.description = description;
      this.relatedProducts = relatedProducts;
      this.quantity = quantity;
    }
  }
  