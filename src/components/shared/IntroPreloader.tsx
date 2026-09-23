"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";

/**
 * IntroPreloader — "Big Bang Cinematic"
 * Phase 1: Singularity — logo is born from a glowing point
 * Phase 2: Tension       — glow + logo breathe and grow
 * Phase 3: Big Bang      — explosion, flash, shockwaves, nebula burst
 * Phase 4: Cosmic settle — universe fades, site revealed
 *
 * Plays once per browser session (gated by sessionStorage) so repeat
 * navigations inside the same visit never replay it.
 */

export const SESSION_KEY = "bit_intro_played";
/** Fired on window once the splash has faded out, so page entrances can follow it. */
export const INTRO_DONE_EVENT = "bit:intro-done";

const GREEN = "14,110,90"; // brand green sampled from the logo mark
const GREEN_LIGHT = "60,150,120";
const MIST = "205,235,225"; // near-white with a green tint
const RED = "214,52,48"; // brand red accent (flag pairing with the green)

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  alpha: number;
  maxA: number;
  col: string;
  live: boolean;
  prog: number;
  spd: number;
  alphaStartF: number;
  alphaDecay: number;
};

type Streak = {
  ang: number;
  len: number;
  alpha: number;
  w: number;
  col: string;
  riseStartF: number;
  fallStartF: number;
};

type Nebula = {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
  col: string;
  live: boolean;
  falling: boolean;
  delayF: number;
  aRise: number;
  aFall: number;
  fallStartF: number;
};

