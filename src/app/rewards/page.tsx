import type { Metadata } from "next";
import Link from "next/link";
import { Star, ExternalLink, Fuel, Coffee, Sparkles, Gauge, Trophy, Gift } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { brand } from "@/data/brand";

export const metadata: Metadata = {
  title: "Station Rewards — the station",
  description:
    "the station's Station Rewards program, plus a look at what a native SeJo Labs loyalty program could offer.",
};

const TIERS = [
  {
    icon: Fuel,
    name: "Fill Up",
    range: "0–499 pts / year",
    perks: ["1 pt per $1 spent", "Birthday donut on us"],
  },
  {
    icon: Gauge,
    name: "Premium",
    range: "500–1,499 pts / year",
    perks: ["1.25 pts per $1 spent", "5¢/gal off every fill-up", "Free coffee, any size"],
  },
  {
    icon: Trophy,
    name: "VIP",
    range: "1,500+ pts / year",
    perks: ["1.5 pts per $1 spent", "10¢/gal off every fill-up", "Early access to promos & gift-card bonuses"],
  },
];

const REDEEM = [
  { icon: Coffee, label: "Free coffee or fountain drink", pts: "150 pts" },
  { icon: Sparkles, label: "Free donut (any variety)", pts: "200 pts" },
  { icon: Fuel, label: "25¢/gal off one fill-up", pts: "400 pts" },
  { icon: Gift, label: "$10 gift card", pts: "1,000 pts" },
];

export default function RewardsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-green-ink py-20">
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Star className="mx-auto h-10 w-10 text-amber" />
            <h1 className="mt-4 font-display-impact text-5xl tracking-tight text-cream sm:text-6xl">
              Station Rewards
            </h1>
            <p className="mt-3 text-cream/80">
              Real local savings today, with a look at what a native SeJo Labs
              loyalty program could unlock next.
            </p>
          </div>
        </section>

        {/* Real program */}
        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="overline text-ink-soft/60">Today</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
            The real Station Rewards program
          </h2>
          <p className="mt-3 text-ink-soft">
            the station&apos;s Station Rewards program is powered by SaveAround
            and connects members to local deals and discounts at the station
            and other Kansas City-area businesses. It runs on SaveAround&apos;s
            own platform, separate from this site.
          </p>
          <a
            href={brand.rewardsUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full bg-green px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-cream shadow-lift transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Visit Station Rewards on SaveAround <ExternalLink className="h-4 w-4" />
          </a>
        </section>

        {/* Native concept */}
        <section className="border-t border-green-ink/10 bg-cream">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                Concept
              </span>
              <p className="overline text-ink-soft/60">What SeJo Labs could build natively</p>
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
              Points earned right at checkout — no separate app
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              Instead of routing members to a third-party coupon site, a native
              rewards program could track points automatically on every fuel,
              food, and liquor purchase made through this app — pickup orders,
              gift cards, and (eventually) pay-at-pump — with balances visible
              right on the{" "}
              <Link href="/account" className="font-semibold text-green-deep underline">
                Account
              </Link>{" "}
              page.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-2xl border border-green-ink/10 bg-paper p-6 shadow-soft"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green/10 text-green-deep">
                    <tier.icon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">{tier.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/60">
                    {tier.range}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                    {tier.perks.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="text-green-deep">•</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-green-ink/10 bg-paper p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold text-ink">Sample redemption menu</h3>
              <ul className="mt-4 divide-y divide-green-ink/10 text-sm">
                {REDEEM.map((r) => (
                  <li key={r.label} className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-2.5 text-ink-soft">
                      <r.icon className="h-4 w-4 text-green-deep" /> {r.label}
                    </span>
                    <span className="font-bold text-green-deep">{r.pts}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-ink-soft/60">
                Illustrative only — a native SeJo Labs prototype concept, not
                part of the live Station Rewards / SaveAround program.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
