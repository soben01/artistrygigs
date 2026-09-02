"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  ArrowLeft, 
  ShoppingBag,
  Sparkles,
  Truck
} from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shippingCost = subtotal >= 500 ? 0 : 35;
  const tax = Math.round(subtotal * 0.08); // 8% estimated sales tax
  const total = subtotal + shippingCost + tax;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const mockId = `AG-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(mockId);
      setLoading(false);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="space-y-3">
            <Badge variant="gold" className="text-xs">
              Order Confirmed • Provenance Record Registered
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Thank You for Your Acquisition
            </h1>
            <p className="text-neutral-300 text-sm">
              Your order reference is <span className="font-mono text-amber-400 font-bold">{orderId}</span>. A formal invoice, tracking confirmation, and digital certificate have been emailed to your address.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111116] p-6 text-left space-y-4">
            <div className="flex items-center gap-3 text-amber-300 text-sm font-semibold">
              <Truck className="h-5 w-5" />
              <span>Next Steps: Studio Preparation & Insured Crate Packaging</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Original canvases undergo a 24-hour climate stabilization inspection before being secured in shock-absorbing timber crates with museum-grade silica gel packets.
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <Link href="/">
              <Button variant="gold" size="default">
                Return to Gallery
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="default">
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-24">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5 border border-white/10">
            <ShoppingBag className="h-8 w-8 text-neutral-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Your Cart is Currently Empty</h2>
            <p className="text-neutral-400 text-sm mt-2">
              Explore available original oil paintings or limited edition prints.
            </p>
          </div>
          <Link href="/shop">
            <Button variant="gold" size="default">
              Browse Art Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Browsing</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Secure Art Acquisition Checkout
          </h1>
        </div>

        <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Collector & Delivery Details */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Delivery Details */}
            <div className="rounded-2xl border border-white/10 bg-[#111116] p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Truck className="h-5 w-5 text-amber-400" />
                <span>1. Insured Delivery Destination</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                    First Name
                  </label>
                  <input
                    required
                    type="text"
                    defaultValue="Alexander"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                    Last Name
                  </label>
                  <input
                    required
                    type="text"
                    defaultValue="Wright"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                  Email for Tracking & Certificate
                </label>
                <input
                  required
                  type="email"
                  defaultValue="alexander@collector.com"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                  Street Address
                </label>
                <input
                  required
                  type="text"
                  defaultValue="742 Evergreen Terrace, Suite 400"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                    City
                  </label>
                  <input
                    required
                    type="text"
                    defaultValue="New York"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                    State / Prov
                  </label>
                  <input
                    required
                    type="text"
                    defaultValue="NY"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                    Postal Code
                  </label>
                  <input
                    required
                    type="text"
                    defaultValue="10001"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="rounded-2xl border border-white/10 bg-[#111116] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-amber-400" />
                  <span>2. Payment via Stripe</span>
                </h2>
                <span className="flex items-center gap-1 text-xs text-neutral-400">
                  <Lock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>256-bit Encrypted</span>
                </span>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <p className="text-xs text-neutral-300">
                  Stripe Checkout / Elements integration ready. Instant processing with buyer protection.
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                  Card Number (Test Mode Ready)
                </label>
                <input
                  required
                  type="text"
                  defaultValue="4242 •••• •••• 4242"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-mono text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                    Expiry Date
                  </label>
                  <input
                    required
                    type="text"
                    defaultValue="12/28"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-mono text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                    CVC Security Code
                  </label>
                  <input
                    required
                    type="text"
                    defaultValue="982"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-mono text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-2xl border border-white/10 bg-[#111116] p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-bold text-white">Order Summary</h2>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                  >
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-900 border border-white/10">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Qty: {item.quantity} • {item.type === "ORIGINAL" ? "Original" : "Print"}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-amber-400">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Insured Art Freight</span>
                  <span className="font-semibold text-emerald-400">
                    {shippingCost === 0 ? "Complimentary" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-white">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-extrabold text-white">
                  <span>Total Due</span>
                  <span className="text-amber-400">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center gap-2.5 text-xs text-neutral-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>Certificate of Authenticity with physical tamper-evident seal included</span>
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={loading}
                className="w-full text-xs"
              >
                {loading ? "Authorizing Payment..." : `Authorize Payment (${formatPrice(total)})`}
              </Button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
