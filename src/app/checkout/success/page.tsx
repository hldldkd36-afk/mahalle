import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  const found = order ? await prisma.order.findUnique({ where: { id: order } }) : null;
  return <div className="container-site max-w-xl py-20 text-center"><CheckCircle2 className="mx-auto text-green-600" size={58}/><h1 className="mt-5 text-2xl font-black">سفارش شما ثبت شد!</h1><p className="mt-3 leading-8 text-stone-500">پرداخت به‌صورت آزمایشی با موفقیت شبیه‌سازی شد. هیچ مبلغی دریافت نشده است.</p>{found && <p className="mt-4 text-sm text-stone-500">شماره سفارش: {found.id}</p>}<Link href="/" className="btn-primary mt-7">بازگشت به فروشگاه</Link></div>;
}
