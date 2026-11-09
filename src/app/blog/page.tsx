import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  return <div className="container-site py-12"><p className="text-sm text-stone-400">مجله موبایل‌شاپ</p><h1 className="mb-8 mt-2 text-3xl font-black">دانستنی‌ها و راهنماها</h1><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{posts.map(post=><Link key={post.id} href={`/blog/${post.slug}`} className="card p-6 transition hover:shadow-md"><p className="text-xs text-stone-400">{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p><h2 className="my-4 text-lg font-bold">{post.title}</h2><p className="leading-8 text-stone-500">{post.excerpt}</p><span className="mt-5 inline-block text-sm">ادامه مطلب ←</span></Link>)}</div></div>;
}
