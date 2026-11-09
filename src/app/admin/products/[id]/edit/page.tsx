import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/ProductForm";
import { requireAdmin } from "@/lib/auth";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return <><h2 className="mb-5 text-xl font-bold">ویرایش محصول</h2><ProductForm product={product}/></>;
}
