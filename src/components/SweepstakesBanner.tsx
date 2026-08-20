"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const DISMISS_KEY = "thestation-sweeps-banner-dismissed";

// Bright, dismissible acquisition banner above the hero — mirrors the real
// site's #1 conversion play. Remembers dismissal in localStorage.
export default function SweepstakesBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY) !== "1") {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="stripe-bar-alert relative">
      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 sm:px-6">
        <Link
          href="/sweepstakes"
          className="focus-ring rounded-full bg-ink/85 px-4 py-1.5 text-center text-xs font-bold uppercase tracking-wide text-cream backdrop-blur-sm transition-transform hover:scale-[1.02] active:scale-[0.98] sm:text-sm"
        >
          🍟 Want free Pringles for a year? Enter Now →
        </Link>
        <button
          onClick={() => {
            localStorage.setItem(DISMISS_KEY, "1");
            setVisible(false);
          }}
          aria-label="Dismiss sweepstakes banner"
          className="focus-ring flex-shrink-0 rounded-full bg-ink/20 p-1.5 text-ink transition-colors hover:bg-ink/35"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
