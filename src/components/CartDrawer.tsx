"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ArrowRight } from "lucide-react";
import { useCart, cartTotals } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import { getLocation } from "@/data/locations";
import EmptyCartIllustration from "@/components/EmptyCartIllustration";
import PaymentLogos from "@/components/PaymentLogos";

export default function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const locationSlug = useCart((s) => s.locationSlug);
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);

  const { subtotal, tax, total } = cartTotals(lines);
  const location = locationSlug ? getLocation(locationSlug) : undefined;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-paper shadow-lift transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-green-ink/10 px-5 py-4">
          <h2 className="font-display text-lg font-bold text-ink">Your Order</h2>
          <button
            onClick={close}
            className="focus-ring rounded-full p-1.5 text-ink-soft hover:bg-cream-deep"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {location && (
          <div className="border-b border-green-ink/10 bg-cream px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-green-deep">
            Pickup at {location.name}
          </div>
        )}

        <div className="scroll-elegant flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <EmptyCartIllustration />
              <p className="mt-4 font-display text-lg font-bold text-ink">Nothing brewing yet</p>
              <p className="mt-1 max-w-[22ch] text-sm text-ink-soft/70">
                Start your order and we&apos;ll have it fresh and ready for pickup.
              </p>
              <Link
                href="/menu"
                onClick={close}
                className="focus-ring mt-5 inline-flex items-center gap-1.5 rounded-full bg-green px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-cream shadow-soft transition-transform hover:scale-[1.02] active:scale-95"
              >
                Start your order <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-10 w-full border-t border-green-ink/10 pt-5">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-ink-soft/40">
                  Secure checkout, ready when you are
                </p>
                <PaymentLogos />
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-cream-deep">
                    {line.image && (
                      <Image src={line.image} alt={line.name} fill className="object-cover photo-treat" sizes="64px" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="text-sm font-semibold text-ink">{line.name}</p>
                      <p className="text-sm font-semibold text-ink">{formatCurrency(line.price * line.qty)}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQty(line.id, line.qty - 1)}
                        className="focus-ring rounded-full border border-ink/15 p-1 text-ink-soft hover:bg-cream-deep"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-medium">{line.qty}</span>
                      <button
                        onClick={() => updateQty(line.id, line.qty + 1)}
                        className="focus-ring rounded-full border border-ink/15 p-1 text-ink-soft hover:bg-cream-deep"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => removeItem(line.id)}
                        className="focus-ring ml-auto text-xs font-medium text-ink-soft/70 underline-offset-2 hover:text-red-accent hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-green-ink/10 px-5 py-5">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between pt-1.5 text-base font-bold text-ink">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="focus-ring mt-4 flex w-full items-center justify-center rounded-full bg-green px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-cream shadow-lift transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Checkout — Pickup Only
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
