import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostForm from "@/components/PostForm";
import { requireAdmin } from "@/lib/auth";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();
  return <><h2 className="mb-5 text-xl font-bold">ویرایش پست</h2><PostForm post={post}/></>;
}
