"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "./types";
import { getMenuItem } from "@/data/menu";

type CartState = {
  lines: CartLine[];
  locationSlug: string | null;
  isOpen: boolean;
  setLocation: (slug: string) => void;
  addItem: (itemId: string, locationSlug: string) => void;
  removeItem: (itemId: string) => void;
  updateQty: (itemId: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      locationSlug: null,
      isOpen: false,
      setLocation: (slug) => set({ locationSlug: slug }),
      addItem: (itemId, locationSlug) => {
        const item = getMenuItem(itemId);
        if (!item || !item.sellableOnline) return;
        const { lines } = get();
        // Switching pickup location clears the cart (single-location pickup).
        const activeSlug = get().locationSlug ?? locationSlug;
        const sameLocation = activeSlug === locationSlug;
        const existing = sameLocation
          ? lines.find((l) => l.id === itemId)
          : undefined;

        if (!sameLocation) {
          set({
            locationSlug,
            lines: [
              {
                id: item.id,
                name: item.name,
                price: item.price,
                qty: 1,
                image: item.image,
                locationSlug,
              },
            ],
            isOpen: true,
          });
          return;
        }

        if (existing) {
          set({
            lines: lines.map((l) =>
              l.id === itemId ? { ...l, qty: l.qty + 1 } : l
            ),
            isOpen: true,
          });
        } else {
          set({
            locationSlug,
            lines: [
              ...lines,
              {
                id: item.id,
                name: item.name,
                price: item.price,
                qty: 1,
                image: item.image,
                locationSlug,
              },
            ],
            isOpen: true,
          });
        }
      },
      removeItem: (itemId) =>
        set({ lines: get().lines.filter((l) => l.id !== itemId) }),
      updateQty: (itemId, qty) => {
        if (qty <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.id === itemId ? { ...l, qty } : l
          ),
        });
      },
      clear: () => set({ lines: [], locationSlug: null }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
    }),
    { name: "thestation-cart" }
  )
);

export function cartTotals(lines: CartLine[]) {
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const tax = Math.round(subtotal * 0.08975 * 100) / 100; // MO/KC combined approx.
  const total = Math.round((subtotal + tax) * 100) / 100;
  return { subtotal, tax, total };
}
