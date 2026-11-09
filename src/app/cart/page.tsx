"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, change, remove } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <div className="container-site py-12"><h1 className="mb-7 text-2xl font-black">سبد خرید</h1>
    {!items.length ? <div className="card p-10 text-center"><p className="text-stone-500">هنوز محصولی به سبد خرید اضافه نکرده‌اید.</p><Link href="/" className="btn-primary mt-5">رفتن به فروشگاه</Link></div> :
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_330px]"><div className="space-y-3">{items.map(item=><div key={item.id} className="card flex gap-4 p-4"><img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover"/><div className="min-w-0 flex-1"><h2 className="font-bold">{item.name}</h2><p className="mt-2 text-sm text-stone-500">{formatPrice(item.price)}</p><div className="mt-3 flex items-center gap-3"><button className="rounded-lg border p-1" onClick={()=>change(item.id,item.quantity-1)}><Minus size={15}/></button><span>{item.quantity}</span><button className="rounded-lg border p-1" onClick={()=>change(item.id,item.quantity+1)}><Plus size={15}/></button><button className="mr-auto text-stone-400" onClick={()=>remove(item.id)} aria-label="حذف"><Trash2 size={17}/></button></div></div></div>)}</div>
    <aside className="card p-5"><h2 className="font-bold">خلاصه سفارش</h2><div className="my-5 flex justify-between text-sm"><span>جمع کل</span><b>{formatPrice(total)}</b></div><Link href="/checkout" className="btn-primary w-full">ادامه و تسویه حساب</Link></aside></div>}
  </div>;
}
