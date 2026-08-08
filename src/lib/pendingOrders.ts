// Bridges the Stripe redirect round-trip: we can't rely on a deployed
// webhook in this prototype, so the full order is stashed in localStorage
// under its orderId right before redirecting to Stripe (or straight to the
// mock success flow), then finalized when the success page loads. A real
// production build would confirm payment server-side via a Stripe webhook
// instead of trusting the client redirect.

import type { PickupOrder } from "./types";

const KEY_PREFIX = "thestation-pending-order-";

export function savePendingOrder(order: PickupOrder) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY_PREFIX + order.id, JSON.stringify(order));
}

export function takePendingOrder(orderId: string): PickupOrder | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY_PREFIX + orderId);
  if (!raw) return null;
  window.localStorage.removeItem(KEY_PREFIX + orderId);
  try {
    return JSON.parse(raw) as PickupOrder;
  } catch {
    return null;
  }
}
