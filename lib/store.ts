"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
}

function getItemKey(productId: string, size?: string) {
  return `${productId}__${size ?? "plan"}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const key = getItemKey(newItem.productId, newItem.size);
          const existing = state.items.find(
            (i) => getItemKey(i.productId, i.size) === key
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                getItemKey(i.productId, i.size) === key
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...newItem, quantity: 1 }] };
        });
      },

      removeItem: (productId, size) => {
        const key = getItemKey(productId, size);
        set((state) => ({
          items: state.items.filter(
            (i) => getItemKey(i.productId, i.size) !== key
          ),
        }));
      },

      updateQuantity: (productId, size, quantity) => {
        const key = getItemKey(productId, size);
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter(
              (i) => getItemKey(i.productId, i.size) !== key
            ),
          }));
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            getItemKey(i.productId, i.size) === key ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      getTotalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "fernforest-cart" }
  )
);
