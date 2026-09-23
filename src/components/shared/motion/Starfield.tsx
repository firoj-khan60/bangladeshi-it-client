import { cn } from "@/lib/utils";

/** Small seeded PRNG — star positions are identical on server and client. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = { left: number; top: number; size: number; delay: number; duration: number; glow: boolean };

function makeStars(count: number, seed: number): Star[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const glow = rand() < 0.12;
    return {
      left: rand() * 100,
      top: rand() * 100,
      size: glow ? 2.5 + rand() * 1.5 : 1 + rand() * 1.4,
      delay: -rand() * 6,
      duration: 2.5 + rand() * 4,
      glow,
    };
  });
}

/**
 * Twinkling star dots across a section. Pure CSS (no JS at runtime), so it
 * costs nothing beyond the markup. Softer in light mode, full in dark mode.
 */
export default function Starfield({
  className,
  count = 90,
  seed = 2026,
}: {
  className?: string;
  count?: number;
  /** Different seeds give different (but stable) star layouts. */
  seed?: number;
}) {
  const stars = makeStars(count, seed);
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 opacity-50 dark:opacity-100", className)}>
      {stars.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-foreground"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: s.glow ? "0 0 6px 1px color-mix(in oklch, var(--foreground) 70%, transparent)" : undefined,
          }}
        />
      ))}
    </div>
  );
}
