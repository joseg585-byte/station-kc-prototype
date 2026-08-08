"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Gift, Lock, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatCurrency } from "@/lib/format";
import { savePendingGiftCard } from "@/lib/pendingGiftCards";
import { useAuth } from "@/lib/auth";

const PRESET_AMOUNTS = [10, 25, 50, 100];

export default function GiftCardsPage() {
  const profile = useAuth((s) => s.profile);
  const [amount, setAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [purchaserEmail, setPurchaserEmail] = useState(profile?.email ?? "");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const finalAmount = isCustom ? parseFloat(customAmount) || 0 : amount;

  const isValid = useMemo(() => {
    const validAmount = finalAmount >= 5 && finalAmount <= 500;
    const validEmails =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(purchaserEmail.trim()) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim());
    return validAmount && validEmails;
  }, [finalAmount, purchaserEmail, recipientEmail]);

  const handleBuy = async () => {
    if (!isValid) return;
    setLoading(true);
    setError("");

    const giftId = `gft-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    savePendingGiftCard({
      id: giftId,
      amount: finalAmount,
      purchaserEmail: purchaserEmail.trim().toLowerCase(),
      recipientEmail: recipientEmail.trim().toLowerCase(),
      recipientName: recipientName.trim() || undefined,
      message: message.trim() || undefined,
    });

    try {
      const res = await fetch("/api/gift-cards/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount, giftId }),
      });
      const data = await res.json();

      // Full-page redirects (mock success or Stripe Checkout) — not React state.
      if (data.mock) {
        window.location.href = `/gift-cards/success?giftId=${encodeURIComponent(giftId)}`;
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error(data.error || "Checkout failed");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-green-ink py-20">
          <Image
            src="/images/menu/donuts-assorted.jpg"
            alt=""
            fill
            className="object-cover opacity-20 photo-treat"
            sizes="100vw"
          />
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Gift className="mx-auto h-10 w-10 text-amber" />
            <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-cream sm:text-5xl">
              Gift Cards
            </h1>
            <p className="mt-3 text-cream/80">
              Delivered by email in minutes. Redeemable at all 4 the station Kansas City locations.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-xl px-4 py-14 sm:px-6">
          <div className="rounded-2xl border border-green-ink/10 bg-paper p-6 shadow-soft sm:p-8">
            <h2 className="overline text-ink-soft/60">Choose an amount</h2>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {PRESET_AMOUNTS.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    setAmount(a);
                    setIsCustom(false);
                  }}
                  className={`focus-ring rounded-xl border-2 py-3 text-sm font-bold transition-colors ${
                    !isCustom && amount === a
                      ? "border-green bg-green text-cream"
                      : "border-green-ink/15 text-ink hover:border-green"
                  }`}
                >
                  ${a}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsCustom(true)}
              className={`focus-ring mt-2 w-full rounded-xl border-2 py-3 text-sm font-bold transition-colors ${
                isCustom ? "border-green bg-green text-cream" : "border-green-ink/15 text-ink hover:border-green"
              }`}
            >
              Custom Amount
            </button>
            {isCustom && (
              <div className="relative mt-3">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">$</span>
                <input
                  type="number"
                  min={5}
                  max={500}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="75"
                  className="focus-ring w-full rounded-lg border border-green-ink/15 bg-cream/50 py-2.5 pl-8 pr-4 text-sm text-ink"
                />
              </div>
            )}

            <h2 className="overline mt-7 text-ink-soft/60">Your email (purchaser)</h2>
            <input
              type="email"
              value={purchaserEmail}
              onChange={(e) => setPurchaserEmail(e.target.value)}
              placeholder="you@example.com"
              className="focus-ring mt-2 w-full rounded-lg border border-green-ink/15 bg-cream/50 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/35"
            />

            <h2 className="overline mt-5 text-ink-soft/60">Recipient</h2>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Recipient name"
                className="focus-ring col-span-2 w-full rounded-lg border border-green-ink/15 bg-cream/50 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/35 sm:col-span-1"
              />
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="recipient@example.com"
                className="focus-ring col-span-2 w-full rounded-lg border border-green-ink/15 bg-cream/50 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/35 sm:col-span-1"
              />
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message (optional)"
              rows={3}
              className="focus-ring mt-3 w-full rounded-lg border border-green-ink/15 bg-cream/50 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/35"
            />

            {error && <p className="mt-4 text-sm text-red-accent">{error}</p>}

            <button
              onClick={handleBuy}
              disabled={!isValid || loading}
              className="focus-ring mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-green px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-cream shadow-lift transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Lock className="h-4 w-4" />
              {loading ? "Redirecting to Stripe…" : `Buy Gift Card — ${formatCurrency(finalAmount || 0)}`}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-soft/60">
              <ShieldCheck className="h-3.5 w-3.5" /> Stripe test mode — no real charge.
            </p>
          </div>

          <div className="mt-6 rounded-2xl bg-cream p-5 text-center">
            <p className="text-sm text-ink-soft">
              Already have a gift card? Check your balance and order history from{" "}
              <a href="/account" className="font-semibold text-green-deep underline">
                My Account
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
