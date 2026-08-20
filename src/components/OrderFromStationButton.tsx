"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useStorePrefs } from "@/lib/storePrefs";

// Sets the given location as "my store" then routes to the menu — the
// one-tap "order from here" pattern used on each location card/page.
export default function OrderFromStationButton({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const setMyStore = useStorePrefs((s) => s.setMyStore);

  return (
    <Link
      href="/menu"
      onClick={(e) => {
        e.stopPropagation();
        setMyStore(slug);
      }}
      className={
        className ??
        "focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-green px-5 py-3 text-sm font-bold uppercase tracking-wide text-cream shadow-soft transition-transform hover:scale-[1.02] active:scale-95"
      }
    >
      <ShoppingBag className="h-4 w-4" />
      Order from this station
    </Link>
  );
}
