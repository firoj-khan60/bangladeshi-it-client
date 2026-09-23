"use client";

import dynamic from "next/dynamic";

// WebGL scene is code-split and client-only so three.js never blocks first
// paint or ships to pages that don't render the hero.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
      <div className="h-2/3 w-2/3 rounded-full border border-primary/20 bg-primary/5 blur-sm" />
    </div>
  ),
});

export default HeroScene;
