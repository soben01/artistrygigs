"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles, 
  Palette, 
  Code2, 
  ArrowUpRight 
} from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/shop", label: "Art Shop" },
  { href: "/commission", label: "Commissions", badge: "Made to Order" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { openCart, totalCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-[#09090c]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-cyan-500 p-[1px] shadow-[0_0_18px_rgba(245,158,11,0.3)]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#09090c]">
                  <Sparkles className="h-5 w-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-wider text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors">
                  ARTISTRY<span className="text-amber-400">GIGS</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-medium -mt-1">
                  Art Studio & Lab
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200",
                      isActive
                        ? "bg-white/10 text-white font-semibold shadow-sm"
                        : "text-neutral-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[9px] text-amber-300 font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Cart + Quick Commission CTA */}
            <div className="flex items-center gap-3">
              <Link href="/commission" className="hidden sm:inline-flex">
                <Button variant="outline" size="sm" className="gap-1.5 border-amber-500/30 text-amber-300 hover:bg-amber-500/10 hover:border-amber-500/60 text-[11px]">
                  <span>Commission Art</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10 hover:text-white hover:border-amber-500/40 transition-all duration-200"
                aria-label={`Shopping cart with ${totalCount} items`}
              >
                <ShoppingBag className="h-4 w-4" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[11px] font-bold text-neutral-950 shadow-[0_0_10px_rgba(245,158,11,0.6)] animate-in zoom-in">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-20 left-4 right-4 rounded-3xl border border-white/10 bg-[#0d0e12] p-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-wider text-neutral-200 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <Link
                  href="/commission"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <Button variant="gold" size="default" className="w-full gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Request Custom Commission</span>
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
