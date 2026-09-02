import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Terminal, Palette, Award, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold tracking-widest uppercase text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>The Atelier Story</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              An Atelier Where Pigment & Logic Coexist
            </h1>

            <p className="text-base text-neutral-300 leading-relaxed">
              ARTISTRYGIGS was born from a singular conviction: that the disciplines of traditional fine art and modern software engineering are complementary expressions of architectural creation.
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed">
              On one side of the studio stands an easel supporting raw Belgian linen, hand-mulled lapis lazuli pigments, and sheets of hammered 24k gold leaf. On the other sits a dual-monitor workstation running Next.js compiler pipelines, custom Three.js shader nodes, and distributed PostgreSQL schemas.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <Link href="/shop">
                <Button variant="gold" size="default">
                  Explore Studio Catalog
                </Button>
              </Link>
              <Link href="/commission">
                <Button variant="outline" size="default">
                  Commission Inquiries
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <Image
                src="/images/artist-portrait.jpg"
                alt="Artist Portrait in Atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
          </div>
        </div>

        {/* Studio Tenets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-white/10 bg-[#111116] p-8 space-y-4">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Palette className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Archival Permanence</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              We exclusively utilize conservation-grade binders, lightfast mineral pigments rated ASTM I, and genuine 24-karat gold leaf guaranteed against oxidation for centuries.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111116] p-8 space-y-4">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Production Engineering</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Our software applications adhere to strict clean architecture principles: strict TypeScript typing, sub-second server-side rendering, and atomic security.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111116] p-8 space-y-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Direct Provenance</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Every acquisition is logged directly into the studio registry. Original works arrive with signed physical certificates, embossed seals, and historical documentation.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
