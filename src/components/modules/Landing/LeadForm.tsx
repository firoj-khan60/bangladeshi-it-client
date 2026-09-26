"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICreateLeadPayload } from "@/types/lead.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  businessName: string;
  websiteUrl: string;
  note: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  businessName: "",
  websiteUrl: "",
  note: "",
};

const TEXT = {
  bn: {
    nameRequired: "আপনার নাম লিখুন",
    phoneInvalid: "সঠিক ফোন নম্বর লিখুন",
    emailInvalid: "সঠিক ইমেইল লিখুন",
    serviceRequired: "একটি সার্ভিস বেছে নিন",
    errorTitle: "দুঃখিত, পাঠানো যায়নি",
    errorDescription: "একটু পরে আবার চেষ্টা করুন অথবা সরাসরি কল করুন।",
    thanks: (name: string) => `ধন্যবাদ, ${name}!`,
    received: "আপনার তথ্য আমরা পেয়েছি। আমাদের টিম খুব শীঘ্রই আপনার সাথে যোগাযোগ করবে।",
    another: "আরেকটি রিকোয়েস্ট পাঠান",
    optional: "(ঐচ্ছিক)",
    nameLabel: "আপনার নাম *",
    namePlaceholder: "পূর্ণ নাম",
    phoneLabel: "ফোন / WhatsApp নম্বর *",
    emailLabel: "ইমেইল",
    serviceLabel: "কোন সার্ভিস দরকার? *",
    servicePlaceholder: "সার্ভিস বেছে নিন",
    businessLabel: "ব্যবসার নাম",
    businessPlaceholder: "আপনার ব্যবসা / ব্র্যান্ড",
    websiteLabel: "Website / Facebook Page",
    noteLabel: "আপনার সমস্যা বা প্রয়োজন",
    notePlaceholder: "যেমন: Facebook Ads চালাচ্ছি কিন্তু Purchase event ঠিকমতো দেখাচ্ছে না…",
    sending: "পাঠানো হচ্ছে…",
    submit: "ফ্রি অডিট রিকোয়েস্ট পাঠান",
    privacy: "আপনার তথ্য সম্পূর্ণ গোপন রাখা হবে। সাধারণত ২৪ ঘণ্টার মধ্যে আমরা যোগাযোগ করি।",
  },
  en: {
    nameRequired: "Please enter your name",
    phoneInvalid: "Please enter a valid phone number",
    emailInvalid: "Please enter a valid email",
    serviceRequired: "Please choose a service",
    errorTitle: "Sorry, your message wasn't sent",
    errorDescription: "Please try again in a moment or call us directly.",
    thanks: (name: string) => `Thank you, ${name}!`,
    received: "We've received your message. Our team will get back to you shortly.",
    another: "Send another message",
    optional: "(optional)",
    nameLabel: "Your name *",
    namePlaceholder: "Full name",
    phoneLabel: "Phone / WhatsApp *",
    emailLabel: "Email",
    serviceLabel: "Which service do you need? *",
    servicePlaceholder: "Choose a service",
    businessLabel: "Business name",
    businessPlaceholder: "Your business / brand",
    websiteLabel: "Website / Facebook Page",
    noteLabel: "Your message",
    notePlaceholder: "Tell us a little about your project or what you need help with…",
    sending: "Sending…",
    submit: "Send Message",
    privacy: "Your details are kept private. We usually reply within 24 hours.",
  },
};

