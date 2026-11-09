import Link from "next/link";
import { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  return <Link href={`/products/${product.slug}`} className="card group overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
    <div className="aspect-[4/3] overflow-hidden bg-stone-100"><img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/></div>
    <div className="p-4"><p className="mb-2 text-xs text-stone-400">{product.category}</p><h3 className="mb-4 font-bold">{product.name}</h3><div className="flex items-center justify-between"><span className="font-bold">{formatPrice(product.price)}</span><span className="text-xs text-stone-500">مشاهده ←</span></div></div>
  </Link>;
}
