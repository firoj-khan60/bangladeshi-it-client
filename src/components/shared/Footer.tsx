import { Mail, Phone, ArrowRight, Send, Building2 } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { ISiteSetting } from "@/types/siteSetting.types";

interface FooterProps {
  siteSettings?: ISiteSetting | null;
}

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
  ],
  legal: [
    { name: "FAQ", href: "/faq" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

export default function Footer({ siteSettings }: FooterProps) {
  const siteName = siteSettings?.siteName || "Bangladeshi IT";
  const description =
    siteSettings?.description ||
    "Software, web, and IT solutions built for growing businesses.";
  const email = siteSettings?.email || "contact@bangladeshiit.com";
  const phone = siteSettings?.phone || "+880 1700-000000";
  const copyrightText = siteSettings?.copyrightText || "All rights reserved.";

  const socialLinks = [
    {
      icon: FaFacebook,
      href: siteSettings?.facebook,
      color: "hover:bg-[#1877F2]",
    },
    {
      icon: FaInstagram,
      href: siteSettings?.instagram,
      color: "hover:bg-[#E4405F]",
    },
    {
      icon: FaYoutube,
      href: siteSettings?.youtube,
      color: "hover:bg-[#FF0000]",
    },
    {
      icon: FaLinkedin,
      href: siteSettings?.linkedin,
      color: "hover:bg-[#0A66C2]",
    },
    {
      icon: FaTiktok,
      href: siteSettings?.tiktok,
      color: "hover:bg-[#000000]",
    },
    {
      icon: FaWhatsapp,
      href: siteSettings?.whatsapp
        ? `https://wa.me/${siteSettings.whatsapp.replace(/[^\d]/g, "")}`
        : undefined,
      color: "hover:bg-[#25D366]",
    },
  ].filter((social) => Boolean(social.href));

  return (
    <footer className="bg-[#0f172a] pt-16 pb-8 mt-10 rounded-t-[3.5rem] relative overflow-hidden border-t border-white/5">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 overflow-hidden relative">
                {siteSettings?.logo ? (
                  <Image
                    src={siteSettings.logo}
                    alt={siteName}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                ) : (
                  <Building2 className="h-6 w-6 text-white" />
                )}
              </div>
              <span className="text-xl font-black text-white tracking-tighter">
                {siteName}
              </span>
            </Link>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
              {description}
            </p>
            <div className="pt-2">
              <p className="text-white text-xs font-black uppercase tracking-widest mb-4">
                Newsletter
              </p>
              <form className="relative max-w-xs group">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full h-11 bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 text-sm text-white placeholder:text-slate-500 outline-none focus:border-primary/50 transition-all"
                />
                <button className="absolute right-1 top-1 bottom-1 px-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-6 text-slate-500">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 text-sm font-bold hover:text-primary transition-colors inline-flex items-center group"
                    >
                      <ArrowRight
                        size={12}
                        className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-6 text-slate-500">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 text-sm font-bold hover:text-primary transition-colors inline-flex items-center group"
                    >
                      <ArrowRight
                        size={12}
                        className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail size={14} className="text-primary" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Email
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="text-slate-300 text-xs font-bold truncate block"
                  >
                    {email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Call Us
                  </p>
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="text-slate-300 text-xs font-bold"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href={social.href as string}
                  target="_blank"
                  className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:scale-110 transition-all duration-300 ${social.color}`}
                >
                  <social.icon size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 w-full mb-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-slate-500 font-bold text-xs">
              © {new Date().getFullYear()} {siteName}. {copyrightText}
            </p>
            <p className="text-[10px] text-slate-600 font-medium">
              Built with Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
