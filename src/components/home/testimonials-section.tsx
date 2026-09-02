import React from "react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/mock-data";

export function TestimonialsSection() {
  return (
    <section className="py-20 border-t border-white/10 bg-[#08080c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Collector & Client Acclaim
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Patrons, Curators & Engineering Teams
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111116]/80 p-8 backdrop-blur-md transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm text-neutral-300 leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Author & Piece */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-xs font-bold text-neutral-950 shadow-md">
                  {t.avatarText}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-neutral-400">
                    {t.role} • {t.company}
                  </p>
                  <p className="text-[10px] text-amber-400/90 font-medium mt-0.5">
                    Acquisition: {t.project}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
