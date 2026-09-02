"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Trash2, Plus, Minus, ShieldCheck, ArrowRight } from "lucide-react";
import { useCart } from "./cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalCount, subtotal } = useCart();

  // Close cart on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#0d0e12] border-l border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-semibold tracking-wide text-white">
              Collector&apos;s Cart
            </h2>
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-300">
              {totalCount}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="border-b border-white/5 bg-white/[0.02] px-6 py-3">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
            <span>White-Glove Insured Art Freight</span>
            <span className="text-amber-400 font-medium">Included on orders $500+</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
              style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 border border-white/10">
                <ShoppingBag className="h-8 w-8 text-neutral-500" />
              </div>
              <div>
                <p className="text-base font-medium text-white">Your cart is empty</p>
                <p className="mt-1 text-sm text-neutral-400">
                  Explore original works, archival prints, or custom commissions.
                </p>
              </div>
              <Button
                variant="gold"
                size="sm"
                onClick={closeCart}
                className="mt-2"
              >
                <Link href="/#gallery">Explore Artworks</Link>
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20"
              >
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-900 border border-white/10">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-white line-clamp-1">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant={item.type === "ORIGINAL" ? "gold" : "cyan"} className="text-[10px] py-0 px-2">
                        {item.type === "ORIGINAL" ? "Original Piece" : "Archival Print"}
                      </Badge>
                      {item.dimensions && (
                        <span className="text-[11px] text-neutral-400">
                          {item.dimensions}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-semibold text-amber-400 text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </span>

                    {item.type === "PRINT" ? (
                      <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-neutral-400 hover:text-white p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-semibold text-white w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-neutral-400 hover:text-white p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] font-medium text-amber-300/80 italic">
                        One of a kind
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Checkout CTA */}
        {items.length > 0 && (
          <div className="border-t border-white/10 bg-white/[0.02] p-6 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-medium text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Insured Freight & Handling</span>
                <span className="font-medium text-emerald-400">
                  {subtotal >= 500 ? "Complimentary" : "$35.00"}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-base font-bold text-white">
                <span>Estimated Total</span>
                <span className="text-amber-400">
                  {formatPrice(subtotal + (subtotal >= 500 ? 0 : 35))}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Includes Certificate of Authenticity & Signed Provenance</span>
            </div>

            <Link href="/checkout" onClick={closeCart} className="block w-full">
              <Button variant="gold" size="lg" className="w-full gap-2">
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
