import Image from "next/image";
import {
  BadgePercent,
  Check,
  CheckCircle2,
  Cpu,
  Droplets,
  Heart,
  Leaf,
  MessageSquareQuote,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
} from "lucide-react";
import type { CategorySlug } from "./categories";

function Stars() {
  return (
    <span className="flex items-center gap-0.5 text-amber-400" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-current" />
      ))}
    </span>
  );
}

/* ---------- fashion: product detail page with size + color pickers ---------- */

function FashionMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="grid grid-cols-[1fr_1.1fr] overflow-hidden rounded-3xl border bg-card shadow-2xl shadow-primary/20">
        <div className="relative flex flex-col bg-linear-to-br from-primary/25 via-primary/10 to-transparent p-4">
          <span className="w-fit rounded-full bg-brand-red px-2.5 py-0.5 text-[10px] font-bold text-white">NEW IN</span>
          <div className="flex flex-1 items-center justify-center py-6 text-highlight">
            <Shirt className="h-24 w-24 sm:h-32 sm:w-32" strokeWidth={1.2} />
          </div>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border bg-background/70 text-highlight ${i === 0 ? "border-primary" : ""}`}
              >
                <Shirt className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Winter Collection</p>
          <p className="mt-1 text-base font-bold leading-tight sm:text-lg">Premium Denim Jacket</p>
          <div className="mt-1.5 flex items-center gap-2">
            <Stars />
            <span className="text-[10px] text-muted-foreground">(128)</span>
          </div>
          <p className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-bold text-highlight">৳ 2,450</span>
            <span className="text-xs text-muted-foreground line-through">৳ 3,200</span>
          </p>

          <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Size</p>
          <div className="mt-1.5 flex gap-1.5">
            {["S", "M", "L", "XL"].map((size) => (
              <span
                key={size}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border text-[11px] font-bold ${
                  size === "M" ? "border-primary bg-primary text-primary-foreground" : "bg-background"
                } ${size === "XL" ? "text-muted-foreground/50 line-through" : ""}`}
              >
                {size}
              </span>
            ))}
          </div>

          <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Color</p>
          <div className="mt-1.5 flex gap-2">
            {["bg-sky-600", "bg-slate-800", "bg-amber-700", "bg-rose-500"].map((color, i) => (
              <span key={color} className={`flex h-6 w-6 items-center justify-center rounded-full ${color} ${i === 0 ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : ""}`}>
                {i === 0 && <Check className="h-3 w-3 text-white" />}
              </span>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
            <span className="flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground">
              <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
            </span>
            <span className="flex w-10 items-center justify-center rounded-xl border">
              <Heart className="h-4 w-4 text-brand-red" />
            </span>
          </div>
        </div>
      </div>

      <div className="animate-float absolute -right-2 -top-5 flex items-center gap-2 rounded-2xl border bg-background px-3 py-2 shadow-xl md:-right-6">
        <BadgePercent className="h-5 w-5 text-brand-red" />
        <span className="text-xs font-bold">Eid Offer -25%</span>
      </div>
      <div
        className="animate-float absolute -bottom-5 -left-2 rounded-2xl border bg-background px-3 py-2 shadow-xl md:-left-6"
        style={{ animationDelay: "-3s" }}
      >
        <p className="text-[10px] text-muted-foreground">Size M</p>
        <p className="text-xs font-bold text-highlight">Stock-এ আছে: ১২ পিস</p>
      </div>
    </div>
  );
}

/* ---------- organic: wide storefront with weight pickers ---------- */

const ORGANIC_PRODUCTS = [
  { name: "সুন্দরবনের মধু", price: "৳ 650", weights: ["250g", "500g", "1kg"] },
  { name: "খাঁটি গাওয়া ঘি", price: "৳ 1,400", weights: ["500g", "1kg"] },
  { name: "আজওয়া খেজুর", price: "৳ 1,150", weights: ["500g", "1kg", "2kg"] },
  { name: "কালোজিরা তেল", price: "৳ 380", weights: ["100ml", "250ml"] },
];

function OrganicMockup() {
  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-3xl border bg-card shadow-2xl shadow-primary/20">
        <div className="flex items-center gap-3 border-b bg-muted/60 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-highlight" />
          </div>
          <div className="flex-1 truncate rounded-md bg-background px-3 py-1 text-left text-xs text-muted-foreground">
            https://your-organic-shop.com
          </div>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" aria-hidden />
        </div>

        <div className="relative aspect-[1690/600] w-full bg-muted">
          <Image
            src="/Organic.jpg"
            alt="Organic store banner"
            fill
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 text-left md:grid-cols-4">
          {ORGANIC_PRODUCTS.map(({ name, price, weights }) => (
            <div key={name} className="rounded-2xl border bg-background p-3">
              <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-primary/10 text-highlight">
                <Leaf className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <p className="mt-2.5 text-xs font-bold">{name}</p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {weights.map((weight, i) => (
                  <span
                    key={weight}
                    className={`rounded-md border px-1.5 py-0.5 text-[9px] font-semibold ${i === 0 ? "border-primary bg-primary/10 text-highlight" : "text-muted-foreground"}`}
                  >
                    {weight}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-highlight">{price}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <ShoppingCart className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="animate-float absolute -left-2 top-1/3 hidden items-center gap-2 rounded-2xl border bg-background px-3 py-2 shadow-xl sm:flex md:-left-8">
        <ShieldCheck className="h-5 w-5 text-highlight" />
        <span className="text-left text-[11px] font-bold leading-tight">
          ১০০% খাঁটি
          <br />
          <span className="font-medium text-muted-foreground">উৎস দেখুন</span>
        </span>
      </div>
      <div
        className="animate-float absolute -right-2 bottom-24 hidden rounded-2xl border bg-background px-3 py-2 text-left shadow-xl sm:block md:-right-8"
        style={{ animationDelay: "-3s" }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-red">Combo Offer</p>
        <p className="text-xs font-bold">মধু + ঘি + খেজুর</p>
        <p className="text-xs font-bold text-highlight">৳ 2,990</p>
      </div>
    </div>
  );
}

/* ---------- electronics: compare table ---------- */

const COMPARE_ROWS = [
  { label: "Display", a: '6.7" AMOLED', b: '6.5" LCD' },
  { label: "RAM / ROM", a: "8 / 256 GB", b: "6 / 128 GB" },
  { label: "Battery", a: "5000 mAh", b: "4500 mAh" },
  { label: "Warranty", a: "1 Year", b: "1 Year" },
];

function ElectronicsMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="overflow-hidden rounded-3xl border bg-card shadow-2xl shadow-primary/25">
        <div className="flex flex-wrap items-center gap-2 border-b px-4 py-3">
          <span className="text-xs font-bold">Compare</span>
          {["All Brands", "Smartphone", "৳ 20k - 40k"].map((chip, i) => (
            <span
              key={chip}
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${i === 1 ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-[0.8fr_1fr_1fr] text-xs">
          <div />
          {[
            { name: "Phone X Pro", price: "৳ 38,990", best: true },
            { name: "Phone S Lite", price: "৳ 24,500", best: false },
          ].map(({ name, price, best }) => (
            <div key={name} className={`border-l p-4 text-center ${best ? "bg-primary/5" : ""}`}>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-highlight">
                <Smartphone className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <p className="mt-2 font-bold">{name}</p>
              <p className="font-bold text-highlight">{price}</p>
              {best && (
                <span className="mt-1 inline-block rounded-full bg-brand-red px-2 py-0.5 text-[9px] font-bold text-white">
                  Best Seller
                </span>
              )}
            </div>
          ))}

          {COMPARE_ROWS.map(({ label, a, b }) => (
            <div key={label} className="col-span-3 grid grid-cols-subgrid border-t">
              <div className="px-4 py-2.5 text-[11px] font-semibold text-muted-foreground">{label}</div>
              <div className="border-l bg-primary/5 px-3 py-2.5 text-center text-[11px] font-semibold">{a}</div>
              <div className="border-l px-3 py-2.5 text-center text-[11px] font-semibold">{b}</div>
            </div>
          ))}

          <div className="col-span-3 grid grid-cols-subgrid border-t">
            <div />
            <div className="border-l bg-primary/5 p-3">
              <span className="block rounded-lg bg-primary py-2 text-center text-[11px] font-bold text-primary-foreground">
                Buy Now
              </span>
            </div>
            <div className="border-l p-3">
              <span className="block rounded-lg border py-2 text-center text-[11px] font-bold">Buy Now</span>
            </div>
          </div>
        </div>
      </div>

      <div className="animate-float absolute -right-2 -top-5 flex items-center gap-2 rounded-2xl border bg-background px-3 py-2 shadow-xl md:-right-6">
        <Cpu className="h-5 w-5 text-highlight" />
        <span className="text-xs font-bold">320+ Products</span>
      </div>
      <div
        className="animate-float absolute -bottom-5 -left-2 flex items-center gap-2 rounded-2xl border bg-background px-3 py-2 shadow-xl md:-left-6"
        style={{ animationDelay: "-3s" }}
      >
        <CheckCircle2 className="h-4 w-4 text-highlight" />
        <span className="text-xs font-bold">In Stock</span>
      </div>
    </div>
  );
}

/* ---------- skincare: concern filter + review ---------- */

function SkincareMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="rounded-[2.5rem] border bg-card p-5 shadow-2xl shadow-primary/20 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Shop by concern</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Acne", "Dry Skin", "Brightening", "Sun Care", "Anti-aging"].map((chip, i) => (
            <span
              key={chip}
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${i === 2 ? "border-primary bg-primary text-primary-foreground" : "bg-background text-muted-foreground"}`}
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-[auto_1fr] gap-4 rounded-3xl bg-linear-to-br from-primary/15 to-primary/5 p-4">
          <div className="flex h-28 w-24 items-center justify-center rounded-2xl bg-background/80 text-highlight">
            <Droplets className="h-12 w-12" strokeWidth={1.3} />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">Vitamin C Glow Serum</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">30ml - সব ধরনের Skin</p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <Stars />
              <span className="text-[10px] font-semibold">4.8</span>
            </div>
            <p className="mt-2 text-lg font-bold text-highlight">৳ 950</p>
            <span className="mt-2 inline-block rounded-full bg-primary px-4 py-1.5 text-[11px] font-bold text-primary-foreground">
              Add to Bag
            </span>
          </div>
        </div>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Your routine</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {["Cleanser", "Serum", "Moisturizer"].map((step, i) => (
            <div key={step} className="rounded-2xl border bg-background p-2.5 text-center">
              <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-highlight">
                {i + 1}
              </span>
              <p className="mt-1.5 text-[10px] font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="animate-float absolute -right-2 -top-6 w-48 rounded-3xl border bg-background p-3 shadow-xl md:-right-8">
        <MessageSquareQuote className="h-4 w-4 text-highlight" />
        <p className="mt-1 text-[11px] leading-snug">২ সপ্তাহেই পার্থক্য বুঝতে পারছি!</p>
        <p className="mt-1 text-[10px] font-semibold text-muted-foreground">- Verified Customer</p>
      </div>
      <div
        className="animate-float absolute -bottom-5 -left-2 flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-xl md:-left-6"
        style={{ animationDelay: "-3s" }}
      >
        <Sparkles className="h-4 w-4 text-highlight" />
        <span className="text-xs font-bold">100% Authentic</span>
      </div>
    </div>
  );
}

const MOCKUPS: Record<CategorySlug, () => React.ReactNode> = {
  fashion: FashionMockup,
  organic: OrganicMockup,
  electronics: ElectronicsMockup,
  skincare: SkincareMockup,
};

export default function CategoryMockup({ slug }: { slug: CategorySlug }) {
  const Mockup = MOCKUPS[slug];
  return <Mockup />;
}