export default function IntroPreloader() {
  const [visible, setVisible] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const r1Ref = useRef<HTMLDivElement>(null);
  const r2Ref = useRef<HTMLDivElement>(null);
  const r3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (sessionStorage.getItem(SESSION_KEY)) {
      if (root) root.style.display = "none";
      return;
    }

    const canvas = canvasRef.current;
    const center = centerRef.current;
    const glowEl = glowRef.current;
    const logo = logoRef.current;
    const flash = flashRef.current;
    const rings = [r1Ref.current, r2Ref.current, r3Ref.current];

    if (!root || !canvas || !center || !glowEl || !logo || !flash) {
      if (root) root.style.display = "none";
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const finish = () => {
      document.body.style.overflow = prevOverflow;
      sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(false);
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    };

    if (prefersReducedMotion) {
      gsap.to(logo, {
        opacity: 1,
        duration: 0.4,
        onComplete: () => {
          gsap.to(root, { opacity: 0, duration: 0.4, delay: 0.3, onComplete: finish });
        },
      });
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setVisible(false);
      return;
    }

    const W = (canvas.width = window.innerWidth);
    const H = (canvas.height = window.innerHeight);
    const cx = W * 0.5;
    const cy = H * 0.5;
    const isMobile = W < 768;

    const COUNT = isMobile ? 65 : 130;
    const STREAK_N = isMobile ? 14 : 24;
    const NEBULA_N = isMobile ? 5 : 9;

    const particles: Particle[] = [];
    for (let i = 0; i < COUNT; i++) {
      const ang = Math.random() * 6.283;
      const dist = (0.12 + Math.random() * 0.88) * Math.min(W, H) * 0.56;
      const roll = Math.random();
      const col = roll < 0.42 ? GREEN : roll < 0.62 ? GREEN_LIGHT : roll < 0.78 ? MIST : RED;
      particles.push({
        x: cx,
        y: cy,
        tx: cx + Math.cos(ang) * dist,
        ty: cy + Math.sin(ang) * dist,
        size: 0.5 + Math.random() * 2.4,
        alpha: 0,
        maxA: 0.28 + Math.random() * 0.72,
        col,
        live: false,
        prog: 0,
        spd: 0,
        alphaStartF: 0,
        alphaDecay: 0,
      });
    }

    const streaks: Streak[] = [];
    for (let i = 0; i < STREAK_N; i++) {
      const ang = (i / STREAK_N) * 6.283 + (Math.random() - 0.5) * 0.35;
      streaks.push({
        ang,
        len: (0.22 + Math.random() * 0.78) * Math.min(W, H) * 0.72,
        alpha: 0,
        w: 0.3 + Math.random() * 1.8,
        col: Math.random() < 0.55 ? GREEN : GREEN_LIGHT,
        riseStartF: 0,
        fallStartF: 0,
      });
    }

    const nebulae: Nebula[] = [];
    for (let i = 0; i < NEBULA_N; i++) {
      const ang = (i / NEBULA_N) * 6.283 + Math.random() * 0.8;
      const dist = (0.04 + Math.random() * 0.28) * Math.min(W, H);
      nebulae.push({
        x: cx + Math.cos(ang) * dist,
        y: cy + Math.sin(ang) * dist,
        r: 0,
        maxR: (0.14 + Math.random() * 0.22) * Math.min(W, H),
        alpha: 0,
        col: Math.random() < 0.6 ? GREEN : "6,54,42",
        live: false,
        falling: false,
        delayF: 0,
        aRise: 0,
        aFall: 0,
        fallStartF: 0,
      });
    }

    let rafId = 0;
    let rafRunning = false;
    let bangFrame = -1;

    function draw() {
      if (!rafRunning || !ctx) return;
      ctx.clearRect(0, 0, W, H);

      if (bangFrame >= 0) bangFrame++;

      nebulae.forEach((n) => {
        if (!n.live) return;
        if (bangFrame < n.delayF) return;

        if (n.r < n.maxR) {
          n.r += (n.maxR - n.r) * 0.18;
          if (n.maxR - n.r < 0.5) n.r = n.maxR;
        }

        if (!n.falling) {
          n.alpha = Math.min(0.75, n.alpha + n.aRise);
          if (bangFrame >= n.fallStartF) n.falling = true;
        } else {
          n.alpha = Math.max(0, n.alpha - n.aFall);
        }

        if (n.alpha < 0.005) return;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r || 1);
        g.addColorStop(0, `rgba(${n.col},${(n.alpha * 0.55).toFixed(3)})`);
        g.addColorStop(0.45, `rgba(${n.col},${(n.alpha * 0.22).toFixed(3)})`);
        g.addColorStop(1, `rgba(${n.col},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r || 1, 0, 6.283);
        ctx.fillStyle = g;
        ctx.fill();
      });

      streaks.forEach((s) => {
        if (bangFrame < s.riseStartF) return;

        if (bangFrame < s.fallStartF) {
          s.alpha += (0.92 - s.alpha) * 0.28;
        } else {
          s.alpha *= 0.91;
        }

        if (s.alpha < 0.005) return;
        const ex = cx + Math.cos(s.ang) * s.len * (s.alpha / 0.92);
        const ey = cy + Math.sin(s.ang) * s.len * (s.alpha / 0.92);
        const g = ctx.createLinearGradient(cx, cy, ex, ey);
        g.addColorStop(0, `rgba(${s.col},${Math.min(s.alpha * 0.9, 1).toFixed(3)})`);
        g.addColorStop(1, `rgba(${s.col},0)`);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = g;
        ctx.lineWidth = s.w;
        ctx.stroke();
      });

      particles.forEach((p) => {
        if (!p.live || p.alpha < 0.005) return;

        if (p.prog < 1) {
          p.prog = Math.min(1, p.prog + p.spd);
          const e = 1 - (1 - p.prog) * (1 - p.prog);
          p.x = cx + (p.tx - cx) * e;
          p.y = cy + (p.ty - cy) * e;
        }

        if (bangFrame >= p.alphaStartF) {
          p.alpha = Math.max(0, p.alpha - p.alphaDecay);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 6.283);
        ctx.fillStyle = `rgba(${p.col},${p.alpha.toFixed(3)})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    function triggerBang() {
      bangFrame = 0;
      rafRunning = true;

      particles.forEach((p) => {
        p.live = true;
        p.alpha = p.maxA;
        p.prog = 0;
        const dur = 1.1 + Math.random() * 1.5;
        p.spd = 1 / (dur * 60);
        const delay = 0.2 + Math.random() * 0.55;
        p.alphaStartF = Math.floor(delay * 60);
        p.alphaDecay = p.maxA / (dur * 0.65 * 60);
      });

      streaks.forEach((s, i) => {
        s.alpha = 0;
        s.riseStartF = Math.floor(i * 0.006 * 60);
        s.fallStartF = Math.floor((0.38 + i * 0.01) * 60);
      });

      nebulae.forEach((n, i) => {
        n.live = true;
        n.alpha = 0;
        n.r = 0;
        n.falling = false;
        const fadeDur = 0.5 + Math.random() * 0.6;
        n.delayF = Math.floor(i * 0.02 * 60);
        n.aRise = 0.75 / (0.38 * 60);
        n.aFall = 0.75 / (fadeDur * 60);
        n.fallStartF = Math.floor((0.35 + i * 0.03) * 60);
      });

      draw();
    }

    gsap.set(logo, { opacity: 1 });
    gsap.set(center, { scale: 0.008, opacity: 0 });
    gsap.set(glowEl, { scale: 0, opacity: 0 });
    gsap.set(flash, { opacity: 0 });
    rings.forEach((r) => r && gsap.set(r, { scale: 0, opacity: 0 }));

    gsap.ticker.lagSmoothing(0);

    const tl = gsap.timeline({
      onComplete() {
        gsap.ticker.lagSmoothing(500, 33);
        rafRunning = false;
        cancelAnimationFrame(rafId);
        ctx.clearRect(0, 0, W, H);
        finish();
      },
    });

    tl.to(center, { scale: 0.06, opacity: 1, duration: 0.5, ease: "power2.out" })
      .to(glowEl, { scale: 1, opacity: 0.4, duration: 0.65, ease: "power2.out" }, "-=.28")
      .to(center, { scale: 0.68, duration: 1.9, ease: "power1.inOut" })
      .to(glowEl, { scale: 4.4, opacity: 0.95, duration: 1.7, ease: "power1.inOut" }, "-=1.7")
      // Hold — logo sits still at the closer, larger size so "Bangladeshi IT"
      // is legible right before the implosion/explosion.
      .to(center, { scale: 0.48, duration: 0.18, ease: "power2.in" }, "+=.6")
      .to(glowEl, { scale: 2.8, opacity: 0.85, duration: 0.18, ease: "power2.in" }, "<")
      .call(triggerBang)
      .to(center, { scale: 55, opacity: 0, duration: 0.65, ease: "expo.in" })
      .to(flash, { opacity: 1, duration: 0.12, ease: "power4.out" }, "-=.62")
      .to(glowEl, { scale: 10, opacity: 0, duration: 0.55, ease: "power2.out" }, "-=.62")
      .to(rings[0], { scale: 1, opacity: 0.85, duration: 0.5, ease: "expo.out" }, "-=.58")
      .to(rings[1], { scale: 1, opacity: 0.55, duration: 0.65, ease: "expo.out" }, "-=.52")
      .to(rings[2], { scale: 1, opacity: 0.35, duration: 0.82, ease: "expo.out" }, "-=.48")
      .to(flash, { opacity: 0, duration: 0.55, ease: "power2.out" }, "-=.25")
      .to(rings, { opacity: 0, duration: 0.65, stagger: 0.1, ease: "power2.in" }, "-=.38")
      .to(root, { opacity: 0, duration: 0.55, ease: "power2.inOut" }, "-=.35");

    return () => {
      rafRunning = false;
      cancelAnimationFrame(rafId);
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={rootRef} style={styles.preloader} aria-hidden="true">
      <canvas ref={canvasRef} style={styles.canvas} />

      <div style={styles.ringWrap}>
        <div ref={r1Ref} style={{ ...styles.ring, ...styles.r1 }} />
        <div ref={r2Ref} style={{ ...styles.ring, ...styles.r2 }} />
        <div ref={r3Ref} style={{ ...styles.ring, ...styles.r3 }} />
      </div>

      <div ref={flashRef} style={styles.flash} />

      <div ref={centerRef} style={styles.center}>
        <div ref={glowRef} style={styles.glow} />
        {/* eslint-disable-next-line @next/next/no-img-element -- GSAP drives this
            element's size/opacity/transform directly via the DOM ref for the
            splash animation; next/image's fixed width/height + layout wrapper
            fight that, and it's a decorative one-time overlay, not LCP content. */}
        <img
          ref={logoRef}
          src="/logo1.png"
          alt="Bangladeshi IT"
          style={styles.logo}
        />
      </div>
    </div>
  );
}

// Inline styles on purpose: this overlay must render correctly regardless of
// whether styled-jsx's CSS extraction is available in the current build
// pipeline, and every dynamic value here (color mixes, gsap-driven
// transforms) is easier to reason about as plain style objects anyway.
const styles: Record<string, CSSProperties> = {
  preloader: {
    position: "fixed",
    inset: 0,
    // Must outrank every other fixed overlay, including the route-level
    // loading.tsx Suspense fallback, which can mount later in DOM order
    // and would otherwise paint over this.
    zIndex: 2147483647,
    background: "#050807",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    willChange: "opacity",
  },
  canvas: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 1,
  },
  ringWrap: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    zIndex: 3,
  },
  ring: {
    position: "absolute",
    borderRadius: "50%",
    opacity: 0,
    willChange: "transform, opacity",
  },
  r1: {
    width: "160vmax",
    height: "160vmax",
    border: `1.5px solid rgba(${GREEN}, 0.85)`,
  },
  r2: {
    width: "215vmax",
    height: "215vmax",
    border: `1px solid rgba(${GREEN_LIGHT}, 0.5)`,
  },
  r3: {
    width: "280vmax",
    height: "280vmax",
    border: `0.5px solid rgba(${RED}, 0.3)`,
  },
  flash: {
    position: "absolute",
    inset: 0,
    background: `radial-gradient(circle at center, rgba(230, 250, 240, 0.96) 0%, rgba(${GREEN}, 0.45) 38%, transparent 68%)`,
    opacity: 0,
    pointerEvents: "none",
    zIndex: 4,
  },
  center: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    willChange: "transform, opacity",
    transformOrigin: "50% 50%",
    zIndex: 5,
  },
  glow: {
    position: "absolute",
    width: "clamp(200px, 40vw, 420px)",
    height: "clamp(200px, 40vw, 420px)",
    borderRadius: "50%",
    background: `radial-gradient(circle at center, rgba(${GREEN}, 0.9) 0%, rgba(${GREEN}, 0.35) 30%, rgba(${GREEN}, 0.1) 55%, transparent 72%)`,
    opacity: 0,
    willChange: "transform, opacity",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  logo: {
    height: "clamp(64px, 12vw, 180px)",
    width: "auto",
    position: "relative",
    zIndex: 2,
    opacity: 0,
    willChange: "transform, filter, opacity",
    filter: `drop-shadow(0 0 18px rgba(${GREEN}, 0.55))`,
  },
};
