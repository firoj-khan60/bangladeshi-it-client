"use client";

import { useLayoutEffect, useRef } from "react";
import {
  Search,
  ClipboardList,
  PenTool,
  Code2,
  Rocket,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/shared/SectionHeading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Step = { step: string; title: string; description: string; icon: LucideIcon };

const STEPS: Step[] = [
  {
    step: "Discover",
    title: "We Listen Before We Build",
    description: "We learn your business, users and goals before a single line of code is written.",
    icon: Search,
  },
  {
    step: "Plan",
    title: "A Clear Scope, Upfront",
    description: "Features, timeline and a fixed quote — agreed together before work begins.",
    icon: ClipboardList,
  },
  {
    step: "Design",
    title: "Designed for Real People",
    description: "Wireframes and UI you can click through and sign off on early, not after launch.",
    icon: PenTool,
  },
  {
    step: "Build",
    title: "Progress You Can See",
    description: "Weekly updates and a live staging link from day one — no black boxes.",
    icon: Code2,
  },
  {
    step: "Launch",
    title: "Quality Without Compromise",
    description: "Tested on real devices, deployed carefully, and your team trained to use it.",
    icon: Rocket,
  },
  {
    step: "Support",
    title: "Partners for the Long Run",
    description: "Beyond launch, we stay on for updates, fixes and whatever you need to grow next.",
    icon: HeartHandshake,
  },
];

export default function ProcessSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Cards rise in with a stagger; each icon's strokes then "draw" themselves.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-step-card]");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: grid, start: "top 80%", toggleActions: "play none none none" },
      });

      tl.from(cards, {
        autoAlpha: 0,
        y: 50,
        rotateX: -12,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
      });

      cards.forEach((card, i) => {
        const strokes = card.querySelectorAll<SVGGeometryElement>(
          "[data-step-icon] path, [data-step-icon] circle, [data-step-icon] rect, [data-step-icon] line",
        );
        strokes.forEach((el) => {
          const len = el.getTotalLength?.() ?? 0;
          if (!len) return;
          gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
        });
        tl.to(strokes, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0.35 + i * 0.1);
        tl.from(
          card.querySelector("[data-step-fill]"),
          { scale: 0, duration: 0.6, ease: "back.out(2)" },
          0.5 + i * 0.1,
        );
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-background py-20 md:py-28">
      {/* Soft pastel wash, like the reference — built from brand tokens */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-brand-blue/15 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-2/10 blur-[140px]" />
      </div>

      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="How We Work"
          title="From Idea to Launch — and Beyond"
          subtitle="Six clear steps, so you always know what's happening and what comes next."
          className="mb-14 md:mb-16"
        />

        <div ref={gridRef} className="grid gap-5 [perspective:1400px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {STEPS.map(({ step, title, description, icon: Icon }, i) => (
            // Outer div is GSAP's (entrance); inner article owns the CSS hover
            // transitions, so the two never fight over `transform`.
            <div key={step} data-step-card className="h-full">
              <article
                className="group relative h-full overflow-hidden rounded-[1.75rem] rounded-br-[5rem] border border-border bg-card/90 p-8 shadow-sm backdrop-blur transition-[border-radius,transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-2 hover:rounded-br-[1.75rem] hover:border-primary/40 hover:shadow-2xl md:p-10"
              >
                {/* Hover glow in the curved corner */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br from-primary/0 to-brand-blue/0 blur-2xl transition-colors duration-500 group-hover:from-primary/25 group-hover:to-brand-blue/25"
                />
                {/* Big faded step number */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-8 top-6 font-mono text-6xl font-black text-foreground/[0.05] transition-colors duration-500 group-hover:text-primary/15"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Duotone icon: soft filled disc behind a stroked outline */}
                <div className="relative h-16 w-16 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <span
                    data-step-fill
                    aria-hidden
                    className="absolute left-1 top-1 h-11 w-11 rounded-full bg-brand-blue/20"
                  />
                  <Icon data-step-icon strokeWidth={1.5} className="relative h-16 w-16 text-brand-blue" />
                </div>

                <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  Step {String(i + 1).padStart(2, "0")} · {step}
                </p>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground md:text-2xl">{title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
