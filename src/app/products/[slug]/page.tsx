import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import AddToCart from "@/components/AddToCart";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) notFound();
  return <div className="container-site py-12"><div className="grid gap-9 md:grid-cols-2">
    <div className="overflow-hidden rounded-3xl bg-white"><img src={product.image} alt={product.name} className="aspect-square w-full object-cover"/></div>
    <div className="flex flex-col justify-center"><p className="text-sm text-stone-400">{product.category}</p><h1 className="mt-3 text-3xl font-black">{product.name}</h1><p className="mt-6 leading-9 text-stone-600">{product.description}</p><p className="mt-8 text-2xl font-black">{formatPrice(product.price)}</p><p className="mt-3 text-sm text-stone-500">موجودی: {product.stock} عدد</p><div className="mt-7 max-w-sm">{product.stock > 0 ? <AddToCart product={{ id: product.id, name: product.name, price: product.price, image: product.image, slug: product.slug }}/> : <p className="text-red-600">ناموجود</p>}</div></div>
  </div></div>;
}
