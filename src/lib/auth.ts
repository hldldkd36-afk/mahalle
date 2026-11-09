import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "mobileshop_admin";

function signature(value: string) {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET باید حداقل ۳۲ کاراکتر باشد.");
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function credentialsAreValid(username: string, password: string) {
  return username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD;
}

export async function createAdminSession() {
  const value = `admin:${Date.now()}`;
  const token = `${value}.${signature(value)}`;
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax", path: "/", maxAge: 60 * 60 * 8
  });
}

export async function isAdmin() {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [value, supplied] = token.split(".");
  if (!value || !supplied || !value.startsWith("admin:")) return false;
  const expected = signature(value);
  if (supplied.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function destroyAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}
