import { ShieldCheck, Zap, Code2, Headphones } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const features = [
  {
    title: "Fast Delivery",
    description:
      "We ship features on tight timelines without cutting corners on quality.",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    title: "Modern Stack",
    description:
      "Built with current, well-supported technologies designed to scale with you.",
    icon: Code2,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    title: "Reliable & Secure",
    description: "Security and stability are part of the build, not an afterthought.",
    icon: ShieldCheck,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    title: "24/7 Support",
    description: "Our support team is always here to help after launch, not just before it.",
    icon: Headphones,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
];

export default function Features() {
  return (
    <section className="py-10">
      <SectionHeading
        eyebrow="Why Bangladeshi IT"
        title="Built For Businesses That Need Reliable Technology"
        className="mb-10"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <div
            key={i}
            className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
          >
            <div
              className={`${feature.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
            >
              <feature.icon className={`h-7 w-7 ${feature.color}`} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
