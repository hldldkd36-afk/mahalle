import { saveProduct } from "@/app/actions/admin";
import { Product } from "@prisma/client";

export default function ProductForm({ product }: { product?: Product }) {
  return <form action={saveProduct} className="card max-w-2xl space-y-4 p-6">
    {product && <input type="hidden" name="id" value={product.id}/>}
    <label className="block text-sm">نام محصول<input className="field mt-2" name="name" defaultValue={product?.name} required/></label>
    <label className="block text-sm">آدرس یکتا (slug)<input className="field mt-2" name="slug" defaultValue={product?.slug} required/></label>
    <label className="block text-sm">توضیحات<textarea className="field mt-2 min-h-28" name="description" defaultValue={product?.description} required/></label>
    <label className="block text-sm">آدرس تصویر<input className="field mt-2" name="image" defaultValue={product?.image} required/></label>
    <label className="block text-sm">دسته‌بندی<input className="field mt-2" name="category" defaultValue={product?.category} required/></label>
    <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm">قیمت (تومان)<input className="field mt-2" type="number" min="1" name="price" defaultValue={product?.price} required/></label><label className="block text-sm">موجودی<input className="field mt-2" type="number" min="0" name="stock" defaultValue={product?.stock ?? 0} required/></label></div>
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" defaultChecked={product?.featured}/> محصول منتخب</label>
    <button className="btn-primary">{product ? "ذخیره تغییرات" : "ثبت محصول"}</button>
  </form>;
}
