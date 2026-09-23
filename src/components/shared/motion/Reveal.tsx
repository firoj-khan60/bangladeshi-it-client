"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay between each `[data-reveal]` child. */
  stagger?: number;
  /** Starting vertical offset in px. */
  y?: number;
  delay?: number;
  id?: string;
}

/**
 * Scroll-triggered fade/slide-up. Animates every descendant marked
 * `data-reveal` (staggered), or the wrapper itself when none are marked.
 * Plays once, never reverses; skipped entirely under reduced motion.
 */
export default function Reveal({
  children,
  className,
  stagger = 0.08,
  y = 28,
  delay = 0,
  id,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const marked = root.querySelectorAll<HTMLElement>("[data-reveal]");
      const targets = marked.length ? Array.from(marked) : [root];
      gsap.set(targets, { autoAlpha: 0, y });
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger,
        delay,
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [stagger, y, delay]);

  return (
    <div ref={ref} id={id} className={cn(className)}>
      {children}
    </div>
  );
}
