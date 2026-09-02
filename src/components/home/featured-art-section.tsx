"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye, Sparkles, Check, Lock } from "lucide-react";
import { ARTWORKS, Artwork } from "@/data/mock-data";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export function FeaturedArtSection() {
  const { addItem, items } = useCart();
  const [filter, setFilter] = useState<"all" | "ORIGINAL" | "PRINT">("all");

  const filteredArtworks = ARTWORKS.filter((art) => {
    if (filter === "all") return true;
    return art.type === filter;
  });

  return (
    <section id="gallery" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Studio Works & Fine Editions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Selected Works Available for Acquisition
            </h2>
            <p className="mt-2 text-neutral-400 text-sm sm:text-base max-w-2xl">
              Each original piece arrives with signed physical provenance and museum-sealed certificate. Archival prints are rendered on heavyweight 310gsm German cotton rag.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md self-start md:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                filter === "all"
                  ? "bg-amber-500 text-neutral-950 shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              All Works
            </button>
            <button
              onClick={() => setFilter("ORIGINAL")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                filter === "ORIGINAL"
                  ? "bg-amber-500 text-neutral-950 shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Originals
            </button>
            <button
              onClick={() => setFilter("PRINT")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                filter === "PRINT"
                  ? "bg-amber-500 text-neutral-950 shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Archival Prints
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((art) => {
            const isItemInCart = items.some((i) => i.id === art.id);
            const isSold = art.status === "sold";

            return (
              <div
                key={art.id}
                className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#111116] overflow-hidden transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              >
                {/* Artwork Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-950">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Status Tag Overlay */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {art.type === "ORIGINAL" ? (
                      <Badge variant={isSold ? "sold" : "gold"}>
                        {isSold ? "Original • In Private Collection" : "Original Piece"}
                      </Badge>
                    ) : (
                      <Badge variant="cyan">
                        {art.editionInfo || "Archival Print"}
                      </Badge>
                    )}
                  </div>

                  {/* Year Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium text-neutral-300 border border-white/10">
                      {art.year}
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">
                        {art.title}
                      </h3>
                      <span className="text-lg font-extrabold text-amber-400 whitespace-nowrap">
                        {formatPrice(art.price)}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 font-medium">
                      {art.medium}
                    </p>
                    
                    <p className="text-xs text-neutral-400">
                      Dimensions: {art.dimensions}
                    </p>

                    <p className="text-xs text-neutral-400/90 line-clamp-2 pt-1">
                      {art.shortDescription}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                    {isSold ? (
                      <Link href="/commission" className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs text-amber-300 border-amber-500/30 hover:bg-amber-500/10 gap-1.5"
                        >
                          <Lock className="h-3.5 w-3.5" />
                          <span>Request Custom Variation</span>
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant={isItemInCart ? "glass" : "gold"}
                        size="sm"
                        className="flex-1 text-xs gap-1.5"
                        onClick={() =>
                          addItem({
                            id: art.id,
                            slug: art.slug,
                            title: art.title,
                            type: art.type,
                            price: art.price,
                            image: art.image,
                            dimensions: art.dimensions,
                          })
                        }
                      >
                        {isItemInCart ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span>In Cart ({art.type === "PRINT" ? "Add More" : "Added"})</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="h-3.5 w-3.5" />
                            <span>{art.type === "ORIGINAL" ? "Acquire Piece" : "Order Print"}</span>
                          </>
                        )}
                      </Button>
                    )}

                    <Link href={`/shop`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-2.5 text-neutral-400 hover:text-white"
                        aria-label="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Order Callout in Gallery */}
        <div className="mt-12 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-neutral-900/60 to-cyan-500/10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white">
              Seeking a custom size, subject, or palette?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
              Original commissions are custom-built for residential estates, corporate headquarters, and private collections worldwide.
            </p>
          </div>
          <Link href="/commission" className="flex-shrink-0">
            <Button variant="gold" size="default" className="text-xs">
              <span>Start Commission Inquiry</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
