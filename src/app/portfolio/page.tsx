"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Code2, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Palette, 
  ArrowUpRight,
  TrendingUp,
  Filter
} from "lucide-react";
import { PORTFOLIO_PROJECTS, PortfolioProject } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { id: "all", label: "All Disciplines" },
  { id: "coding", label: "Creative Code & WebGL" },
  { id: "webdev", label: "Full-Stack Web Apps" },
  { id: "graphic-design", label: "Brand & Typography" },
  { id: "fine-art", label: "Fine Art & Spatial" },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold tracking-widest uppercase text-cyan-300">
            <Code2 className="h-3.5 w-3.5" />
            <span>Multidisciplinary Works & Case Studies</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Portfolio of Software & Art
          </h1>
          <p className="text-base text-neutral-300 leading-relaxed">
            A curated archive of high-performance WebGL platforms, Next.js commerce architectures, generative algorithmic systems, and museum-exhibited mixed-media works.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-neutral-400 text-xs uppercase tracking-wider font-semibold mr-2">
            <Filter className="h-3.5 w-3.5 text-amber-400" />
            <span>Filter:</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-amber-500 text-neutral-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col rounded-3xl border border-white/10 bg-[#111116] overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
            >
              {/* Media Preview Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-black/30" />

                <div className="absolute top-4 left-4">
                  <Badge variant="cyan" className="text-xs">
                    {project.categoryLabel}
                  </Badge>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-semibold text-neutral-300 border border-white/10">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col justify-between p-8 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h2>
                    {project.client && (
                      <span className="text-xs text-neutral-400 font-medium whitespace-nowrap">
                        Client: {project.client}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Impact / Performance Metrics */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-3 pt-3">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center"
                        >
                          <div className="text-base font-extrabold text-amber-400">
                            {m.value}
                          </div>
                          <div className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Link Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors ml-2"
                      >
                        <span>Source Code</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  <Link href="/commission">
                    <Button variant="outline" size="sm" className="text-xs">
                      Commission Similar
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 rounded-3xl border border-white/10 bg-[#121217] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">
              Have a bespoke technical or artistic project in mind?
            </h3>
            <p className="text-sm text-neutral-400 max-w-xl">
              From high-converting web applications to site-specific physical installations, we bring ideas into striking reality.
            </p>
          </div>
          <Link href="/contact" className="flex-shrink-0">
            <Button variant="gold" size="lg">
              <span>Initiate Collaboration</span>
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
