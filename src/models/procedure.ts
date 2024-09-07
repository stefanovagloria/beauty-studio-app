export interface Characteristic {
  key: string;
  value: string;
}

export interface Procedure {
  _id: string;
  category: string;
  characteristics: Characteristic[];
  description: string;
  name: string;
  photos: string[] | File;
  price: number | string;
  promoPrice?: number | string;
  relatedProducts: Procedure[];
  quantity?: number;
}
