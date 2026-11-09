import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  { name: "هدفون بی‌سیم AirBeat", slug: "airbeat-wireless", description: "هدفون بلوتوثی سبک با صدای شفاف، میکروفون داخلی و شارژدهی مناسب برای استفاده روزمره.", price: 1290000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80", category: "صوتی", stock: 18, featured: true },
  { name: "شارژر سریع ۳۰ وات", slug: "fast-charger-30w", description: "شارژر دیواری جمع‌وجور با فناوری شارژ سریع و محافظت در برابر افزایش دما و ولتاژ.", price: 890000, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80", category: "شارژر", stock: 25, featured: true },
  { name: "قاب سیلیکونی مینیمال", slug: "minimal-silicone-case", description: "قاب نرم و خوش‌دست با لبه‌های محافظ و طراحی ساده برای استفاده روزانه.", price: 320000, image: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&w=900&q=80", category: "قاب و کاور", stock: 40, featured: true },
  { name: "پاوربانک ۲۰۰۰۰ میلی‌آمپر", slug: "powerbank-20000", description: "پاوربانک ظرفیت بالا با دو خروجی USB و نشانگر میزان شارژ برای سفر و استفاده روزانه.", price: 1750000, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80", category: "شارژر", stock: 12, featured: true },
  { name: "پایه نگهدارنده رومیزی", slug: "desk-phone-stand", description: "پایه آلومینیومی مقاوم با زاویه قابل تنظیم؛ مناسب تماس تصویری و تماشای ویدئو.", price: 450000, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=80", category: "پایه و نگهدارنده", stock: 30, featured: false },
  { name: "کابل USB-C کنفی", slug: "usb-c-braided-cable", description: "کابل بادوام با روکش بافته‌شده، مناسب شارژ و انتقال داده.", price: 210000, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80", category: "کابل", stock: 50, featured: false },
  { name: "گلس محافظ صفحه", slug: "screen-protector-glass", description: "محافظ صفحه شفاف با مقاومت مناسب در برابر خط‌وخش و نصب آسان.", price: 180000, image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=900&q=80", category: "محافظ صفحه", stock: 60, featured: false },
  { name: "هندزفری سیمی استریو", slug: "stereo-wired-earphones", description: "هندزفری سبک با صدای متعادل و کنترل تماس و موسیقی روی کابل.", price: 260000, image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80", category: "صوتی", stock: 22, featured: false },
  { name: "شارژر فندکی دو پورت", slug: "dual-car-charger", description: "شارژر فندکی خودرو با دو درگاه خروجی برای شارژ هم‌زمان دو دستگاه.", price: 390000, image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=80", category: "شارژر", stock: 16, featured: false },
  { name: "مچ‌بند نگهدارنده موبایل", slug: "phone-wrist-strap", description: "بند سبک و کاربردی برای حمل راحت‌تر گوشی و کاهش احتمال افتادن آن.", price: 150000, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80", category: "لوازم جانبی", stock: 35, featured: false }
];

const posts = [
  { title: "چطور شارژر مناسب گوشی خود را انتخاب کنیم؟", slug: "choose-the-right-charger", excerpt: "چند نکته ساده برای انتخاب شارژر ایمن و سازگار با گوشی.", content: "هنگام خرید شارژر به توان خروجی، استانداردهای ایمنی و سازگاری آن با گوشی توجه کنید. استفاده از شارژر باکیفیت به حفظ سلامت باتری کمک می‌کند.", published: true },
  { title: "۵ راه برای مراقبت بهتر از باتری موبایل", slug: "phone-battery-care", excerpt: "با رعایت چند عادت ساده، عمر مفید باتری گوشی را بیشتر کنید.", content: "از گرمای زیاد دوری کنید، از کابل و شارژر استاندارد استفاده کنید و در صورت امکان شارژ باتری را در بازه متعادل نگه دارید. سلامت باتری به عادت‌های روزمره وابسته است.", published: true },
  { title: "قاب مناسب چه ویژگی‌هایی دارد؟", slug: "good-phone-case", excerpt: "ظاهر زیبا مهم است؛ اما محافظت و خوش‌دستی را فراموش نکنید.", content: "قاب مناسب باید دسترسی به دکمه‌ها و درگاه‌ها را محدود نکند، لبه‌های محافظ داشته باشد و در دست لیز نخورد. ضخامت بیش از حد هم ممکن است استفاده روزانه را دشوار کند.", published: true }
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({ where: { slug: product.slug }, update: product, create: product });
  }
  for (const post of posts) {
    await prisma.post.upsert({ where: { slug: post.slug }, update: post, create: post });
  }
  console.log("Seed completed.");
}

main().finally(async () => prisma.$disconnect());
