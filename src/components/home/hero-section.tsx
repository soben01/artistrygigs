"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Eye, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart/cart-context";
import { ARTWORKS } from "@/data/mock-data";

export function HeroSection() {
  const { addItem } = useCart();
  const featuredArtwork = ARTWORKS[0]; // Cosmic Weaver

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-16 lg:pb-32">
      {/* Dynamic Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-amber-500/15 via-purple-600/10 to-cyan-500/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-amber-500/10 blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin-slow" />
              <span>Fine Art Atelier × Creative Technology Lab</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Where Tactile Canvas Meets{" "}
              <span className="gold-gradient-text block mt-1">
                Algorithmic Elegance.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-neutral-300/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              An independent studio by a multidisciplinary artist and full-stack engineer. Discover museum-grade original oils, 24k gold leaf gilding, limited archival prints, and bespoke software solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="#gallery">
                <Button variant="gold" size="lg" className="gap-2.5">
                  <Sparkles className="h-4 w-4" />
                  <span>Acquire Original Art</span>
                </Button>
              </Link>

              <Link href="/portfolio">
                <Button variant="glass" size="lg" className="gap-2">
                  <Layers className="h-4 w-4 text-cyan-400" />
                  <span>Explore Portfolio</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <span>Museum-Grade Provenance & COA</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Worldwide Insured Art Courier</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>Custom Commissions Open</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Artwork Showcase with Floating Glass Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              {/* Outer Golden Glow Frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber-500/30 via-cyan-500/20 to-purple-500/30 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

              {/* Museum Canvas Card */}
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#121217] shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                  <Image
                    src={featuredArtwork.image}
                    alt={featuredArtwork.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090c] via-transparent to-black/20" />

                  <div className="absolute top-4 left-4">
                    <Badge variant="gold" className="text-[11px] font-bold">
                      ★ Featured Exhibition Piece
                    </Badge>
                  </div>
                </div>

                {/* Info Bar */}
                <div className="p-5 space-y-3 bg-[#111115]/95 backdrop-blur-md border-t border-white/10">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-wide">
                        {featuredArtwork.title}
                      </h2>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {featuredArtwork.medium}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-amber-400">
                        ${featuredArtwork.price.toLocaleString()}
                      </span>
                      <p className="text-[10px] text-emerald-400 font-medium">
                        Original • Available
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      variant="gold"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() =>
                        addItem({
                          id: featuredArtwork.id,
                          slug: featuredArtwork.slug,
                          title: featuredArtwork.title,
                          type: featuredArtwork.type,
                          price: featuredArtwork.price,
                          image: featuredArtwork.image,
                          dimensions: featuredArtwork.dimensions,
                        })
                      }
                    >
                      <Sparkles className="h-3.5 w-3.5 mr-1" />
                      Add to Collection
                    </Button>

                    <Link href={`/shop`}>
                      <Button variant="outline" size="sm" className="px-3" aria-label="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Dimension Tag */}
              <div className="hidden sm:flex absolute -bottom-5 -left-4 items-center gap-2 rounded-xl border border-white/15 bg-[#171720]/90 backdrop-blur-md px-3.5 py-2 shadow-xl">
                <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-medium text-neutral-200">
                  {featuredArtwork.dimensions}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
