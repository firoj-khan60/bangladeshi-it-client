"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Megaphone, LayoutDashboard, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { INTRO_DONE_EVENT, SESSION_KEY } from "@/components/shared/IntroPreloader";
import Starfield from "@/components/shared/motion/Starfield";
import HeroScene from "./HeroSceneLazy";

const ROTATING_WORDS = ["Websites", "Software", "Apps", "Platforms", "Systems"];

const CHIPS = [
  { label: "E-commerce", sub: "Stores that sell", icon: ShoppingCart, pos: "top-[8%] left-[2%]", delay: "0s" },
  { label: "POS · ERP · CRM", sub: "Run your business", icon: LayoutDashboard, pos: "bottom-[14%] left-[-4%]", delay: "-2s" },
  { label: "Digital Marketing", sub: "Grow your reach", icon: Megaphone, pos: "top-[30%] right-[-2%]", delay: "-4s" },
];

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Entrance — waits for the one-time IntroPreloader splash to finish so the
  // two animations hand off instead of overlapping.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let fallback: ReturnType<typeof setTimeout> | undefined;
    let onDone: (() => void) | undefined;

    const ctx = gsap.context((self) => {
      const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
      if (reduceMotion) {
        gsap.set(items, { autoAlpha: 1 });
        return;
      }
      gsap.set(items, { autoAlpha: 0, y: 28 });
      // Wrapped in self.add so a tween started later (after the splash) is
      // still owned by this context and reverted on unmount.
      const play = () =>
        self.add(() => {
          gsap.to(items, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.09 });
        });

      if (sessionStorage.getItem(SESSION_KEY)) {
        play();
      } else {
        onDone = () => {
          clearTimeout(fallback);
          play();
        };
        // Safety net in case the splash is skipped or never reports back.
        fallback = setTimeout(onDone, 7000);
        window.addEventListener(INTRO_DONE_EVENT, onDone, { once: true });
      }
    }, root);

    return () => {
      clearTimeout(fallback);
      if (onDone) window.removeEventListener(INTRO_DONE_EVENT, onDone);
      ctx.revert();
    };
  }, []);

  // Rotating headline word.
  useLayoutEffect(() => {
    const words = wordRefs.current.filter((w): w is HTMLSpanElement => !!w);
    if (words.length < 2) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(words, { position: "absolute", top: 0, left: 0, opacity: 0, y: 24 });
      gsap.set(words[0], { position: "relative", opacity: 1, y: 0 });
      if (reduceMotion) return;

      let i = 0;
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
      words.forEach(() => {
        const next = (i + 1) % words.length;
        tl.to(words[i], { opacity: 0, y: -20, duration: 0.35, ease: "power2.in" })
          .set(words[i], { position: "absolute" })
          .set(words[next], { position: "relative" })
          .fromTo(words[next], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
          .to({}, { duration: 1.4 });
        i = next;
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative isolate overflow-hidden bg-background">
      {/* Backdrop: blueprint grid, twinkling stars, brand glows */}
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
      <Starfield className="-z-10" />
      <div className="absolute -top-40 right-[-10%] -z-10 h-[520px] w-[520px] rounded-full bg-brand-blue/20 blur-[140px]" aria-hidden />
      <div className="absolute bottom-[-20%] left-[-10%] -z-10 h-[480px] w-[480px] rounded-full bg-primary/15 blur-[140px]" aria-hidden />

      <div className="container mx-auto grid min-h-[calc(100svh-5rem)] items-center gap-6 px-6 pt-12 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-8 lg:pb-24">
        {/* Copy */}
        <div className="relative z-10 text-center lg:text-left">
          <div data-hero-item className="opacity-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Software &amp; IT Solutions for Growing Businesses
            </span>
          </div>

          <h1
            data-hero-item
            className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-foreground opacity-0 sm:text-5xl md:text-6xl xl:text-7xl"
          >
            We Build{" "}
            <span className="relative inline-flex min-w-[9ch] justify-center overflow-hidden align-bottom lg:justify-start">
              {ROTATING_WORDS.map((word, i) => (
                <span
                  key={word}
                  className="text-gradient-brand pb-1"
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                >
                  {word}
                </span>
              ))}
            </span>
            <br />
            to Accelerate Your Business Growth
          </h1>

          <p
            data-hero-item
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground opacity-0 md:text-lg lg:mx-0"
          >
            From online stores to ERP, POS and mobile apps — we design, build and
            support the technology your business runs on, so it performs in the
            real world, not just on paper.
          </p>

          <div
            data-hero-item
            className="mt-8 flex flex-col items-center justify-center gap-3 opacity-0 sm:flex-row lg:justify-start"
          >
            <Button asChild size="lg" className="h-12 rounded-full px-8 font-bold shadow-xl shadow-primary/25">
              <Link href="/contact">
                Get a Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-8 font-bold backdrop-blur">
              <Link href="#services">Explore Services</Link>
            </Button>
          </div>
        </div>

        {/* 3D scene + floating chips */}
        <div data-hero-item className="relative mx-auto aspect-square w-full max-w-[340px] opacity-0 sm:max-w-[460px] lg:max-w-[580px]">
          <HeroScene />
          {CHIPS.map(({ label, sub, icon: Icon, pos, delay }) => (
            <div
              key={label}
              className={`animate-float absolute hidden items-center gap-3 rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-lg backdrop-blur-md sm:flex ${pos}`}
              style={{ animationDelay: delay }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-bold text-foreground">{label}</span>
                <span className="block text-[11px] text-muted-foreground">{sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:flex"
      >
        Scroll
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </Link>
    </section>
  );
}
