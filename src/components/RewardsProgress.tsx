"use client";

import { useState } from "react";
import { Barcode, X } from "lucide-react";

// Demo-only current-user point balance — no real accounts/points ledger in
// this prototype phase. Progress bar tracks toward the next redemption tier.
const DEMO_POINTS = 640;

const TIERS = [250, 500, 1000, 2500];

function nextTier(points: number): number {
  return TIERS.find((t) => t > points) ?? TIERS[TIERS.length - 1];
}

// Renders a row of bars that reads as a Code128-style barcode. Not a real,
// scannable encoding — a visual placeholder for the prototype's "show my
// barcode at checkout" flow.
function BarcodePlaceholder({ code }: { code: string }) {
  const bars = Array.from(code).map((ch, i) => (i * 7 + ch.charCodeAt(0)) % 4 + 1);
  return (
    <div className="flex h-20 items-stretch gap-[2px]">
      {bars.map((w, i) => (
        <div key={i} className="bg-ink" style={{ width: `${w * 2}px` }} />
      ))}
    </div>
  );
}

export default function RewardsProgress() {
  const [showBarcode, setShowBarcode] = useState(false);
  const next = nextTier(DEMO_POINTS);
  const pct = Math.min(100, Math.round((DEMO_POINTS / next) * 100));
  const memberCode = "STN-4471-9082";

  return (
    <div className="rounded-2xl border border-green-ink/10 bg-paper p-6 shadow-soft">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/60">
            Your balance <span className="text-ink-soft/40">*demo data</span>
          </p>
          <p className="font-display-impact text-4xl tracking-tight text-green-deep">
            {DEMO_POINTS.toLocaleString()} <span className="text-lg font-sans font-semibold text-ink-soft">pts</span>
          </p>
        </div>
        <button
          onClick={() => setShowBarcode(true)}
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-green px-5 py-3 text-sm font-bold uppercase tracking-wide text-cream shadow-soft transition-transform hover:scale-[1.02] active:scale-95"
        >
          <Barcode className="h-4 w-4" />
          Show my barcode
        </button>
      </div>

      <div className="mt-5">
        <div className="h-3 w-full overflow-hidden rounded-full bg-cream-deep">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green to-green-bright transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-xs font-medium text-ink-soft">
          {next - DEMO_POINTS} pts to your next reward at {next.toLocaleString()} pts
        </p>
      </div>

      {showBarcode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
          onClick={() => setShowBarcode(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-paper p-6 text-center shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowBarcode(false)}
              aria-label="Close barcode"
              className="focus-ring absolute right-3 top-3 rounded-full p-1.5 text-ink-soft/60 hover:bg-cream-deep hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="font-display text-lg font-bold text-ink">Scan at checkout</p>
            <p className="mt-1 text-sm text-ink-soft">{DEMO_POINTS.toLocaleString()} pts available</p>
            <div className="mt-5 flex justify-center rounded-xl bg-cream p-4">
              <BarcodePlaceholder code={memberCode} />
            </div>
            <p className="mt-3 font-mono text-sm tracking-widest text-ink-soft">{memberCode}</p>
            <p className="mt-4 text-xs text-ink-soft/50">
              Placeholder barcode — illustrative only, not a scannable code.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
