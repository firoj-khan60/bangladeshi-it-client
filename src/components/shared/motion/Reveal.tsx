"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

let layoutWatcher: ResizeObserver | null = null;

/**
 * Trigger positions are measured once, so content that changes height after
 * load (async FAQ, images) leaves later sections' triggers stale and their
 * reveal fires late. One shared observer re-measures whenever the page grows
 * or shrinks.
 */
function watchLayout() {
  if (layoutWatcher || typeof ResizeObserver === "undefined") return;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastHeight = document.body.scrollHeight;
  layoutWatcher = new ResizeObserver(() => {
    const h = document.body.scrollHeight;
    if (h === lastHeight) return;
    lastHeight = h;
    clearTimeout(timer);
    timer = setTimeout(() => ScrollTrigger.refresh(), 150);
  });
  layoutWatcher.observe(document.body);
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay between each `[data-reveal]` child. */
  stagger?: number;
  /** Starting vertical offset in px. */
  y?: number;
  delay?: number;
  /** ScrollTrigger start position. */
  start?: string;
  /** Tween duration in seconds. */
  duration?: number;
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
  start = "top 85%",
  duration = 0.8,
  id,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    watchLayout();

    const ctx = gsap.context(() => {
      const marked = root.querySelectorAll<HTMLElement>("[data-reveal]");
      const targets = marked.length ? Array.from(marked) : [root];
      gsap.set(targets, { autoAlpha: 0, y });
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        duration,
        ease: "power3.out",
        stagger,
        delay,
        scrollTrigger: {
          trigger: root,
          start,
          toggleActions: "play none none none",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [stagger, y, delay, start, duration]);

  return (
    <div ref={ref} id={id} className={cn(className)}>
      {children}
    </div>
  );
}
