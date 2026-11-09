import Link from "next/link";

export default function Footer() {
  return <footer className="mt-20 border-t border-stone-200 bg-white"><div className="container-site flex flex-col gap-3 py-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} موبایل‌شاپ — پروژه فروشگاهی آموزشی</p><div className="flex gap-4"><Link href="/blog">مجله</Link><Link href="/admin">مدیریت</Link></div></div></footer>;
}
