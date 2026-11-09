import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { requireAdmin } from "@/lib/auth";

export default async function AdminDashboard() {
  await requireAdmin();
  const [products, orders, posts, revenue] = await Promise.all([
    prisma.product.count(), prisma.order.count(), prisma.post.count(),
    prisma.order.aggregate({ _sum: { total: true } })
  ]);
  const stats = [{ label: "تعداد محصولات", value: products }, { label: "سفارش‌ها", value: orders }, { label: "پست‌ها", value: posts }, { label: "فروش آزمایشی", value: formatPrice(revenue._sum.total || 0) }];
  return <><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map(s=><div className="card p-5" key={s.label}><p className="text-sm text-stone-500">{s.label}</p><p className="mt-3 text-2xl font-black">{s.value}</p></div>)}</div><div className="card mt-6 p-6"><h2 className="font-bold">دسترسی سریع</h2><div className="mt-4 flex flex-wrap gap-3"><Link className="btn-primary" href="/admin/products/new">افزودن محصول</Link><Link className="btn-secondary" href="/admin/posts/new">نوشتن پست جدید</Link><Link className="btn-secondary" href="/admin/orders">مشاهده سفارش‌ها</Link></div></div></>;
}
