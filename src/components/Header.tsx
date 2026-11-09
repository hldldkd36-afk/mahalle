"use client";

import Link from "next/link";
import { ShoppingBag, Smartphone } from "lucide-react";
import { useCart } from "./CartProvider";

export default function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-black"><span className="rounded-xl bg-stone-900 p-2 text-white"><Smartphone size={19}/></span> موبایل‌شاپ</Link>
        <nav className="flex items-center gap-5 text-sm text-stone-600">
          <Link href="/" className="hover:text-black">فروشگاه</Link>
          <Link href="/blog" className="hover:text-black">مجله</Link>
          <Link href="/cart" className="relative flex items-center gap-2 rounded-xl bg-stone-100 px-3 py-2 text-stone-900"><ShoppingBag size={17}/> سبد خرید <span className="rounded-full bg-stone-900 px-2 py-0.5 text-xs text-white">{count}</span></Link>
        </nav>
      </div>
    </header>
  );
}
