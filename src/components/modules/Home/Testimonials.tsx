import { Star, Quote } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/motion/Reveal";
import TiltCard from "@/components/shared/motion/TiltCard";

const testimonials = [
  {
    name: "Rizbi Ahmmad",
    role: "Startup Founder",
    content:
      "They delivered our platform ahead of schedule and stayed responsive well after launch. Communication was clear the entire way through.",
    avatar: "https://i.pravatar.cc/150?u=rizbi",
    rating: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "Operations Manager",
    content:
      "Our internal tools finally work the way we need them to. The team understood our workflow and built around it instead of forcing a generic template.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Lead",
    content:
      "Solid engineering and clear documentation. It's rare to find a team that explains tradeoffs instead of just shipping whatever's fastest.",
    avatar: "https://i.pravatar.cc/150?u=michael",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-muted/50 py-20 md:py-28">
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/3 translate-y-1/3 rounded-full bg-brand-blue/10 blur-[130px]" aria-hidden />
      <div className="container relative mx-auto px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          subtitle="Hear from the businesses we've built software for."
          className="mb-16"
        />

        <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-3" stagger={0.1}>
          {testimonials.map((t) => (
            <div key={t.name} data-reveal className="h-full">
              <TiltCard max={5} className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-xl">
                <Quote className="h-8 w-8 text-primary/40" aria-hidden />
                <div className="mt-4 flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${index < t.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <p className="mt-5 flex-1 leading-relaxed text-foreground/85">{t.content}</p>
                <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary/30">
                    <Image src={t.avatar} alt={t.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-foreground">{t.name}</h4>
                    <p className="text-xs font-semibold text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