interface LeadFormProps {
  /** Service options shown in the dropdown. */
  services: string[];
  /** Page identifier stored with the lead, e.g. "tracking-setup" or "contact". */
  source: string;
  /** UI language — landing pages are Bangla, the rest of the site English. */
  locale?: keyof typeof TEXT;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export default function LeadForm({ services, source, locale = "bn" }: LeadFormProps) {
  const t = TEXT[locale];
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const update = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = t.nameRequired;
    if (!/^\+?[0-9\s-]{10,16}$/.test(form.phone.trim())) next.phone = t.phoneInvalid;
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = t.emailInvalid;
    if (!form.service) next.service = t.serviceRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Bots fill every field; real visitors never see this one
    if (honeypot) {
      setSubmittedName(form.name.trim());
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const payload: ICreateLeadPayload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      service: form.service,
      businessName: form.businessName.trim() || undefined,
      websiteUrl: form.websiteUrl.trim() || undefined,
      note: form.note.trim() || undefined,
      source,
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    };

    setIsSubmitting(true);
    try {
      // Posted from the browser (not a server action) so the API's rate
      // limiter sees the visitor's IP rather than the Next.js server's
      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.success) {
        throw new Error(body?.message || "Submission failed");
      }

      // Conversion event for GTM → Meta Pixel / GA4 / Google Ads
      window.dataLayer?.push({ event: "generate_lead", lead_source: source, service: payload.service });

      setSubmittedName(payload.name);
      setForm(EMPTY_FORM);
    } catch (error) {
      console.error("Lead submission failed:", error);
      toast.error(t.errorTitle, { description: t.errorDescription });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedName) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
          <CheckCircle2 className="h-9 w-9 text-highlight" />
        </span>
        <h3 className="text-2xl font-bold">{t.thanks(submittedName)}</h3>
        <p className="max-w-sm text-muted-foreground">
          {t.received}
        </p>
        <Button variant="outline" className="mt-2 rounded-full" onClick={() => setSubmittedName(null)}>
          {t.another}
        </Button>
      </div>
    );
  }

  const fieldError = (field: keyof FormState) =>
    errors[field] && <p className="text-xs font-medium text-destructive">{errors[field]}</p>;

  return (
    <form onSubmit={handleSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="lead-name">{t.nameLabel}</Label>
        <Input
          id="lead-name"
          autoComplete="name"
          placeholder={t.namePlaceholder}
          value={form.name}
          onChange={(e) => update("name")(e.target.value)}
          aria-invalid={!!errors.name}
          className="h-11"
        />
        {fieldError("name")}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-phone">{t.phoneLabel}</Label>
        <Input
          id="lead-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="01XXXXXXXXX"
          value={form.phone}
          onChange={(e) => update("phone")(e.target.value)}
          aria-invalid={!!errors.phone}
          className="h-11"
        />
        {fieldError("phone")}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-email">
          {t.emailLabel} <span className="font-normal text-muted-foreground">{t.optional}</span>
        </Label>
        <Input
          id="lead-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => update("email")(e.target.value)}
          aria-invalid={!!errors.email}
          className="h-11"
        />
        {fieldError("email")}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-service">{t.serviceLabel}</Label>
        <Select value={form.service} onValueChange={update("service")}>
          <SelectTrigger id="lead-service" aria-invalid={!!errors.service} className="h-11! w-full">
            <SelectValue placeholder={t.servicePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldError("service")}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-business">
          {t.businessLabel} <span className="font-normal text-muted-foreground">{t.optional}</span>
        </Label>
        <Input
          id="lead-business"
          autoComplete="organization"
          placeholder={t.businessPlaceholder}
          value={form.businessName}
          onChange={(e) => update("businessName")(e.target.value)}
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-website">
          {t.websiteLabel} <span className="font-normal text-muted-foreground">{t.optional}</span>
        </Label>
        <Input
          id="lead-website"
          autoComplete="url"
          placeholder="https://example.com"
          value={form.websiteUrl}
          onChange={(e) => update("websiteUrl")(e.target.value)}
          className="h-11"
        />
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="lead-note">
          {t.noteLabel} <span className="font-normal text-muted-foreground">{t.optional}</span>
        </Label>
        <Textarea
          id="lead-note"
          rows={4}
          placeholder={t.notePlaceholder}
          value={form.note}
          onChange={(e) => update("note")(e.target.value)}
        />
      </div>

      {/* Honeypot — hidden from people, visible to naive bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="lead-company">Company</label>
        <input
          id="lead-company"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="sm:col-span-2">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-12 w-full rounded-full text-base font-bold shadow-xl shadow-primary/25"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t.sending}
            </>
          ) : (
            <>
              {t.submit} <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {t.privacy}
        </p>
      </div>
    </form>
  );
}
