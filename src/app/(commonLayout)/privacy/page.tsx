"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Settings,
  Trash2,
  Mail,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CmsPageContent } from "@/components/shared/CmsContentPage";

export default function PrivacyPage() {
  // Privacy Settings Simulation States
  const [personalization, setPersonalization] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  // Deletion Request States
  const [deletionEmail, setDeletionEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = (setting: string, val: boolean, label: string) => {
    if (setting === "personalization") setPersonalization(val);
    if (setting === "analytics") setAnalytics(val);
    if (setting === "marketing") setMarketing(val);
    
    toast.success(`${label} has been ${val ? "enabled" : "disabled"}.`);
  };

  const handleRequestDeletion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deletionEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }
    
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      toast.success("Erase Request Sent! A verification link has been sent to " + deletionEmail, {
        description: "Your data will be securely purged after verification.",
        duration: 5000,
      });
      setDeletionEmail("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Header */}
      <section className="relative py-20 bg-white dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="absolute top-0 left-0 w-125 h-125 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/4" />
        <div className="absolute bottom-0 right-0 w-75 h-75 bg-primary/10 rounded-full blur-[80px] translate-y-1/3 translate-x-1/3" />
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-primary font-black text-xs uppercase tracking-widest">Privacy Protection</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Your trust is our most valuable asset. Learn how we collect, store, safeguard, and use your data.
          </p>
          <div className="mt-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Last Updated: May 22, 2026
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Interactive Preference Dashboard & Request Erasure */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Preference Dashboard */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">Privacy Controls</h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Simulate your tracking preferences</p>
                </div>
              </div>
              
              <div className="h-px bg-slate-100 dark:bg-slate-800" />
              
              <div className="space-y-6">
                {/* Setting 1 */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-800 dark:text-slate-100">Personalization Cookies</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium leading-relaxed">
                      Enables tailored content, recommendations, and personalized offers.
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("personalization", !personalization, "Personalization grid")}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                      personalization ? "bg-primary" : "bg-slate-200 dark:bg-slate-800"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        personalization ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Setting 2 */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-800 dark:text-slate-100">Analytical Logs</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium leading-relaxed">
                      Anonymously records page load times, search errors, and device layouts.
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("analytics", !analytics, "Analytical cookies")}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                      analytics ? "bg-primary" : "bg-slate-200 dark:bg-slate-800"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        analytics ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Setting 3 */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-800 dark:text-slate-100">Marketing & Newsletters</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium leading-relaxed">
                      Sends product updates, promotions, and system feature releases.
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("marketing", !marketing, "Marketing newsletters")}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                      marketing ? "bg-primary" : "bg-slate-200 dark:bg-slate-800"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        marketing ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Request Data Erasure Form */}
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-3 bg-white/10 rounded-2xl">
                  <Trash2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-black">Erase My Data</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Rights to be forgotten</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 font-medium leading-relaxed relative z-10">
                Submit your registered email address below. We will send you a verification link to confirm account removal and completely delete your account activity, profile information, and cache records.
              </p>

              <form onSubmit={handleRequestDeletion} className="space-y-4 relative z-10">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={deletionEmail}
                    onChange={(e) => setDeletionEmail(e.target.value)}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-primary/50 transition-all font-bold"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isDeleting}
                  className="w-full h-12 rounded-xl bg-primary hover:opacity-90 transition-opacity text-white font-black uppercase tracking-widest text-xs"
                >
                  {isDeleting ? "Processing..." : "Request Data Erasure"}
                </Button>
              </form>

              <div className="flex gap-2 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-xs text-yellow-500 font-bold relative z-10 leading-relaxed">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <span>Caution: This action is irreversible. Once confirmed, your account data, activity history, and files will be permanently purged.</span>
              </div>
            </div>
          </div>

          {/* Right Column: CMS-Backed Privacy Details */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
              <CmsPageContent slug="privacy-policy" titleClassName="mb-8" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
