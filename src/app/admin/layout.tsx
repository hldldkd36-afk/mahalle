import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { logoutAction } from "@/app/actions/admin";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await isAdmin();
  if (!authenticated) return <>{children}</>;
  return <div className="container-site py-8"><div className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-stone-400">مدیریت فروشگاه</p><h1 className="mt-1 text-2xl font-black">پنل ادمین</h1></div><form action={logoutAction}><button className="btn-secondary">خروج از حساب</button></form></div><nav className="mb-7 flex flex-wrap gap-2 text-sm">{[["/admin","داشبورد"],["/admin/products","محصولات"],["/admin/orders","سفارش‌ها"],["/admin/posts","پست‌ها"]].map(([href,label])=><Link key={href} href={href} className="rounded-xl border bg-white px-4 py-2 hover:bg-stone-100">{label}</Link>)}</nav>{children}</div>;
}
