"use client";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";

type Props = { product: { id: string; name: string; price: number; image: string; slug: string } };
export default function AddToCart({ product }: Props) {
  const { add } = useCart();
  return <button onClick={() => add(product)} className="btn-primary w-full"><ShoppingCart size={17}/> افزودن به سبد خرید</button>;
}
