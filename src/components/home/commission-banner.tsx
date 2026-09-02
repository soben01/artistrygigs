import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Palette, FileText, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    icon: Palette,
    title: "1. Concept & Palette",
    desc: "Share your interior space, dimensions, color preferences, or reference ideas.",
  },
  {
    icon: FileText,
    title: "2. Formal Milestone Quote",
    desc: "Receive clear transparent pricing, canvas timeline, and material breakdown.",
  },
  {
    icon: Sparkles,
    title: "3. Studio Milestone Proofs",
    desc: "Get high-res in-progress studio photos as layers of paint and gold leaf cure.",
  },
  {
    icon: PackageCheck,
    title: "4. Insured Delivery & COA",
    desc: "Custom timber-crated shipment delivered insured to your door with Certificate.",
  },
];

export function CommissionBanner() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#17161b] via-[#101015] to-[#0d0e14] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold tracking-widest uppercase text-amber-300 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Bespoke Art & Engineering</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Have a Specific Vision for Your Living Space or Digital Venture?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
              Every month, a limited allocation of private commissions is opened for custom physical canvases, site-specific art installations, and bespoke WebGL/e-commerce digital applications.
            </p>
          </div>

          {/* 4 Process Steps */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Stripe-secured deposit milestones • 100% satisfaction guarantee</span>
            </div>

            <Link href="/commission">
              <Button variant="gold" size="lg" className="gap-2 text-xs">
                <span>Configure & Request a Custom Order</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
