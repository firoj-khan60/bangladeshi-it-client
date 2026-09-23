"use client";

import { useLayoutEffect, useRef } from "react";
import { ShieldCheck, Zap, Code2, Headphones, Wallet, FileCheck2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/motion/Reveal";
import TiltCard from "@/components/shared/motion/TiltCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { value: 100, suffix: "+", decimals: 0, label: "Projects delivered" },
  { value: 50, suffix: "+", decimals: 0, label: "Happy clients" },
  { value: 7, suffix: "+", decimals: 0, label: "Years of experience" },
  { value: 4.9, suffix: "/5", decimals: 1, label: "Average rating" },
];

const FEATURES = [
  { title: "Fast Delivery", description: "Tight timelines without cutting corners on quality.", icon: Zap },
  { title: "Modern Stack", description: "Current, well-supported tech designed to scale with you.", icon: Code2 },
  { title: "Reliable & Secure", description: "Security and stability are part of the build, not an afterthought.", icon: ShieldCheck },
  { title: "24/7 Support", description: "We're here after launch, not just before it.", icon: Headphones },
  { title: "Transparent Pricing", description: "Clear scopes and quotes upfront — no surprise invoices.", icon: Wallet },
  { title: "You Own It", description: "Full source and credentials handed over. No lock-in, ever.", icon: FileCheck2 },
];

export default function WhyUs() {
  const statsRef = useRef<HTMLDListElement>(null);

  // Count-up once the stats row scrolls into view.
  useLayoutEffect(() => {
    const root = statsRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals);
        const counter = { v: 0 };
        el.textContent = (0).toFixed(decimals);
        gsap.to(counter, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 85%", toggleActions: "play none none none" },
          onUpdate: () => {
            el.textContent = counter.v.toFixed(decimals);
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-muted/50 py-20 md:py-28">
      <div className="absolute left-0 top-0 h-[420px] w-[420px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-[130px]" aria-hidden />

      <div className="container relative mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div data-reveal>
              <SectionHeading
                align="left"
                eyebrow="Why Choose Us"
                title="The Reasons Clients Keep Coming Back"
              />
            </div>
            <p data-reveal className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Great software is only half the job. Here&apos;s what working with us actually feels
              like — before, during and long after launch.
            </p>
            <dl
              ref={statsRef}
              data-reveal
              className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border"
            >
              {STATS.map(({ value, suffix, decimals, label }) => (
                <div key={label} className="flex flex-col-reverse bg-card p-6">
                  <dt className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="text-4xl font-black tracking-tight text-foreground">
                    <span data-count={value} data-decimals={decimals}>
                      {value.toFixed(decimals)}
                    </span>
                    <span className="text-gradient-brand">{suffix}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="grid gap-5 sm:grid-cols-2" stagger={0.08}>
            {FEATURES.map(({ title, description, icon: Icon }) => (
              <div key={title} data-reveal className="h-full">
                <TiltCard max={6} className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-xl">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-brand-blue text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-lg font-black text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </TiltCard>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
