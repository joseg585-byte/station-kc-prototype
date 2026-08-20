"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LogOut, Gift, Receipt, MapPin, User, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import { listOrdersFor } from "@/lib/orders";
import { listGiftCardsFor } from "@/lib/giftCards";
import { getLocation } from "@/data/locations";
import { formatCurrency } from "@/lib/format";
import type { PickupOrder, GiftCard } from "@/lib/types";
import AccountSkeleton from "@/components/skeletons/AccountSkeleton";

export default function AccountPage() {
  const profile = useAuth((s) => s.profile);
  const openModal = useAuth((s) => s.openModal);
  const logout = useAuth((s) => s.logout);

  // The auth store persists to localStorage and rehydrates client-side
  // after mount — without this guard, a returning signed-in visitor sees a
  // flash of "Sign in to your account" before their profile loads in.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // One-time flip once the client has mounted and the persisted store
    // has rehydrated — not a cascading state sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);

  const orders: PickupOrder[] = useMemo(
    () => (profile ? listOrdersFor(profile.email) : []),
    [profile]
  );
  const giftCards: GiftCard[] = useMemo(
    () => (profile ? listGiftCardsFor(profile.email) : []),
    [profile]
  );

  if (!hydrated) {
    return (
      <>
        <Header />
        <AccountSkeleton />
        <Footer />
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
          <User className="mx-auto h-12 w-12 text-ink-soft/30" />
          <h1 className="mt-4 font-display text-2xl font-bold text-ink">Sign in to your account</h1>
          <p className="mt-2 text-ink-soft">View your order history and gift card balances.</p>
          <button
            onClick={openModal}
            className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-green px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-cream shadow-lift"
          >
            Sign In / Sign Up
          </button>
        </main>
        <Footer />
      </>
    );
  }

  const totalGiftBalance = giftCards.reduce((sum, c) => sum + c.balance, 0);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="overline text-green-deep">My Account</p>
            <h1 className="mt-2 font-display text-3xl font-black tracking-tight text-ink">
              Hi, {profile.firstName || "there"}
            </h1>
            <p className="mt-1 text-sm text-ink-soft">{profile.email}</p>
          </div>
          <button
            onClick={logout}
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-green-ink/15 px-4 py-2.5 text-sm font-semibold text-ink-soft hover:border-red-accent hover:text-red-accent"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>

        <div className="mt-10 rounded-2xl border border-green-ink/10 bg-cream p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-green-deep" />
              <h2 className="font-display text-lg font-bold text-ink">Gift Card Balance</h2>
            </div>
            <span className="font-display text-2xl font-black text-green-deep">{formatCurrency(totalGiftBalance)}</span>
          </div>
          {giftCards.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {giftCards.map((c) => (
                <li key={c.code} className="flex items-center justify-between rounded-lg bg-paper px-4 py-2.5 text-sm">
                  <span className="font-mono text-ink-soft">{c.code}</span>
                  <span className="font-semibold text-ink">{formatCurrency(c.balance)} left</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink-soft/70">
              No gift cards yet.{" "}
              <Link href="/gift-cards" className="font-semibold text-green-deep underline">
                Buy one
              </Link>
              .
            </p>
          )}
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-green-deep" />
            <h2 className="font-display text-lg font-bold text-ink">Order History</h2>
          </div>
          {orders.length === 0 ? (
            <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-green-ink/15 bg-cream/50 px-6 py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green/10 text-green-deep">
                <Package className="h-6 w-6" />
              </span>
              <p className="mt-4 font-semibold text-ink">No orders yet</p>
              <p className="mt-1 max-w-xs text-sm text-ink-soft/70">
                Your first pickup is one tap away.
              </p>
              <Link
                href="/menu"
                className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full bg-green px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-cream shadow-soft transition-transform hover:scale-[1.02] active:scale-95"
              >
                Browse the Menu
              </Link>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {orders.map((o) => {
                const loc = getLocation(o.locationSlug);
                return (
                  <li key={o.id} className="rounded-xl border border-green-ink/10 bg-paper p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-bold text-ink">{o.id}</p>
                        {loc && (
                          <p className="flex items-center gap-1 text-xs text-ink-soft">
                            <MapPin className="h-3 w-3" /> {loc.name}
                          </p>
                        )}
                      </div>
                      <span className="rounded-full bg-green/10 px-3 py-1 text-xs font-bold uppercase text-green-deep">
                        {o.status.replace("-", " ")}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1 text-sm text-ink-soft">
                      {o.lines.map((l) => (
                        <li key={l.id}>{l.qty}× {l.name}</li>
                      ))}
                    </ul>
                    <div className="mt-3 flex justify-between border-t border-green-ink/10 pt-3 text-sm font-bold text-ink">
                      <span>{new Date(o.createdAt).toLocaleString()}</span>
                      <span>{formatCurrency(o.total)}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
