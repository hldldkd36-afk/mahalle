import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { requireAdmin } from "@/lib/auth";

export default async function AdminOrders() {
  await requireAdmin();
  const orders = await prisma.order.findMany({ include: { items: { include: { product: true } } }, orderBy: { createdAt: "desc" } });
  return <div className="space-y-4">{orders.map(order=><section key={order.id} className="card p-5"><div className="flex flex-wrap justify-between gap-3"><div><b>سفارش {order.id.slice(-8)}</b><p className="mt-1 text-sm text-stone-500">{order.customer} · {order.phone}</p></div><div className="text-left"><b>{formatPrice(order.total)}</b><p className="mt-1 text-xs text-green-700">پرداخت آزمایشی موفق</p></div></div><p className="mt-3 text-sm text-stone-600">آدرس: {order.address}</p><div className="mt-3 border-t pt-3 text-sm">{order.items.map(item=><p key={item.id}>{item.product.name} × {item.quantity}</p>)}</div></section>)}{!orders.length && <p className="card p-6 text-stone-500">هنوز سفارشی ثبت نشده است.</p>}</div>;
}
