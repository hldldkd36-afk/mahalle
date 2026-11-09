import PostForm from "@/components/PostForm";
import { requireAdmin } from "@/lib/auth";
export default async function NewPostPage() { await requireAdmin(); return <><h2 className="mb-5 text-xl font-bold">نوشتن پست جدید</h2><PostForm/></>; }
