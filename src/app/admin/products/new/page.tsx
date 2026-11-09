import ProductForm from "@/components/ProductForm";
import { requireAdmin } from "@/lib/auth";
export default async function NewProductPage() { await requireAdmin(); return <><h2 className="mb-5 text-xl font-bold">افزودن محصول</h2><ProductForm/></>; }
