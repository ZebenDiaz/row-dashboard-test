export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface Row {
  id: string;
  name: string;
  products: Product[];
  alignment: "left" | "center" | "right";
}

export interface Template {
  id: string;
  name: string;
  description: string;
}
