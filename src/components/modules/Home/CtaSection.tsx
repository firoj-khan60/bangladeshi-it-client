import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/shared/motion/Reveal";

export default function CtaSection() {
  return (
    <section className="bg-background px-6 pb-20 md:pb-28">
      <Reveal className="container mx-auto" start="top 95%" duration={0.6} stagger={0.06} y={20}>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-16 text-center shadow-2xl md:px-16 md:py-20">
          <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
          <div className="absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-primary/25 blur-[100px]" aria-hidden />
          <div className="absolute -bottom-24 -right-16 -z-10 h-80 w-80 rounded-full bg-brand-blue/25 blur-[110px]" aria-hidden />

          {/* Floating decorative shapes */}
          <div aria-hidden className="animate-float absolute left-[8%] top-[18%] hidden h-14 w-14 rotate-12 rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur md:block" />
          <div aria-hidden className="animate-float absolute bottom-[16%] right-[9%] hidden h-10 w-10 rounded-full border border-brand-blue/40 bg-brand-blue/10 md:block" style={{ animationDelay: "-3s" }} />

          <h2 data-reveal className="mx-auto max-w-3xl font-serif text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Have a project in mind? <span className="text-gradient-brand">Let&apos;s build it right.</span>
          </h2>
          <p data-reveal className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Tell us what you need — we&apos;ll reply with a clear plan, timeline and quote. No pressure, no jargon.
          </p>
          <div data-reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full px-8 font-bold shadow-xl shadow-primary/25">
              <Link href="/contact">
                Get a Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-8 font-bold">
              <Link href="/faq">
                <MessageCircle className="mr-2 h-4 w-4" /> Read the FAQ
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
