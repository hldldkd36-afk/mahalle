"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/utils";
import { createOrder } from "@/app/actions/checkout";

export default function CheckoutForm() {
  const { items, clear } = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function submit(formData: FormData) {
    if (!items.length) return;
    setBusy(true); setError("");
    const result = await createOrder({
      customer: String(formData.get("customer") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      items: items.map(({ id, quantity }) => ({ productId: id, quantity }))
    });
    setBusy(false);
    if (!result.success) { setError(result.error); return; }
    clear();
    router.push(`/checkout/success?order=${result.orderId}`);
  }

  if (!items.length) return <div className="card p-8 text-center text-stone-500">سبد خرید شما خالی است.</div>;
  return <form action={submit} className="card space-y-4 p-6">
    <h2 className="text-lg font-bold">اطلاعات گیرنده</h2>
    <input className="field" name="customer" placeholder="نام و نام خانوادگی" required minLength={3}/>
    <input className="field" name="phone" placeholder="شماره موبایل" required pattern="09[0-9]{9}" title="شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد"/>
    <textarea className="field min-h-28" name="address" placeholder="آدرس کامل" required minLength={10}/>
    <div className="rounded-xl bg-stone-50 p-4"><div className="flex justify-between"><span>مبلغ قابل پرداخت</span><b>{formatPrice(total)}</b></div><p className="mt-2 text-xs text-stone-500">پرداخت آزمایشی است و هیچ وجهی دریافت نمی‌شود.</p></div>
    {error && <p className="text-sm text-red-600">{error}</p>}
    <button disabled={busy} className="btn-primary w-full disabled:opacity-50">{busy ? "در حال ثبت سفارش..." : "پرداخت آزمایشی و ثبت سفارش"}</button>
  </form>;
}
