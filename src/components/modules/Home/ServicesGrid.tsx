"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Globe,
  Terminal,
  Smartphone,
  Megaphone,
  Palette,
  Share2,
  Search,
  Briefcase,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/motion/Reveal";
import Starfield from "@/components/shared/motion/Starfield";
import { cn } from "@/lib/utils";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Headline shown inside the illustrative screen mockup. */
  screen: string;
  image?: string;
};

const SERVICES: Service[] = [
  {
    title: "E-commerce Solutions",
    description:
      "Full online storefronts — product catalog, cart, checkout and an order dashboard — tailored to your niche so you can start selling from day one.",
    icon: ShoppingCart,
    screen: "Shop the new collection",
    image: "/Fashion.jpg",
  },
  {
    title: "Web Development",
    description:
      "Fast, secure websites and web apps that don't just look great — they perform, convert and scale with your business.",
    icon: Globe,
    screen: "Websites that convert",
  },
  {
    title: "Software Development",
    description:
      "Custom systems — CRM, ERP, POS, HRM and internal tools — built around the way your team actually works.",
    icon: Terminal,
    screen: "Your workflow, automated",
  },
  {
    title: "Apps Development",
    description:
      "Native and cross-platform mobile apps for iOS and Android, taken from first concept all the way to the app store.",
    icon: Smartphone,
    screen: "In your customers' pocket",
  },
  {
    title: "Digital Marketing",
    description:
      "Data-driven campaigns across search, social and paid channels that bring in customers — and show you exactly what's working.",
    icon: Megaphone,
    screen: "Campaigns that pay back",
  },
  {
    title: "Graphic Design",
    description:
      "Brand identity, UI design and visual assets that feel intentional and make your business instantly recognisable.",
    icon: Palette,
    screen: "A brand people remember",
  },
  {
    title: "Social Media Marketing",
    description:
      "A consistent, on-brand presence across every platform that turns followers into loyal customers.",
    icon: Share2,
    screen: "From followers to buyers",
  },
  {
    title: "SEO & Content Writing",
    description:
      "Technical SEO and content that gets found on Google — and reads well once it is.",
    icon: Search,
    screen: "Rank on page one",
  },
  {
    title: "Business Consulting",
    description:
      "Practical advice on tech strategy, tooling and where to invest next, from people who build these systems every day.",
    icon: Briefcase,
    screen: "Invest in what matters",
  },
];

// Cycle accents through the theme's green→blue chart ramp.
const ACCENTS = ["--chart-1", "--chart-3", "--chart-2", "--chart-4", "--chart-5"];

/**
 * Card surface. "forest" = deep-green gradient (see `.theme-forest` in
 * globals.css); "default" = the regular theme card. Flip to revert.
 */
const CARD_STYLE: "forest" | "default" = "forest";

/** How far (px) a covered card slides up so its title peeks above the next one. */
const PEEK = 88;

