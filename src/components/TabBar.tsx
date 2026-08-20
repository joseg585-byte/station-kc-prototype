"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, Gift, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/store";

// Fixed bottom tab bar — mobile only (hidden at the `lg` breakpoint, where
// the header's top nav takes over). Mirrors the 4-icon pattern used by
// Sheetz/Wawa/Speedy Rewards style native apps.
const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/rewards", label: "Rewards", icon: Gift },
];

export default function TabBar() {
  const pathname = usePathname();
  const lines = useCart((s) => s.lines);
  const toggleCart = useCart((s) => s.toggle);
  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);

  const [bounce, setBounce] = useState(false);
  const prevCount = useRef(itemCount);

  useEffect(() => {
    if (itemCount > prevCount.current) {
      setBounce(true);
      const t = setTimeout(() => setBounce(false), 300);
      prevCount.current = itemCount;
      return () => clearTimeout(t);
    }
    prevCount.current = itemCount;
  }, [itemCount]);

  return (
    <nav
      className="pb-safe fixed bottom-0 left-0 right-0 z-40 flex h-16 items-stretch border-t border-green-ink/10 bg-paper/95 shadow-[0_-4px_20px_rgba(16,20,15,0.08)] backdrop-blur-md lg:hidden"
      aria-label="Primary"
    >
      {TABS.map((tab) => {
        const active = tab.href === "/" ? pathname === "/" : pathname?.startsWith(tab.href);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`focus-ring flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-bold uppercase tracking-wide transition-colors active:scale-95 ${
              active ? "text-green-deep" : "text-ink-soft/70"
            }`}
          >
            <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
            {tab.label}
          </Link>
        );
      })}
      <button
        onClick={toggleCart}
        className="focus-ring relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-bold uppercase tracking-wide text-ink-soft/70 transition-colors active:scale-95"
        aria-label="Open cart"
      >
        <span
          className={`relative inline-flex transition-transform duration-300 ease-out ${
            bounce ? "scale-125" : "scale-100"
          }`}
        >
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span
              key={itemCount}
              className="badge-pop absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber text-[10px] font-bold text-ink"
            >
              {itemCount}
            </span>
          )}
        </span>
        Cart
      </button>
    </nav>
  );
}
