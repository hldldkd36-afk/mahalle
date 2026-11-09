import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, Headphones } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const products = await prisma.product.findMany({ orderBy: [{ featured: "desc" }, { createdAt: "desc" }] });
  return <>
    <section className="container-site py-12 md:py-20">
      <div className="grid items-center gap-10 rounded-[28px] bg-[#ecece6] p-7 md:grid-cols-[1.1fr_.9fr] md:p-12">
        <div><span className="mb-5 inline-block rounded-full bg-white px-4 py-2 text-xs text-stone-500">انتخاب هوشمندانه، خرید آسان</span><h1 className="max-w-xl text-3xl leading-[1.6] font-black md:text-5xl">جزئیات کوچک،<br/>تجربه‌ای متفاوت.</h1><p className="mt-5 max-w-md leading-8 text-stone-600">لوازم جانبی کاربردی و خوش‌ساخت برای اینکه استفاده از گوشی، ساده‌تر و لذت‌بخش‌تر باشد.</p><Link href="#products" className="btn-primary mt-7">مشاهده محصولات <ArrowLeft size={17}/></Link></div>
        <div className="overflow-hidden rounded-3xl"><img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1100&q=85" alt="لوازم جانبی موبایل" className="h-64 w-full object-cover md:h-80"/></div>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {[{icon:Truck,title:"ارسال سریع",desc:"تحویل سفارش در کوتاه‌ترین زمان"},{icon:ShieldCheck,title:"خرید مطمئن",desc:"محصولات منتخب و کاربردی"},{icon:Headphones,title:"پشتیبانی",desc:"همراه شما در انتخاب محصول"}].map(x=><div key={x.title} className="card flex items-center gap-3 p-4"><x.icon className="text-stone-500" size={22}/><div><b className="text-sm">{x.title}</b><p className="mt-1 text-xs text-stone-500">{x.desc}</p></div></div>)}
      </div>
    </section>
    <section id="products" className="container-site scroll-mt-24 pb-8"><div className="mb-7 flex items-end justify-between"><div><p className="text-sm text-stone-400">منتخب فروشگاه</p><h2 className="mt-2 text-2xl font-black">محصولات محبوب</h2></div><span className="text-sm text-stone-500">{products.length} محصول</span></div>
      {products.length ? <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div> : <p>هنوز محصولی ثبت نشده است.</p>}
    </section>
  </>;
}
