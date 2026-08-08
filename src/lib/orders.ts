// Local order history store (mirrors giftCards.ts pattern). This is the
// offline fallback the prototype runs on; supabase-schema.sql defines the
// real `orders` table for the production upgrade path.

import type { PickupOrder } from "./types";

const STORAGE_KEY = "thestation-orders";

function readAll(): PickupOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PickupOrder[]) : [];
  } catch {
    return [];
  }
}

function writeAll(orders: PickupOrder[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function saveOrder(order: PickupOrder) {
  const orders = readAll();
  orders.unshift(order);
  writeAll(orders);
}

export function listOrdersFor(email: string): PickupOrder[] {
  if (!email) return readAll();
  return readAll().filter(
    (o) => o.customerEmail?.toLowerCase() === email.toLowerCase()
  );
}

export function generateOrderId(): string {
  const num = Math.floor(100 + Math.random() * 900);
  return `TS-${num}`;
}
