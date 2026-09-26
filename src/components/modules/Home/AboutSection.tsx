"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Target, Eye, Globe, LayoutDashboard, TrendingUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/motion/Reveal";
import TiltCard from "@/components/shared/motion/TiltCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const YEARS = 7;

const PILLARS = [
  { title: "Build", description: "Websites, online stores and mobile apps.", icon: Globe },
  { title: "Automate", description: "POS, ERP, CRM and HRM software.", icon: LayoutDashboard },
  { title: "Grow", description: "Digital marketing, SEO and social media.", icon: TrendingUp },
];

export default function AboutSection() {
  const countRef = useRef<HTMLSpanElement>(null);

  // Years counter ticks up from 0 when it scrolls into view.
  useLayoutEffect(() => {
    const el = countRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      el.textContent = "0";
      gsap.to(counter, {
        v: YEARS,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        onUpdate: () => {
          el.textContent = String(Math.round(counter.v));
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* Intro: headline left, short story + CTA right */}
        <Reveal className="grid items-end gap-8 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="Your Technology Partner, From First Idea to Real Growth"
            />
          </div>
          <div data-reveal className="space-y-6">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              <span className="font-semibold text-foreground">Bangladeshi IT</span>{" "}is a software and
              digital agency that helps businesses go online, run smarter and grow faster. For over
              seven years we&apos;ve partnered with shops, startups and established companies —
              building the websites, business systems and marketing that keep them moving forward.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 font-bold text-foreground transition-colors hover:text-highlight"
            >
              Read our story
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:translate-x-1 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </Reveal>

        {/* Bento */}
        <Reveal className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3" stagger={0.1}>
          {/* Experience — tall brand-green card (same look in light and dark mode) */}
          <div data-reveal className="md:row-span-2">
            <TiltCard
              max={5}
              glare={false}
              className="flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#0b8a4c_0%,#066938_45%,#03401f_100%)] p-8 text-white shadow-2xl shadow-primary/25 ring-1 ring-white/10 md:p-10"
            >
              {/* Soft light from the top-right, brand-red warmth bottom-left */}
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-brand-red/25 blur-3xl" />
              {/* Fine dot texture, fading out toward the bottom */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
              />
              {/* Slowly turning rings */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-[spin_40s_linear_infinite] rounded-full border-2 border-dashed border-white/20 motion-reduce:animate-none"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 animate-[spin_25s_linear_infinite_reverse] rounded-full border border-white/15 motion-reduce:animate-none"
              />

              <span className="relative inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                Since day one
              </span>

              <div className="relative">
                <div className="flex items-start leading-none">
                  <span
                    ref={countRef}
                    className="bg-linear-to-b from-white to-white/70 bg-clip-text text-[7.5rem] font-black tracking-tighter text-transparent md:text-[9rem]"
                  >
                    {YEARS}
                  </span>
                  <span className="mt-3 text-6xl font-black text-brand-red drop-shadow-[0_2px_12px_rgba(235,33,39,0.45)]">
                    +
                  </span>
                </div>
                <p className="mt-2 text-xl font-bold">Years of experience</p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">
                  building technology for businesses across Bangladesh and beyond.
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-6">
                  {[
                    { value: "100+", label: "Projects delivered" },
                    { value: "50+", label: "Happy clients" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="text-2xl font-black">{stat.value}</dd>
                      <dd className="text-xs font-medium text-white/70">{stat.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </TiltCard>
          </div>

          {/* Mission */}
          <div data-reveal>
            <TiltCard max={5} className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-highlight">
                <Target className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-foreground">Our Mission</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To make reliable, modern technology accessible to every business — not just the ones
                with big budgets.
              </p>
            </TiltCard>
          </div>

          {/* Vision */}
          <div data-reveal>
            <TiltCard max={5} className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/12 text-brand-blue">
                <Eye className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-foreground">Our Vision</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To be the technology partner Bangladeshi businesses trust most — at home and on the
                global stage.
              </p>
            </TiltCard>
          </div>

          {/* What we do — wide card */}
          <div data-reveal className="md:col-span-1 lg:col-span-2">
            <div className="h-full rounded-[2rem] border border-border bg-muted/50 p-8">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">
                What we do
              </p>
              <ul className="mt-6 grid gap-6 sm:grid-cols-3">
                {PILLARS.map(({ title, description, icon: Icon }, i) => (
                  <li key={title} className="group relative">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-card text-highlight shadow-sm ring-1 ring-border transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs font-bold text-muted-foreground">
                        0{i + 1}
                      </span>
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-foreground">{title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
