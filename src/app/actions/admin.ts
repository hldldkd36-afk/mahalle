"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { credentialsAreValid, createAdminSession, destroyAdminSession, requireAdmin } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  if (!credentialsAreValid(username, password)) redirect("/admin/login?error=1");
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function saveProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  if (!name || !slug || !description || !image || !category || !Number.isInteger(price) || price < 1 || !Number.isInteger(stock) || stock < 0) throw new Error("اطلاعات محصول معتبر نیست.");
  const data = { name, slug, description, image, category, price, stock, featured: formData.get("featured") === "on" };
  if (id) await prisma.product.update({ where: { id }, data }); else await prisma.product.create({ data });
  revalidatePath("/"); revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) await prisma.product.delete({ where: { id } });
  revalidatePath("/"); revalidatePath("/admin/products");
}

export async function savePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  if (!title || !slug || !excerpt || !content) throw new Error("تمام فیلدها الزامی هستند.");
  const data = { title, slug, excerpt, content, published: formData.get("published") === "on" };
  if (id) await prisma.post.update({ where: { id }, data }); else await prisma.post.create({ data });
  revalidatePath("/blog"); revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) await prisma.post.delete({ where: { id } });
  revalidatePath("/blog"); revalidatePath("/admin/posts");
}
