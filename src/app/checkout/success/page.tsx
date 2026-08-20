"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { takePendingOrder } from "@/lib/pendingOrders";
import { saveOrder } from "@/lib/orders";
import { useCart } from "@/lib/store";
import { getLocation } from "@/data/locations";
import { formatCurrency } from "@/lib/format";
import type { PickupOrder } from "@/lib/types";
import OrderSkeleton from "@/components/skeletons/OrderSkeleton";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const clear = useCart((s) => s.clear);
  const [order, setOrder] = useState<PickupOrder | null>(null);

  useEffect(() => {
    if (!orderId) return;
    const pending = takePendingOrder(orderId);
    if (pending) {
      saveOrder(pending);
      // One-time finalization of a Stripe-redirect order: safe to set state
      // here since it's gated on a stable URL param, not a cascading update.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrder(pending);
      clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const location = order ? getLocation(order.locationSlug) : undefined;

  if (!order) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-2xl font-bold text-ink">Order not found</h1>
        <p className="mt-2 text-ink-soft">This confirmation link has already been used or expired.</p>
        <Link href="/menu" className="mt-6 inline-block rounded-full bg-green px-6 py-3 text-sm font-bold uppercase tracking-wide text-cream">
          Back to Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green" />
        <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-ink">Order placed!</h1>
        <p className="mt-2 text-ink-soft">
          Ticket <span className="font-bold text-green-deep">{order.id}</span> — we&apos;ll have it ready for pickup.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-green-ink/10 bg-paper p-6 shadow-soft">
        {location && (
          <>
            <p className="flex items-center gap-2 font-semibold text-ink">
              <MapPin className="h-4 w-4 text-green-deep" /> {location.name}
            </p>
            <p className="ml-6 text-sm text-ink-soft">{location.address}, {location.city}, {location.state} {location.zip}</p>
            <p className="ml-6 mt-1 flex items-center gap-2 text-sm text-ink-soft">
              <Clock className="h-3.5 w-3.5" /> Ready in about 15 minutes
            </p>
          </>
        )}

        <ul className="mt-5 space-y-2 border-t border-green-ink/10 pt-4 text-sm">
          {order.lines.map((l) => (
            <li key={l.id} className="flex justify-between">
              <span className="text-ink-soft">{l.qty}× {l.name}</span>
              <span className="font-medium text-ink">{formatCurrency(l.price * l.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-green-ink/10 pt-4 text-base font-bold text-ink">
          <span>Total Paid</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/account" className="flex-1 rounded-full border-2 border-green px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-green-deep hover:bg-green hover:text-cream">
          View My Orders
        </Link>
        <Link href="/menu" className="flex-1 rounded-full bg-green px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-cream">
          Order More
        </Link>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<OrderSkeleton label="Confirming your order…" />}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </>
  );
}
