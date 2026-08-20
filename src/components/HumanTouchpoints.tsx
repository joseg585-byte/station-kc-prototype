import { Coffee, Smartphone } from "lucide-react";

// Two human-touchpoint moments to break up the "sterile menu grid" feel on
// the homepage. Real Unsplash photography needs a screenshot-based
// brand-safety check before shipping (no rival logos, no cultural
// mismatch) — that verification tool wasn't available in this pass, so
// these ship as tasteful gradient cards instead of an unverified photo.
// Swap in vetted photography later without touching the layout.
const MOMENTS = [
  {
    icon: Coffee,
    title: "Handed off, still hot",
    blurb: "Fresh coffee, passed across the counter in seconds.",
    from: "from-green-ink",
    to: "to-green-deep",
  },
  {
    icon: Smartphone,
    title: "Tap, pump, go",
    blurb: "Pay at the pump with a tap — no card, no hassle.",
    from: "from-amber-deep",
    to: "to-amber",
  },
];

export default function HumanTouchpoints() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {MOMENTS.map((m) => (
          <div
            key={m.title}
            className={`group relative flex h-56 flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${m.from} ${m.to} p-6 shadow-soft transition-transform duration-200 ease-out hover:scale-[1.02]`}
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <m.icon className="mb-3 h-8 w-8 text-cream/90" />
            <h3 className="font-display text-lg font-bold text-cream">{m.title}</h3>
            <p className="mt-1 text-sm text-cream/75">{m.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
