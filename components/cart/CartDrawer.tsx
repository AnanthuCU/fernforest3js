"use client";

import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } =
    useCartStore();
  const total = getTotalPrice();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="cart-overlay fixed inset-0 z-50 bg-bark/40 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-parchment">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-forest" />
            <h2 className="font-serif text-xl text-forest">Your Cart</h2>
            {items.length > 0 && (
              <span className="bg-lime text-forest text-xs font-bold px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-cream transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5 text-bark" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag className="h-16 w-16 text-parchment" />
              <p className="font-serif text-xl text-forest">Your cart is empty</p>
              <p className="text-sm text-gray-500">
                Add some fresh microgreens to get started.
              </p>
              <Button onClick={closeCart} size="sm">
                Browse Products
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const key = `${item.productId}__${item.size ?? "plan"}`;
                return (
                  <li
                    key={key}
                    className="flex gap-4 p-3 rounded-2xl bg-cream/70 border border-parchment"
                  >
                    {/* Image */}
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0 bg-parchment">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-forest truncate">
                        {item.name}
                      </p>
                      {item.size && (
                        <p className="text-xs text-gray-500 mt-0.5">{item.size}</p>
                      )}
                      <p className="text-sm font-bold text-leaf mt-1">
                        {formatPrice(item.price * item.quantity)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity - 1)
                          }
                          className="h-7 w-7 rounded-full border border-parchment flex items-center justify-center hover:bg-parchment transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity + 1)
                          }
                          className="h-7 w-7 rounded-full border border-parchment flex items-center justify-center hover:bg-parchment transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.productId, item.size)}
                          className="ml-auto p-1.5 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors text-gray-400"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-parchment px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Subtotal</span>
              <span className="font-bold text-lg text-forest">
                {formatPrice(total)}
              </span>
            </div>
            <p className="text-xs text-gray-400 -mt-2">
              Free delivery · Freshly harvested before dispatch
            </p>
            <Link href="/checkout" onClick={closeCart}>
              <Button className="w-full" size="lg">
                Place Order <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
