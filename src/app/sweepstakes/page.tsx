import type { Metadata } from "next";
import { Trophy, ExternalLink, MousePointerClick, Mail, PartyPopper } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sweepstakes — the station",
  description: "Enter the station's Free Pringles for a Year sweepstakes.",
};

const STEPS = [
  {
    icon: MousePointerClick,
    title: "Enter",
    blurb: "Fill out the official entry form on the station's site — takes about a minute.",
  },
  {
    icon: Mail,
    title: "We announce",
    blurb: "Winners are contacted directly using the info provided on entry.",
  },
  {
    icon: PartyPopper,
    title: "You win",
    blurb: "A year of free Pringles, on the station.",
  },
];

export default function SweepstakesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-green-ink">
          <div className="stripe-bar h-1.5 w-full" />
          <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
            <Trophy className="mx-auto h-11 w-11 text-amber" />
            <p className="overline mt-4 text-amber">Now open</p>
            <h1 className="mt-3 font-display-impact text-5xl tracking-tight text-cream sm:text-6xl">
              Win Free Pringles for an Entire Year
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-cream/80">
              Want to win FREE PRINGLES? the station is giving one lucky winner
              a full year of Pringles — no purchase necessary to enter.
            </p>
            <a
              href="https://www.thestationkc.com/sweepstakes"
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-amber px-8 py-4 text-sm font-bold uppercase tracking-wide text-ink shadow-lift transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Enter Now <ExternalLink className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-cream/50">
              Opens the official entry form on thestationkc.com.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl border border-green-ink/10 bg-paper p-6 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green/10 text-sm font-black text-green-deep">
                    {i + 1}
                  </span>
                  <step.icon className="h-5 w-5 text-green-deep" />
                </div>
                <h3 className="mt-3 font-display text-base font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{step.blurb}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-cream p-6 text-center text-xs leading-relaxed text-ink-soft/70">
            No purchase necessary to enter or win. Void where prohibited. See
            the official rules on thestationkc.com for eligibility, entry
            period, odds of winning, and prize details.
            <br />
            This is a SeJo Labs prototype page — sweepstakes entries are
            handled on the station&apos;s real site, not here.
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
