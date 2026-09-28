"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { IPublicTestimonial } from "@/types/testimonial.types";

const AUTOPLAY_MS = 5000;

/**
 * Scroll-snap slider: 1 card on mobile, 2 on tablet, 3 on desktop.
 * Autoplays and loops; pauses while hovered/focused or the tab is hidden.
 */
export default function TestimonialSlider({ testimonials }: { testimonials: IPublicTestimonial[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  const getStep = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("li");
    if (!track || !card) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.offsetWidth + gap;
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({ left: index * getStep(), behavior: "smooth" });
    },
    [getStep],
  );

  const go = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      // Loop around at either end
      if (direction === 1 && track.scrollLeft >= maxScroll - 4) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else if (direction === -1 && track.scrollLeft <= 4) {
        track.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        track.scrollBy({ left: direction * getStep(), behavior: "smooth" });
      }
    },
    [getStep],
  );

  // Track which card is at the start + whether there is anything to scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const step = getStep();
      if (step) setActiveIndex(Math.round(track.scrollLeft / step));
      setCanScroll(track.scrollWidth > track.clientWidth + 4);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [getStep, testimonials.length]);

  // Autoplay
  useEffect(() => {
    if (isPaused || !canScroll) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (!document.hidden) go(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, canScroll, go]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <ul
        ref={trackRef}
        className="-mx-2 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-2 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t, i) => (
          <li
            key={t.id}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${testimonials.length}`}
            className="w-full shrink-0 snap-start md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
          >
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <Quote className="h-9 w-9 text-highlight/40" aria-hidden />
                <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={cn(
                        "h-4 w-4",
                        index < t.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30",
                      )}
                    />
                  ))}
                </div>
              </div>
              <blockquote className="mt-5 flex-1 leading-relaxed text-foreground/85">{t.content}</blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-bold text-highlight ring-2 ring-primary/30">
                  {t.avatar ? (
                    <Image src={t.avatar} alt={t.name} fill sizes="48px" className="object-cover" />
                  ) : (
                    t.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-foreground">{t.name}</p>
                  {t.role && <p className="truncate text-xs font-semibold text-muted-foreground">{t.role}</p>}
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {canScroll && (
        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border bg-card transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === activeIndex}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === activeIndex ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border bg-card transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
