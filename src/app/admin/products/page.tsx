import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { deleteProduct } from "@/app/actions/admin";
import { requireAdmin } from "@/lib/auth";

export default async function AdminProducts() {
  await requireAdmin();
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return <div className="card overflow-hidden"><div className="flex items-center justify-between p-5"><h2 className="font-bold">مدیریت محصولات</h2><Link href="/admin/products/new" className="btn-primary">محصول جدید +</Link></div><div className="overflow-x-auto"><table className="w-full text-right text-sm"><thead className="bg-stone-50"><tr><th className="p-3">محصول</th><th className="p-3">قیمت</th><th className="p-3">موجودی</th><th className="p-3">عملیات</th></tr></thead><tbody>{products.map(p=><tr key={p.id} className="border-t"><td className="p-3 font-bold">{p.name}</td><td className="p-3">{formatPrice(p.price)}</td><td className="p-3">{p.stock}</td><td className="p-3"><div className="flex gap-3"><Link className="text-blue-700" href={`/admin/products/${p.id}/edit`}>ویرایش</Link><form action={deleteProduct}><input type="hidden" name="id" value={p.id}/><button className="text-red-600">حذف</button></form></div></td></tr>)}</tbody></table></div></div>;
}
