"use server";

import { prisma } from "@/lib/prisma";

type Input = { customer: string; phone: string; address: string; items: { productId: string; quantity: number }[] };

export async function createOrder(input: Input) {
  const customer = input.customer.trim();
  const phone = input.phone.trim();
  const address = input.address.trim();
  if (customer.length < 3 || !/^09\d{9}$/.test(phone) || address.length < 10) return { success: false as const, error: "لطفاً اطلاعات گیرنده را به‌درستی وارد کنید." };
  if (!Array.isArray(input.items) || input.items.length === 0 || input.items.length > 30) return { success: false as const, error: "سبد خرید معتبر نیست." };

  try {
    const order = await prisma.$transaction(async tx => {
      const normalized = new Map<string, number>();
      for (const item of input.items) {
        if (!item.productId || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) throw new Error("INVALID_CART");
        normalized.set(item.productId, (normalized.get(item.productId) ?? 0) + item.quantity);
      }
      const ids = [...normalized.keys()];
      const products = await tx.product.findMany({ where: { id: { in: ids } } });
      if (products.length !== ids.length) throw new Error("PRODUCT_NOT_FOUND");
      let total = 0;
      for (const product of products) {
        const quantity = normalized.get(product.id)!;
        if (product.stock < quantity) throw new Error("OUT_OF_STOCK");
        total += product.price * quantity;
      }
      const created = await tx.order.create({
        data: {
          customer, phone, address, total, status: "PAID_TEST",
          items: { create: products.map(product => ({ productId: product.id, quantity: normalized.get(product.id)!, unitPrice: product.price })) }
        }
      });
      for (const product of products) await tx.product.update({ where: { id: product.id }, data: { stock: { decrement: normalized.get(product.id)! } } });
      return created;
    });
    return { success: true as const, orderId: order.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const errors: Record<string, string> = { INVALID_CART: "اطلاعات سبد خرید معتبر نیست.", PRODUCT_NOT_FOUND: "یکی از محصولات دیگر موجود نیست.", OUT_OF_STOCK: "موجودی یکی از محصولات کافی نیست." };
    return { success: false as const, error: errors[message] ?? "ثبت سفارش انجام نشد. دوباره تلاش کنید." };
  }
}
