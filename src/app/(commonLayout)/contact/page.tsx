import type { Metadata } from "next";
import {
  CalendarCheck,
  FileText,
  Mail,
  MapPin,
  MessageSquareReply,
  Phone,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
import Reveal from "@/components/shared/motion/Reveal";
import LeadForm from "@/components/modules/Landing/LeadForm";
import { ECOMMERCE, SERVICES } from "@/lib/serviceMenu";
import { getSiteSettings } from "@/services/siteSetting.services";

export const metadata: Metadata = {
  title: "Contact Us | Bangladeshi IT",
  description:
    "Talk to Bangladeshi IT about your website, e-commerce store, software or digital marketing project. We usually reply within 24 hours.",
};

// E-commerce + the 8 services from the navbar menu
const CONTACT_SERVICES = [ECOMMERCE, ...SERVICES].map((service) => service.title);

const NEXT_STEPS = [
  { icon: MessageSquareReply, title: "We reply quickly", text: "Usually within 24 hours, by phone, WhatsApp or email." },
  { icon: CalendarCheck, title: "Free consultation", text: "A short call to understand your business and goals." },
  { icon: FileText, title: "Clear proposal", text: "Scope, timeline and price — upfront, no surprises." },
];

const toTel = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
const toWhatsApp = (number: string) => `https://wa.me/${number.replace(/[^\d]/g, "")}`;

export default async function ContactPage() {
  const settings = await getSiteSettings()
    .then((res) => res.data)
    .catch(() => null);

  const phone = settings?.phone;
  const email = settings?.email;
  const whatsapp = settings?.whatsapp;
  const address = settings?.address;

  const quickContacts = [
    phone && { icon: Phone, label: "Call us", value: phone, href: toTel(phone) },
    whatsapp && { icon: FaWhatsapp, label: "WhatsApp", value: whatsapp, href: toWhatsApp(whatsapp), external: true },
    email && { icon: Mail, label: "Email us", value: email, href: `mailto:${email}` },
  ].filter(Boolean) as { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href: string; external?: boolean }[];

  const socials = [
    { icon: FaFacebookF, href: settings?.facebook, label: "Facebook" },
    { icon: FaInstagram, href: settings?.instagram, label: "Instagram" },
    { icon: FaLinkedinIn, href: settings?.linkedin, label: "LinkedIn" },
    { icon: FaYoutube, href: settings?.youtube, label: "YouTube" },
    { icon: FaTiktok, href: settings?.tiktok, label: "TikTok" },
  ].filter((social) => Boolean(social.href));

  return (
    <div className="overflow-x-clip bg-background">
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-6 pb-16 pt-14 md:pb-20 md:pt-20">
        <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
        <div className="absolute -left-32 -top-24 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" aria-hidden />
        <div className="absolute -right-24 top-24 -z-10 h-80 w-80 rounded-full bg-brand-red/10 blur-[120px]" aria-hidden />

        <Reveal className="container mx-auto text-center" y={24} stagger={0.08} start="top 100%">
          <span
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-highlight"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            Contact Us
          </span>
          <h1
            data-reveal
            className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Let&apos;s build something <span className="text-highlight">great together</span>
          </h1>
          <p data-reveal className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Tell us about your project — a new website, an online store, business software or marketing.
            We&apos;ll get back to you with a clear plan.
          </p>

          {quickContacts.length > 0 && (
            <div data-reveal className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
              {quickContacts.map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border bg-card p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {label}
                    </span>
                    <span className="block truncate font-bold text-foreground">{value}</span>
                  </span>
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </section>

      {/* Form + info */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="container mx-auto grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="rounded-[2rem] border bg-card p-6 shadow-2xl shadow-primary/5 md:p-10">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Send us a message</h2>
              <p className="mb-8 mt-2 text-muted-foreground">
                Pick the service you&apos;re interested in and we&apos;ll connect you with the right person.
              </p>
              <LeadForm services={CONTACT_SERVICES} source="contact" locale="en" />
            </div>
          </Reveal>

          <Reveal className="space-y-6 lg:col-span-5" delay={0.1} stagger={0.1}>
            {/* Brand card: address + socials */}
            <div
              data-reveal
              className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#0b8a4c_0%,#066938_45%,#03401f_100%)] p-8 text-white shadow-2xl shadow-primary/20 ring-1 ring-white/10"
            >
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-brand-red/25 blur-3xl" />

              <h3 className="relative text-xl font-bold">Visit or reach us</h3>
              <ul className="relative mt-6 space-y-5">
                {address && (
                  <li className="flex gap-4">
                    <MapPin className="h-5 w-5 shrink-0 text-white/80" />
                    <span className="text-white/90">{address}</span>
                  </li>
                )}
                {phone && (
                  <li className="flex gap-4">
                    <Phone className="h-5 w-5 shrink-0 text-white/80" />
                    <a href={toTel(phone)} className="text-white/90 hover:text-white hover:underline">
                      {phone}
                    </a>
                  </li>
                )}
                {email && (
                  <li className="flex gap-4">
                    <Mail className="h-5 w-5 shrink-0 text-white/80" />
                    <a href={`mailto:${email}`} className="break-all text-white/90 hover:text-white hover:underline">
                      {email}
                    </a>
                  </li>
                )}
              </ul>

              {socials.length > 0 && (
                <div className="relative mt-8 flex flex-wrap gap-2 border-t border-white/15 pt-6">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href as string}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-white hover:text-[#066938]"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* What happens next */}
            <div data-reveal className="rounded-[2rem] border bg-card p-8">
              <h3 className="text-lg font-bold text-foreground">What happens next?</h3>
              <ol className="mt-6 space-y-6">
                {NEXT_STEPS.map(({ icon: Icon, title, text }, i) => (
                  <li key={title} className="relative flex gap-4">
                    {i < NEXT_STEPS.length - 1 && (
                      <span aria-hidden className="absolute left-5 top-11 h-[calc(100%-1.5rem)] w-px bg-border" />
                    )}
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-highlight">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-foreground">{title}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        {/* Map */}
        {address && (
          <Reveal className="container mx-auto mt-8">
            <div className="overflow-hidden rounded-[2rem] border">
              <iframe
                title="Office location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                className="h-80 w-full grayscale-[30%] dark:opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        )}
      </section>
    </div>
  );
}
