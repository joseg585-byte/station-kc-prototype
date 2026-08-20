"use client";

// Shared "my store" preference — the location the customer picked in the
// mobile store selector. Persists across visits like a native app's saved
// pickup location. Also carries lightweight prototype-only demo stats
// (fake distance/rating) since we don't have a real geolocation/reviews
// backend in this phase.
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { locations, type Location } from "@/data/locations";

// Illustrative-only distances (miles) — no real geolocation lookup in this
// prototype phase. Keyed by slug.
export const DEMO_DISTANCE_MI: Record<string, number> = {
  "brink-meyer": 2.1,
  brighton: 4.6,
  stark: 7.8,
  homer: 3.3,
};

type StorePrefsState = {
  myStoreSlug: string;
  setMyStore: (slug: string) => void;
};

export const useStorePrefs = create<StorePrefsState>()(
  persist(
    (set) => ({
      myStoreSlug: locations[0].slug,
      setMyStore: (slug) => set({ myStoreSlug: slug }),
    }),
    { name: "thestation-prefs" }
  )
);

export function getMyLocation(slug: string): Location {
  return locations.find((l) => l.slug === slug) ?? locations[0];
}
