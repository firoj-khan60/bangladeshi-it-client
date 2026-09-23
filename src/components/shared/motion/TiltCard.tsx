"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees on each axis. */
  max?: number;
  /** Soft light spot that follows the pointer. */
  glare?: boolean;
}

/**
 * CSS-3D tilt-on-hover card. Pointer position drives rotateX/Y through CSS
 * variables (no React re-renders). Mouse only — touch and reduced-motion
 * users get a flat card.
 */
export default function TiltCard({
  children,
  className,
  max = 8,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
    el.style.setProperty("--glare", "1");
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glare", "0");
  };

  return (
    <div className="h-full [perspective:1000px]">
      <div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={cn(
          "relative h-full transition-transform duration-300 ease-out [transform-style:preserve-3d]",
          "[transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]",
          className,
        )}
      >
        {children}
        {glare && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
            style={{
              opacity: "var(--glare, 0)",
              background:
                "radial-gradient(circle at var(--gx,50%) var(--gy,50%), color-mix(in oklch, var(--primary) 18%, transparent), transparent 55%)",
            }}
          />
        )}
      </div>
    </div>
  );
}
