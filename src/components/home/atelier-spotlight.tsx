import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Terminal, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AtelierSpotlight() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Artist & Studio Image */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer frame glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-amber-500/20 via-cyan-500/10 to-neutral-900 blur-xl opacity-70 -z-10" />

              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 shadow-2xl">
                <Image
                  src="/images/artist-portrait.jpg"
                  alt="Artist & Creative Technologist Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md">
                  <p className="text-xs font-semibold text-amber-300">
                    Studio Atelier • San Francisco / Global
                  </p>
                  <p className="text-[11px] text-neutral-300 mt-0.5">
                    Physical Oil Glazes × WebGL & Full-Stack Next.js
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Philosophy Narrative */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold tracking-widest uppercase text-amber-300">
              <Terminal className="h-3.5 w-3.5" />
              <span>Behind the Canvas & Code</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              &ldquo;I build software with the patience of an oil painter, and I paint with the systematic rigor of an engineer.&rdquo;
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Welcome to ARTISTRYGIGS. I am a multidisciplinary creator who refuses the artificial boundary between digital development and traditional physical craft. In the studio, I prepare heavy linen with gesso and apply 24k gold leaf. At the workstation, I engineer low-latency Next.js applications, custom 3D WebGL renderers, and scalable commerce backends.
            </p>

            {/* Checklist of Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Museum-archival pigments guaranteed for 100+ years</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Modern React/TypeScript architectures with clean code</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Signed physical Certificate of Authenticity with every piece</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>White-glove insured delivery to private residences</span>
              </div>
            </div>

            {/* Link CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/about">
                <Button variant="outline" size="default" className="text-xs gap-2">
                  <span>Read Full Artist Statement</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/commission">
                <Button variant="gold" size="default" className="text-xs gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Inquire Private Commission</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
