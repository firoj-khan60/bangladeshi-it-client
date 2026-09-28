import { Metadata } from "next";
import TestimonialManager from "./_components/TestimonialManager";

export const metadata: Metadata = {
  title: "Testimonials | Admin Dashboard",
  description: "Manage the client testimonials shown on the home page",
};

export default function TestimonialsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
        <p className="text-muted-foreground">What your clients say - shown in the slider on the home page.</p>
      </div>

      <TestimonialManager />
    </div>
  );
}
