import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";

export default function GiftCardPromo() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-green-ink px-8 py-16 text-center sm:px-16">
        <div className="stripe-bar absolute inset-x-0 top-0 h-2" />
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-green/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-amber/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-xl">
          <Gift className="mx-auto h-10 w-10 text-amber" />
          <h2 className="mt-4 font-display-impact text-4xl tracking-tight text-cream sm:text-5xl">
            Give the station
          </h2>
          <p className="mt-3 text-cream/80">
            Digital gift cards from $10 to $100 (or any custom amount), delivered by
            email in minutes. Redeemable at any of our 4 KC locations.
          </p>
          <Link
            href="/gift-cards"
            className="focus-ring mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-amber px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-ink shadow-lift transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Buy a Gift Card <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
