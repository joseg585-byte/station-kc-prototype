"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Copy, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { takePendingGiftCard } from "@/lib/pendingGiftCards";
import { generateGiftCardCode, saveGiftCard } from "@/lib/giftCards";
import { formatCurrency } from "@/lib/format";
import type { GiftCard } from "@/lib/types";

function SuccessContent() {
  const params = useSearchParams();
  const giftId = params.get("giftId");
  const [card, setCard] = useState<GiftCard | null>(null);
  const [emailStatus, setEmailStatus] = useState<"sending" | "sent" | "demo" | "error">("sending");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!giftId) return;
    const pending = takePendingGiftCard(giftId);
    if (!pending) return;

    const code = generateGiftCardCode();
    const newCard: GiftCard = {
      code,
      amount: pending.amount,
      balance: pending.amount,
      purchaserEmail: pending.purchaserEmail,
      recipientEmail: pending.recipientEmail,
      recipientName: pending.recipientName,
      message: pending.message,
      createdAt: new Date().toISOString(),
    };
    saveGiftCard(newCard);
    // One-time finalization gated on a stable URL param — not a cascading update.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCard(newCard);

    fetch("/api/gift-cards/deliver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCard),
    })
      .then((r) => r.json())
      .then((res) => setEmailStatus(res.sent ? "sent" : res.demo ? "demo" : "error"))
      .catch(() => setEmailStatus("error"));
  }, [giftId]);

  const copyCode = () => {
    if (!card) return;
    navigator.clipboard?.writeText(card.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!card) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-2xl font-bold text-ink">Gift card not found</h1>
        <p className="mt-2 text-ink-soft">This confirmation link has already been used or expired.</p>
        <Link href="/gift-cards" className="mt-6 inline-block rounded-full bg-green px-6 py-3 text-sm font-bold uppercase tracking-wide text-cream">
          Buy a Gift Card
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green" />
        <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-ink">Gift card sent!</h1>
        <p className="mt-2 text-ink-soft">
          {emailStatus === "sending" && "Sending confirmation email…"}
          {emailStatus === "sent" && `Emailed to ${card.recipientEmail}.`}
          {emailStatus === "demo" && "Demo mode: no email API key configured — code shown below."}
          {emailStatus === "error" && "Email delivery failed, but your code is saved below."}
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border-2 border-green shadow-lift">
        <div className="bg-green-ink px-6 py-6 text-center">
          <p className="overline text-amber">the station gift card</p>
          <p className="mt-2 font-display text-4xl font-black text-cream">{formatCurrency(card.amount)}</p>
        </div>
        <div className="bg-paper px-6 py-6 text-center">
          <p className="overline text-ink-soft/60">Redemption Code</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <code className="font-display text-xl font-bold tracking-wide text-ink">{card.code}</code>
            <button onClick={copyCode} className="focus-ring rounded-full p-1.5 text-ink-soft hover:bg-cream-deep" aria-label="Copy code">
              <Copy className="h-4 w-4" />
            </button>
          </div>
          {copied && <p className="mt-1 text-xs font-medium text-green-deep">Copied!</p>}
          {card.recipientName && <p className="mt-4 text-sm text-ink-soft">To: {card.recipientName}</p>}
          {card.message && <p className="mt-1 text-sm italic text-ink-soft/80">&ldquo;{card.message}&rdquo;</p>}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl bg-cream p-4 text-sm text-ink-soft">
        <Mail className="h-4 w-4 flex-shrink-0 text-green-deep" />
        A copy was sent to {card.recipientEmail}. Redeemable at checkout or in-store.
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/account" className="flex-1 rounded-full border-2 border-green px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-green-deep hover:bg-green hover:text-cream">
          View My Gift Cards
        </Link>
        <Link href="/menu" className="flex-1 rounded-full bg-green px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-cream">
          Order Something
        </Link>
      </div>
    </main>
  );
}

export default function GiftCardSuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="py-24 text-center text-ink-soft">Loading…</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </>
  );
}
