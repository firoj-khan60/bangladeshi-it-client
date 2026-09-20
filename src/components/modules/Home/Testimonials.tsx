import { Star } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";

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
    <section className="py-10">
      <SectionHeading
        eyebrow="Testimonials"
        title="What Our Clients Say"
        subtitle="Hear from the businesses we've built software for."
        className="mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${index < t.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
                />
              ))}
            </div>
            <p className="text-slate-600 font-medium leading-relaxed mb-8 flex-1 italic">
              &quot;{t.content}&quot;
            </p>
            <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm">{t.name}</h4>
                <p className="text-primary font-bold text-[10px] uppercase tracking-widest">
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
