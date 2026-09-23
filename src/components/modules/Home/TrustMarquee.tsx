import { ShieldCheck, Rocket, Code2, Headphones, Lock, Gauge, Wallet, FileCheck2 } from "lucide-react";

const POINTS = [
  { label: "Secure by Default", icon: ShieldCheck },
  { label: "Fast Shipping", icon: Rocket },
  { label: "Modern Stack", icon: Code2 },
  { label: "24/7 Support", icon: Headphones },
  { label: "Data Privacy First", icon: Lock },
  { label: "Built to Scale", icon: Gauge },
  { label: "Transparent Pricing", icon: Wallet },
  { label: "You Own the Code", icon: FileCheck2 },
];

export default function TrustMarquee() {
  return (
    <section
      aria-label="Why teams choose us"
      className="group relative overflow-hidden border-y border-border bg-muted/50 py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      {/* Two identical halves so translateX(-50%) loops seamlessly */}
      <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {POINTS.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-2.5 px-8 text-foreground/80">
                <Icon className="h-4 w-4 text-primary" />
                <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.2em]">
                  {label}
                </span>
                <span className="ml-8 h-1 w-1 rounded-full bg-border" aria-hidden />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
