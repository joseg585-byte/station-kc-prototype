"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart, cartTotals } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import { getLocation } from "@/data/locations";
import { generateOrderId } from "@/lib/orders";
import { savePendingOrder } from "@/lib/pendingOrders";
import { useAuth } from "@/lib/auth";

export default function CheckoutPage() {
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const locationSlug = useCart((s) => s.locationSlug);
  const clear = useCart((s) => s.clear);
  const profile = useAuth((s) => s.profile);

  const location = locationSlug ? getLocation(locationSlug) : undefined;
  const { subtotal, tax, total } = cartTotals(lines);

  const [name, setName] = useState(profile ? `${profile.firstName} ${profile.lastName}`.trim() : "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValid = useMemo(
    () => name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [name, email]
  );

  const handlePay = async () => {
    if (!isValid || !location) return;
    setLoading(true);
    setError("");

    const orderId = generateOrderId();
    savePendingOrder({
      id: orderId,
      createdAt: new Date().toISOString(),
      locationSlug: location.slug,
      lines,
      subtotal,
      tax,
      total,
      status: "placed",
      customerEmail: email.trim().toLowerCase(),
      customerName: name.trim(),
    });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: lines.map((l) => ({ name: l.name, price: l.price, qty: l.qty })),
          orderId,
          locationName: location.name,
        }),
      });
      const data = await res.json();

      if (data.mock) {
        clear();
        router.push(`/checkout/success?orderId=${encodeURIComponent(orderId)}`);
        return;
      }
      if (data.url) {
        // Full-page redirect to Stripe Checkout — not a React state mutation.
        // eslint-disable-next-line react-hooks/immutability
        window.location.href = data.url;
        return;
      }
      throw new Error(data.error || "Checkout failed");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (lines.length === 0) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
          <h1 className="font-display text-2xl font-bold text-ink">Your cart is empty</h1>
          <p className="mt-2 text-ink-soft">Add something from the menu to check out.</p>
          <Link href="/menu" className="mt-6 inline-block rounded-full bg-green px-6 py-3 text-sm font-bold uppercase tracking-wide text-cream">
            Browse the Menu
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-black tracking-tight text-ink">Checkout</h1>
        <p className="mt-2 text-ink-soft">Pickup only for this prototype — no delivery.</p>

        <div className="mt-8 grid gap-8 sm:grid-cols-5">
          <div className="sm:col-span-3">
            <div className="rounded-2xl border border-green-ink/10 bg-paper p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold text-ink">Pickup Info</h2>
              {location && (
                <p className="mt-1 text-sm text-green-deep">
                  {location.name} — {location.address}
                </p>
              )}

              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="overline text-ink-soft/60">Full Name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Smith"
                    className="focus-ring mt-1.5 w-full rounded-lg border border-green-ink/15 bg-cream/50 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/35"
                  />
                </label>
                <label className="block">
                  <span className="overline text-ink-soft/60">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="focus-ring mt-1.5 w-full rounded-lg border border-green-ink/15 bg-cream/50 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/35"
                  />
                </label>
                <label className="block">
                  <span className="overline text-ink-soft/60">Phone (optional)</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(816) 555-0148"
                    className="focus-ring mt-1.5 w-full rounded-lg border border-green-ink/15 bg-cream/50 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/35"
                  />
                </label>
              </div>

              {error && <p className="mt-4 text-sm text-red-accent">{error}</p>}

              <button
                onClick={handlePay}
                disabled={!isValid || loading}
                className="focus-ring mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-green px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-cream shadow-lift transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Lock className="h-4 w-4" />
                {loading ? "Redirecting to Stripe…" : `Pay ${formatCurrency(total)}`}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-soft/60">
                <ShieldCheck className="h-3.5 w-3.5" /> Stripe test mode — no real charge.
              </p>
            </div>
          </div>

          <div className="sm:col-span-2">
            <div className="rounded-2xl border border-green-ink/10 bg-cream p-6">
              <h2 className="font-display text-lg font-bold text-ink">Order Summary</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {lines.map((l) => (
                  <li key={l.id} className="flex justify-between">
                    <span className="text-ink-soft">{l.qty}× {l.name}</span>
                    <span className="font-medium text-ink">{formatCurrency(l.price * l.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1.5 border-t border-green-ink/10 pt-4 text-sm">
                <div className="flex justify-between text-ink-soft"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between text-ink-soft"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
                <div className="flex justify-between pt-1.5 text-base font-bold text-ink"><span>Total</span><span>{formatCurrency(total)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
