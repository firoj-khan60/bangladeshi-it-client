import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/motion/Reveal";
import { getPublicTestimonials } from "@/services/testimonial.services";
import { IPublicTestimonial } from "@/types/testimonial.types";
import TestimonialSlider from "./TestimonialSlider";

export default async function Testimonials() {
  const testimonials = await getPublicTestimonials()
    .then((res) => res.data ?? [])
    .catch(() => [] as IPublicTestimonial[]);

  // Managed from Dashboard → Testimonials; hidden until there is at least one
  if (testimonials.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-muted/50 py-20 md:py-28">
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10 blur-[130px]" aria-hidden />
      <div className="container relative mx-auto px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          subtitle="Hear from the businesses we've built software for."
          className="mb-12 md:mb-16"
        />

        <Reveal y={24}>
          <TestimonialSlider testimonials={testimonials} />
        </Reveal>
      </div>
    </section>
  );
}
