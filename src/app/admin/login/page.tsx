import { loginAction } from "@/app/actions/admin";
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <div className="container-site flex min-h-[65vh] items-center justify-center py-12"><form action={loginAction} className="card w-full max-w-md space-y-4 p-7"><h1 className="text-2xl font-black">ورود مدیر</h1><p className="text-sm text-stone-500">برای ورود، اطلاعات مدیر را وارد کنید.</p>{error && <p className="text-sm text-red-600">نام کاربری یا رمز عبور اشتباه است.</p>}<input className="field" name="username" placeholder="نام کاربری" required/><input className="field" name="password" type="password" placeholder="رمز عبور" required/><button className="btn-primary w-full">ورود به پنل</button></form></div>;
}
