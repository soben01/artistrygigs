import React from "react";
import Link from "next/link";
import { Code2, Palette, Layers, Sparkles, ArrowRight } from "lucide-react";
import { SKILL_DOMAINS } from "@/data/mock-data";

const iconMap = {
  Code2,
  Palette,
  Layers,
  Sparkles,
};

export function MultidisciplinarySection() {
  return (
    <section className="py-20 bg-[#09090d] border-y border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-300">
            <Code2 className="h-3.5 w-3.5" />
            <span>The Multidisciplinary Edge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Code as Architecture. Canvas as Expression.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Bridging technical precision and artistic emotion. Most engineers don’t paint with genuine 24k gold leaf; most painters don’t compile GLSL shaders and architect microservices.
          </p>
        </div>

        {/* 4 Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_DOMAINS.map((domain) => {
            const Icon = iconMap[domain.icon as keyof typeof iconMap] || Sparkles;

            return (
              <div
                key={domain.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121217]/70 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#16161d]"
              >
                {/* Ambient Card Glow */}
                <div
                  className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${domain.color} opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100 -z-10`}
                />

                <div className="space-y-4">
                  {/* Icon & Stat */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 ${domain.accent}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
                      {domain.stats}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-xs text-neutral-300 font-medium mt-1">
                      {domain.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                {/* Explore Link */}
                <div className="pt-6 mt-4 border-t border-white/10">
                  <Link
                    href={`/portfolio?category=${domain.id}`}
                    className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider ${domain.accent} hover:underline`}
                  >
                    <span>View Projects</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