/** Decorative device mockup — browser + phone — built from theme tokens. */
function ServiceVisual({ service, accent }: { service: Service; accent: string }) {
  const { icon: Icon, screen, image } = service;
  return (
    <div aria-hidden className="relative mx-auto h-60 w-full max-w-[520px] sm:h-72 lg:h-[340px]">
      {/* Dot grid */}
      <div
        className="absolute right-0 top-6 h-32 w-32 opacity-60"
        style={{
          backgroundImage: "radial-gradient(var(--brand-blue) 2.5px, transparent 3px)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Arc */}
      <div
        className="absolute -bottom-6 right-6 h-56 w-56 rotate-45 rounded-full border-[6px] border-transparent opacity-70"
        style={{ borderBottomColor: "var(--brand-blue)", borderRightColor: "var(--brand-blue)" }}
      />

      {/* Browser window */}
      <div className="absolute left-0 top-4 w-[82%] [perspective:1200px]">
        <div className="relative [transform:rotateY(-10deg)_rotateZ(-3deg)]">
          <div
            className="absolute -inset-3 rounded-2xl border-2"
            style={{ borderColor: `color-mix(in oklch, ${accent} 45%, transparent)` }}
          />
          <div className="relative overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-border bg-muted/70 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-destructive/70" />
              <span className="h-2 w-2 rounded-full bg-chart-4/70" />
              <span className="h-2 w-2 rounded-full bg-primary/70" />
              <span className="ml-3 h-2 w-24 rounded bg-border" />
            </div>
            {image ? (
              <div className="relative aspect-[1690/600]">
                <Image src={image} alt="" fill sizes="420px" className="object-cover" />
              </div>
            ) : (
              <div
                className="flex aspect-[1690/600] items-center gap-4 px-5"
                style={{
                  background: `linear-gradient(120deg, color-mix(in oklch, ${accent} 22%, transparent), color-mix(in oklch, var(--brand-blue) 14%, transparent))`,
                }}
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-primary-foreground shadow-lg"
                  style={{ background: accent }}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-foreground sm:text-base">{screen}</p>
                  <span className="mt-2 block h-1.5 w-20 rounded bg-foreground/15" />
                </div>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2 p-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="aspect-[4/3] rounded-md bg-muted" />
                  <div className="h-1.5 w-3/4 rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="absolute bottom-0 right-[8%] w-[30%] min-w-[110px] rotate-3 overflow-hidden rounded-[1.4rem] border-4 border-card bg-background shadow-2xl ring-1 ring-border">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <span className="h-1 w-4 rounded bg-foreground/30" />
          <span className="h-1.5 w-10 rounded bg-foreground/20" />
        </div>
        <div
          className="flex aspect-[4/5] items-center justify-center"
          style={{ background: `color-mix(in oklch, ${accent} 16%, transparent)` }}
        >
          <Icon className="h-8 w-8" style={{ color: accent }} />
        </div>
        <div className="space-y-1.5 p-3">
          <div className="h-1.5 w-full rounded bg-muted" />
          <div className="h-1.5 w-2/3 rounded bg-muted" />
          <div className="mt-2 h-5 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    </div>
  );
}

export default function ServicesGrid() {
  const listRef = useRef<HTMLDivElement>(null);

  // Stacking-cards effect: as the next card slides up and sticks, the one it
  // covers shrinks, lifts and fades. Progress is read from the next card's
  // live position (not ScrollTrigger) because sticky elements confuse
  // ScrollTrigger's start/end measurements.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const slots = Array.from(list.querySelectorAll<HTMLElement>("[data-stack-slot]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const stickTop = slots[0] ? parseFloat(getComputedStyle(slots[0]).top) || 0 : 0;

      slots.forEach((slot, i) => {
        const card = slot.querySelector<HTMLElement>("[data-stack-card]");
        const content = slot.querySelector<HTMLElement>("[data-stack-content]");
        if (!card || !content) return;

        let p = 0;
        const next = slots[i + 1];
        if (desktop.matches && next) {
          const top = next.getBoundingClientRect().top;
          p = Math.min(Math.max((vh - top) / (vh - stickTop), 0), 1);
        }
        card.style.transform = p ? `translateY(${-PEEK * p}px) scale(${1 - 0.06 * p})` : "";
        content.style.opacity = p ? String(1 - 0.7 * p) : "";
      });
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <section id="services" className="relative isolate scroll-mt-24 bg-background py-20 md:py-28">
      <Starfield className="-z-10" count={140} seed={9} />
      <div className="container mx-auto px-6">
        <Reveal className="mb-12 md:mb-16">
          <SectionHeading
            eyebrow="Our Services"
            title="Everything You Need to Build & Grow"
            subtitle="From the first line of code to the campaign that brings customers in."
          />
        </Reveal>

        <div ref={listRef} className="space-y-6 md:space-y-10">
          {SERVICES.map((service, i) => {
            const accent = `var(${ACCENTS[i % ACCENTS.length]})`;
            const { title, description, icon: Icon } = service;
            return (
              <div
                key={title}
                data-stack-slot
                className="lg:sticky lg:top-[calc(5rem+6.5rem)]"
                style={{ zIndex: i + 1 }}
              >
                <article
                  data-stack-card
                  className={cn(
                    "relative origin-top overflow-hidden rounded-[2rem] border shadow-2xl will-change-transform",
                    CARD_STYLE === "forest" ? "theme-forest border-border" : "border-border bg-card",
                  )}
                >
                  {CARD_STYLE === "default" && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-[100px]"
                      style={{ background: accent }}
                    />
                  )}
                  {/* Stars inside the card, each card its own layout */}
                  <Starfield className="opacity-100" count={40} seed={100 + i} />
                  <div
                    data-stack-content
                    className="relative grid items-center gap-10 p-8 md:min-h-[440px] md:p-12 lg:grid-cols-[1fr_1fr] lg:p-16"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-11 w-11 items-center justify-center rounded-xl border"
                          style={{
                            color: accent,
                            background: `color-mix(in oklch, ${accent} 12%, transparent)`,
                            borderColor: `color-mix(in oklch, ${accent} 30%, transparent)`,
                          }}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="font-mono text-sm font-bold text-muted-foreground">
                          {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                        {title}
                      </h3>
                      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                        {description}
                      </p>
                      <Button asChild size="lg" className="mt-8 h-12 rounded-full px-8 font-bold shadow-lg shadow-primary/20">
                        <Link href="/contact">
                          Learn more <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>

                    <ServiceVisual service={service} accent={accent} />
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
