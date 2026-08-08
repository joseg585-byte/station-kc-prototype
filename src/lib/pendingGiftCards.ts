// Same Stripe-redirect bridge pattern as pendingOrders.ts, for gift-card
// purchases: stash details before redirecting to Stripe, finalize (generate
// code, save, email) when the success page loads.

import type { PendingGiftCard } from "./types";

const KEY_PREFIX = "thestation-pending-gift-";

export function savePendingGiftCard(gift: PendingGiftCard) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY_PREFIX + gift.id, JSON.stringify(gift));
}

export function takePendingGiftCard(id: string): PendingGiftCard | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY_PREFIX + id);
  if (!raw) return null;
  window.localStorage.removeItem(KEY_PREFIX + id);
  try {
    return JSON.parse(raw) as PendingGiftCard;
  } catch {
    return null;
  }
}
