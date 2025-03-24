import { LoaderFunction } from "@remix-run/node";
import { Product } from "~/models";

const products: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    imageUrl: "https://picsum.photos/150/150?random=1",
  },
  {
    id: "2",
    name: "Product 2",
    price: 200,
    imageUrl: "https://picsum.photos/150/150?random=2",
  },
  {
    id: "3",
    name: "Product 3",
    price: 300,
    imageUrl: "https://picsum.photos/150/150?random=3",
  },
  {
    id: "4",
    name: "Product 4",
    price: 400,
    imageUrl: "https://picsum.photos/150/150?random=4",
  },
  {
    id: "5",
    name: "Product 5",
    price: 500,
    imageUrl: "https://picsum.photos/150/150?random=5",
  },
  {
    id: "6",
    name: "Product 6",
    price: 600,
    imageUrl: "https://picsum.photos/150/150?random=6",
  },
  {
    id: "7",
    name: "Product 7",
    price: 700,
    imageUrl: "https://picsum.photos/150/150?random=7",
  },
  {
    id: "8",
    name: "Product 8",
    price: 800,
    imageUrl: "https://picsum.photos/150/150?random=8",
  },
  {
    id: "9",
    name: "Product 9",
    price: 900,
    imageUrl: "https://picsum.photos/150/150?random=9",
  },
  {
    id: "10",
    name: "Product 10",
    price: 1000,
    imageUrl: "https://picsum.photos/150/150?random=10",
  },
];
export const loader: LoaderFunction = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2500)); // Simular retraso de 1 segundo
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
};
