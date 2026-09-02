"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  SlidersHorizontal,
  Lock,
  ArrowRight
} from "lucide-react";
import { ARTWORKS, Artwork } from "@/data/mock-data";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export default function ShopPage() {
  const { addItem, items } = useCart();
  const [filterType, setFilterType] = useState<"all" | "ORIGINAL" | "PRINT">("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  let displayedArtworks = ARTWORKS.filter((art) => {
    if (filterType === "all") return true;
    return art.type === filterType;
  });

  if (sortBy === "price-asc") {
    displayedArtworks = [...displayedArtworks].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    displayedArtworks = [...displayedArtworks].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold tracking-widest uppercase text-amber-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Official Atelier Storefront</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Original Fine Art & Archival Editions
          </h1>
          <p className="text-base text-neutral-300 leading-relaxed">
            Acquire museum-quality physical artworks directly from the studio. Every original piece includes a signed Certificate of Authenticity and tamper-evident archival provenance seal.
          </p>
        </div>

        {/* Filter & Sorting Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterType("all")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                filterType === "all"
                  ? "bg-amber-500 text-neutral-950 font-bold"
                  : "bg-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              All Pieces ({ARTWORKS.length})
            </button>
            <button
              onClick={() => setFilterType("ORIGINAL")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                filterType === "ORIGINAL"
                  ? "bg-amber-500 text-neutral-950 font-bold"
                  : "bg-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              Originals
            </button>
            <button
              onClick={() => setFilterType("PRINT")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                filterType === "PRINT"
                  ? "bg-amber-500 text-neutral-950 font-bold"
                  : "bg-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              Archival Prints
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <SlidersHorizontal className="h-3.5 w-3.5 text-amber-400" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border border-white/10 bg-[#121217] px-3 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="featured">Curated Exhibition Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Artworks Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArtworks.map((art) => {
            const isItemInCart = items.some((i) => i.id === art.id);
            const isSold = art.status === "sold";

            return (
              <div
                key={art.id}
                className="group flex flex-col rounded-2xl border border-white/10 bg-[#111116] overflow-hidden transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <Badge variant={isSold ? "sold" : art.type === "ORIGINAL" ? "gold" : "cyan"}>
                      {isSold ? "Sold • Private Collection" : art.type === "ORIGINAL" ? "Original Piece" : "Archival Print"}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium text-neutral-300 border border-white/10">
                      {art.year}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {art.title}
                      </h3>
                      <span className="text-lg font-extrabold text-amber-400">
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

                  <div className="pt-3 border-t border-white/10">
                    {isSold ? (
                      <Link href="/commission" className="block w-full">
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
                        className="w-full text-xs gap-1.5"
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
                            <span>{art.type === "ORIGINAL" ? "Acquire Piece" : "Add to Cart"}</span>
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* White-Glove Guarantee Strip */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-[#121217] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex-shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Insured White-Glove Courier</h4>
              <p className="text-xs text-neutral-400 mt-1">
                Original artworks are timber-crated and insured for full appraisal value during international transport.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex-shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Certificate of Authenticity</h4>
              <p className="text-xs text-neutral-400 mt-1">
                Hand-signed provenance documentation with wax-seal verification and holographic registry number.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Direct Studio Relationship</h4>
              <p className="text-xs text-neutral-400 mt-1">
                No middleman galleries. 100% of proceeds go directly to studio production, materials, and open research.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
