import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost } from "@/app/actions/admin";
import { requireAdmin } from "@/lib/auth";

export default async function AdminPosts() {
  await requireAdmin();
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return <div className="card overflow-hidden"><div className="flex items-center justify-between p-5"><h2 className="font-bold">مدیریت پست‌ها</h2><Link href="/admin/posts/new" className="btn-primary">پست جدید +</Link></div><div className="divide-y">{posts.map(post=><div key={post.id} className="flex flex-wrap items-center justify-between gap-3 p-4"><div><b>{post.title}</b><p className="mt-1 text-xs text-stone-500">{post.published ? "منتشر شده" : "پیش‌نویس"}</p></div><div className="flex gap-3 text-sm"><Link className="text-blue-700" href={`/admin/posts/${post.id}/edit`}>ویرایش</Link><form action={deletePost}><input type="hidden" name="id" value={post.id}/><button className="text-red-600">حذف</button></form></div></div>)}</div></div>;
}
