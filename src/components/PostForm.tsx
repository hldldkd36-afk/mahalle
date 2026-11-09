import { Post } from "@prisma/client";
import { savePost } from "@/app/actions/admin";

export default function PostForm({ post }: { post?: Post }) {
  return <form action={savePost} className="card max-w-2xl space-y-4 p-6">
    {post && <input type="hidden" name="id" value={post.id}/>}
    <label className="block text-sm">عنوان<input className="field mt-2" name="title" defaultValue={post?.title} required/></label>
    <label className="block text-sm">آدرس یکتا (slug)<input className="field mt-2" name="slug" defaultValue={post?.slug} required/></label>
    <label className="block text-sm">خلاصه<textarea className="field mt-2" name="excerpt" defaultValue={post?.excerpt} required/></label>
    <label className="block text-sm">متن کامل<textarea className="field mt-2 min-h-48" name="content" defaultValue={post?.content} required/></label>
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="published" defaultChecked={post?.published}/> انتشار پست</label>
    <button className="btn-primary">{post ? "ذخیره تغییرات" : "ثبت پست"}</button>
  </form>;
}
