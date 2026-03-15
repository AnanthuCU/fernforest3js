"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Leaf } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#varieties", label: "Varieties" },
  { href: "/#mixes", label: "Mixes" },
  { href: "/#plans", label: "Plans" },
];

export function Navbar() {
  const { getTotalItems, toggleCart } = useCartStore();
  const totalItems = getTotalItems();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md border-b border-sage/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Leaf className="h-6 w-6 text-sage group-hover:text-leaf transition-colors" />
              <span className="font-serif text-xl text-forest">
                fern forest
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-bark hover:text-leaf transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleCart}
                aria-label="Open cart"
                className="relative flex items-center gap-2 bg-forest text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-leaf transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-lime text-forest text-xs font-bold flex items-center justify-center animate-bounce-in">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-parchment transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5 text-forest" />
                ) : (
                  <Menu className="h-5 w-5 text-forest" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileOpen ? "max-h-48" : "max-h-0"
          )}
        >
          <nav className="border-t border-sage/15 bg-cream px-4 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-bark hover:text-leaf"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
