import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroCarousel() {
  return (
    <section className="relative w-full overflow-hidden rounded-[2.5rem] bg-slate-900 py-20 md:py-28 px-6 md:px-12 text-center">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 rounded-full px-4 py-1.5">
          Software & IT Solutions
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
          We Build Software That Moves Your Business Forward
        </h1>
        <p className="text-slate-400 text-base md:text-lg font-medium max-w-xl mx-auto">
          Web apps, internal tools, and IT solutions designed around how your team actually works.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="rounded-full px-8 font-bold shadow-xl shadow-primary/20">
            <Link href="/contact">
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8 font-bold border-white/20 text-white hover:bg-white/10 hover:text-white">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
