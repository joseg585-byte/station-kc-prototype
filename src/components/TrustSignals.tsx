"use client";

import { MapPin } from "lucide-react";
import { useStorePrefs, getMyLocation, DEMO_DISTANCE_MI } from "@/lib/storePrefs";
import { isOpenNow, closeTimeLabel } from "@/lib/hours";

// Above-the-fold trust pill + stats strip. Distance/reviews/orders are
// illustrative prototype-only figures (no live geolocation, ratings, or
// order-volume backend in this phase) — always labeled "*demo data".
export default function TrustSignals() {
  const myStoreSlug = useStorePrefs((s) => s.myStoreSlug);
  const myStore = getMyLocation(myStoreSlug);
  const openNow = isOpenNow(myStore.hours);
  const distance = DEMO_DISTANCE_MI[myStore.slug] ?? 2.1;

  return (
    <div className="float-up" style={{ animationDelay: "300ms" }}>
      <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-2 text-xs font-semibold text-cream backdrop-blur-sm sm:text-sm">
        <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-amber" />
        <span>
          {myStore.city} · {distance} mi ·{" "}
          {openNow ? (
            <>Open until {closeTimeLabel(myStore.hours) || "close"}</>
          ) : (
            "Closed now"
          )}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-cream/70 sm:text-sm">
        <span>5,000+ orders this week</span>
        <span className="hidden text-cream/30 sm:inline">·</span>
        <span>4.8★ (312 reviews)</span>
        <span className="hidden text-cream/30 sm:inline">·</span>
        <span>Ready in ~7 min avg</span>
      </div>
      <p className="mt-1 text-[11px] text-cream/40">*demo data</p>
    </div>
  );
}
