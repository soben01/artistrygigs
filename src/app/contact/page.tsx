"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold tracking-widest uppercase text-cyan-300">
            <Mail className="h-3.5 w-3.5" />
            <span>Direct Studio Communication</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            For acquisitions, press inquiries, exhibition representation, or bespoke software engineering advisory.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-emerald-500/30 bg-[#111116] p-12 text-center space-y-4 shadow-2xl">
            <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
            <h2 className="text-2xl font-bold text-white">Message Transmitted</h2>
            <p className="text-sm text-neutral-300">
              Thank you for reaching out. The studio replies to all verified inquiries within 24 business hours.
            </p>
            <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
              Send Another Message
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-[#111116] p-8 sm:p-12 shadow-2xl space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs uppercase font-semibold text-neutral-400">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Eleanor Vance"
                  className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase font-semibold text-neutral-400">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="eleanor@domain.com"
                  className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs uppercase font-semibold text-neutral-400">
                Inquiry Topic
              </label>
              <select className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white focus:border-amber-500 focus:outline-none">
                <option value="acquisition">Artwork Acquisition / Provenance Question</option>
                <option value="commission">Custom Commission Exploration</option>
                <option value="engineering">Software Engineering / Tech Consulting</option>
                <option value="press">Press, Curatorial & Exhibition</option>
                <option value="other">General Studio Inquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs uppercase font-semibold text-neutral-400">
                Message Content
              </label>
              <textarea
                required
                rows={5}
                placeholder="Please share details regarding your inquiry..."
                className="w-full rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button type="submit" variant="gold" size="lg" disabled={loading} className="gap-2">
                <Send className="h-4 w-4" />
                <span>{loading ? "Sending..." : "Transmit Message"}</span>
              </Button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
