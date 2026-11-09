import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findFirst({ where: { slug, published: true } });
  if (!post) notFound();
  return <article className="container-site max-w-3xl py-14"><p className="text-sm text-stone-400">مجله موبایل‌شاپ · {new Date(post.createdAt).toLocaleDateString("fa-IR")}</p><h1 className="my-5 text-3xl leading-relaxed font-black">{post.title}</h1><p className="mb-8 border-r-2 border-stone-300 pr-4 text-lg leading-9 text-stone-500">{post.excerpt}</p><div className="whitespace-pre-wrap leading-10 text-stone-700">{post.content}</div></article>;
}
