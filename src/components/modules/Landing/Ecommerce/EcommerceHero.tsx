import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Heart,
  Leaf,
  Phone,
  Search,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/shared/motion/Reveal";
import { LEAD_FORM_ID } from "../constants";

const TRUST_POINTS = ["ফ্রি কনসালটেশন", "bKash / Nagad পেমেন্ট", "Mobile Friendly ডিজাইন"];

const PRODUCTS = [
  { icon: Shirt, name: "Fashion", price: "৳ 1,250" },
  { icon: Leaf, name: "Organic", price: "৳ 480" },
  { icon: Cpu, name: "Gadget", price: "৳ 3,900" },
  { icon: Sparkles, name: "Skincare", price: "৳ 950" },
];

/** CSS storefront mockup - a desktop browser with a phone overlapping it. */
function StorefrontMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl pb-10 lg:max-w-none">
      {/* Desktop browser */}
      <div className="overflow-hidden rounded-3xl border bg-card shadow-2xl shadow-primary/15">
        <div className="flex items-center gap-3 border-b bg-muted/60 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-highlight" />
          </div>
          <div className="flex-1 truncate rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
            https://your-store.com
          </div>
        </div>

        {/* Store nav */}
        <div className="flex items-center justify-between border-b px-4 py-2.5">
          <span className="flex items-center gap-1.5 text-xs font-bold">
            <ShoppingBag className="h-4 w-4 text-highlight" /> Your Store
          </span>
          <div className="hidden gap-4 text-[10px] font-semibold text-muted-foreground sm:flex">
            <span>Home</span>
            <span>Shop</span>
            <span>Offers</span>
            <span>Contact</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
            <span className="relative">
              <ShoppingCart className="h-3.5 w-3.5" />
              <span className="absolute -right-2 -top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-red text-[8px] font-bold text-white">
                3
              </span>
            </span>
          </div>
        </div>

        {/* Banner - native 1690x600 ratio so the artwork isn't cropped */}
        <div className="relative aspect-[1690/600] w-full bg-muted">
          <Image
            src="/Fashion.jpg"
            alt="E-commerce store banner"
            fill
            priority
            sizes="(min-width: 1024px) 620px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Products */}
        <div className="grid grid-cols-4 gap-2.5 p-4">
          {PRODUCTS.map(({ icon: Icon, name, price }) => (
            <div key={name} className="rounded-xl border bg-background p-2">
              <div className="flex aspect-square items-center justify-center rounded-lg bg-primary/10 text-highlight">
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <p className="mt-2 truncate text-[10px] font-semibold">{name}</p>
              <p className="text-[10px] font-bold text-highlight">{price}</p>
              <span className="mt-1.5 hidden rounded-md bg-primary py-1 text-center text-[9px] font-bold text-primary-foreground sm:block">
                Add to Cart
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Phone */}
      <div className="absolute -bottom-0 right-2 w-32 overflow-hidden rounded-[1.6rem] border-4 border-foreground/85 bg-card shadow-2xl sm:w-36 md:-right-4">
        <div className="mx-auto mt-1.5 h-1 w-10 rounded-full bg-foreground/30" aria-hidden />
        <div className="p-2.5">
          <div className="relative flex aspect-square items-center justify-center rounded-xl bg-primary/10 text-highlight">
            <Shirt className="h-10 w-10" />
            <Heart className="absolute right-2 top-2 h-3.5 w-3.5 fill-brand-red text-brand-red" />
          </div>
          <p className="mt-2 text-[10px] font-bold">Premium Panjabi</p>
          <div className="flex items-center gap-0.5 text-amber-400" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-2.5 w-2.5 fill-current" />
            ))}
          </div>
          <p className="mt-1 text-xs font-bold text-highlight">৳ 1,250</p>
          <span className="mt-2 block rounded-lg bg-primary py-1.5 text-center text-[10px] font-bold text-primary-foreground">
            Order Now
          </span>
        </div>
      </div>

      {/* Floating order card */}
      <div className="animate-float absolute -left-3 bottom-2 w-44 rounded-2xl border bg-background p-3 shadow-xl md:-left-8">
        <p className="flex items-center gap-1.5 text-xs font-bold">
          <CheckCircle2 className="h-4 w-4 text-highlight" /> New Order
        </p>
        <div className="mt-2 space-y-1 text-[10px] text-muted-foreground">
          <p className="flex justify-between">
            <span>Payment</span>
            <span>bKash - Paid</span>
          </p>
          <p className="flex justify-between font-bold text-foreground">
            <span>Total</span>
            <span>৳ 2,450</span>
          </p>
        </div>
      </div>

      {/* Floating growth badge */}
      <div
        className="animate-float absolute -top-4 right-4 flex items-center gap-2 rounded-2xl border bg-background px-3 py-2 shadow-xl md:-right-6"
        style={{ animationDelay: "-2s" }}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <TrendingUp className="h-4 w-4" />
        </span>
        <span className="text-[11px] font-bold leading-tight">
          Sales
          <br />
          <span className="text-highlight">24/7 Online</span>
        </span>
      </div>
    </div>
  );
}

export default function EcommerceHero({ phone }: { phone?: string | null }) {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-20 pt-12 md:px-8 md:pb-28 md:pt-20">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
      <div className="absolute -left-32 -top-24 -z-10 h-96 w-96 rounded-full bg-primary/25 blur-[120px]" aria-hidden />
      <div className="absolute -right-24 top-40 -z-10 h-80 w-80 rounded-full bg-brand-red/10 blur-[120px]" aria-hidden />

      <div className="container mx-auto grid items-center gap-14 lg:grid-cols-2">
        <Reveal y={24} stagger={0.08} start="top 100%">
          <span
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-highlight"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            E-commerce Website Development
          </span>

          <h1 data-reveal className="mt-6 text-4xl font-bold leading-[1.25] tracking-tight md:text-5xl lg:text-[3.4rem]">
            আপনার ব্যবসার জন্য{" "}
            <span className="text-highlight">E-commerce Website</span>{" "}
            প্রয়োজন?
          </h1>

          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            শুধু Facebook Page-এর উপর নির্ভর না করে নিজের একটি Online Store বানান। Modern, fast ও secure
            E-commerce Website - যেখানে Customer নিজেই Order করবে, Payment করবে, আর আপনি এক Dashboard থেকে
            সব সামলাবেন।
          </p>

          <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full px-8 text-base font-bold shadow-xl shadow-primary/25">
              <Link href={`#${LEAD_FORM_ID}`}>
                ফ্রি কনসালটেশন নিন <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {phone && (
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-8 text-base font-bold">
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
                  <Phone className="mr-2 h-4 w-4" /> {phone}
                </a>
              </Button>
            )}
          </div>

          <ul data-reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-highlight" /> {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal y={32} delay={0.15} start="top 100%">
          <StorefrontMockup />
        </Reveal>
      </div>
    </section>
  );
}
