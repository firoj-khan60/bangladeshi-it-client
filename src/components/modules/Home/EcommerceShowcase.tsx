"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shirt, Leaf, Cpu, Sparkles, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/motion/Reveal";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { key: "fashion", label: "Fashion", icon: Shirt, image: "/Fashion.jpg", domain: "fashion-store" },
  { key: "organic", label: "Organic", icon: Leaf, image: "/Organic.jpg", domain: "organic-shop" },
  { key: "electronics", label: "Electronics", icon: Cpu, image: "/Electronics.jpg", domain: "gadget-hub" },
  { key: "skincare", label: "Skincare", icon: Sparkles, image: "/cosmetics.jpg", domain: "glow-beauty" },
];

const FEATURES = [
  "Product catalog, cart & checkout ready on day one",
  "Order, inventory and customer dashboard included",
  "Designed around your niche — not a generic template",
];

export default function EcommerceShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance through categories until the visitor interacts.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % CATEGORIES.length), 4000);
    return () => clearInterval(id);
  }, [paused]);

  const current = CATEGORIES[active];

  return (
    <section className="relative overflow-hidden bg-muted/50 py-20 md:py-28">
      <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-brand-blue/10 blur-[140px]" aria-hidden />

      <div className="container relative mx-auto grid items-center gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div data-reveal>
            <SectionHeading
              align="left"
              eyebrow="E-commerce Solution"
              title="Launch an Online Store Built for Your Niche"
              subtitle="Fashion, organic food, electronics, skincare and more — pick your category and we'll tailor the storefront to how your customers actually shop."
            />
          </div>

          <ul data-reveal className="mt-8 space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-highlight" />
                <span className="font-medium text-foreground">{f}</span>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Store categories">
            {CATEGORIES.map(({ key, label, icon: Icon }, i) => (
              <button
                key={key}
                role="tab"
                aria-selected={i === active}
                onClick={() => {
                  setActive(i);
                  setPaused(true);
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                  i === active
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "border-border bg-card text-foreground hover:border-primary/50",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          <div data-reveal className="mt-10">
            <Button asChild size="lg" className="h-12 rounded-full px-8 font-bold">
              <Link href="/contact">
                Request a Free Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        {/* 3D storefront mockup */}
        <Reveal y={48}>
          <div className="[perspective:1600px]">
            <div
              className="relative transition-transform duration-700 ease-out lg:[transform:rotateY(-12deg)_rotateX(6deg)] lg:hover:[transform:rotateY(-4deg)_rotateX(2deg)]"
              onMouseEnter={() => setPaused(true)}
            >
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                {/* Browser chrome */}
                <div className="flex items-center gap-3 border-b border-border bg-muted/60 px-4 py-3">
                  <div className="flex gap-1.5" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                  </div>
                  <div className="flex-1 truncate rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
                    https://{current.domain}.com
                  </div>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" aria-hidden />
                </div>

                {/* Banner — kept at its native 1690×600 ratio so the artwork isn't cropped */}
                <div className="relative aspect-[1690/600] w-full bg-muted">
                  {CATEGORIES.map(({ key, label, image }, i) => (
                    <Image
                      key={key}
                      src={image}
                      alt={`${label} store banner`}
                      fill
                      sizes="(min-width: 1024px) 640px, 100vw"
                      className={cn(
                        "object-cover transition-all duration-700",
                        i === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
                      )}
                    />
                  ))}
                </div>

                {/* Product grid skeleton */}
                <div className="grid grid-cols-4 gap-3 p-4" aria-hidden>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="aspect-square rounded-lg bg-muted" />
                      <div className="h-2 w-3/4 rounded bg-muted" />
                      <div className="h-2 w-1/3 rounded bg-primary/40" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating order card for depth */}
              <div className="animate-float absolute -bottom-6 -left-4 hidden rounded-2xl border border-border bg-card/90 p-4 shadow-xl backdrop-blur-md sm:block lg:-left-10">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  New order
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">{current.label} store</p>
                <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-highlight">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Payment received
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
