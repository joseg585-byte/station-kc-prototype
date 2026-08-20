"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, User, ChevronDown, MapPin } from "lucide-react";
import { useCart } from "@/lib/store";
import { brand } from "@/data/brand";
import { locations } from "@/data/locations";
import { useStorePrefs, getMyLocation } from "@/lib/storePrefs";
import { isOpenNow } from "@/lib/hours";

// Mirrors the nav structure + ordering at thestationkc.com (Aug 2026):
// Home, Fuel, Food ▾, Liquor, Careers, Station Rewards, Order ▾, Locations ▾, Sweepstakes.
type NavLink = { href: string; label: string; external?: boolean };
type NavItem = { label: string; href?: string; children?: NavLink[] };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Fuel", href: "/fuel" },
  {
    label: "Food",
    children: [
      { href: "/menu?category=donuts", label: "Di Bella's Donuts & More" },
      { href: "https://dibellasfood.com/", label: "Di Bella's Grill & Pizza", external: true },
    ],
  },
  { label: "Liquor", href: "/menu?category=liquor" },
  { label: "Careers", href: "/careers" },
  { label: "Station Rewards", href: "/rewards" },
  {
    label: "Order",
    children: [
      { href: "/menu", label: "Pickup Order" },
      { href: "/gift-cards", label: "Gift Cards" },
    ],
  },
  {
    label: "Locations",
    children: [
      { href: "/locations/brink-meyer", label: "1. Brink Meyer" },
      { href: "/locations/brighton", label: "2. Brighton" },
      { href: "/locations/stark", label: "3. Stark" },
      { href: "/locations/homer", label: "4. Homer" },
    ],
  },
  { label: "Sweepstakes", href: "/sweepstakes" },
];

function NavDropdown({ item, active }: { item: NavItem; active: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        className={`focus-ring flex items-center gap-1 rounded-md text-sm font-semibold uppercase tracking-wide transition-colors hover:text-green ${
          active ? "text-green" : "text-ink-soft"
        }`}
        aria-expanded={hover}
      >
        {item.label}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {hover && (
        <div className="absolute left-1/2 top-full z-50 min-w-[220px] -translate-x-1/2 pt-2">
          <div className="overflow-hidden rounded-xl border border-green-ink/10 bg-paper py-1.5 shadow-lift">
            {item.children!.map((c) =>
              c.external ? (
                <a
                  key={c.href}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-4 py-2 text-sm font-medium text-ink-soft hover:bg-cream-deep hover:text-green"
                >
                  {c.label}
                </a>
              ) : (
                <Link
                  key={c.href}
                  href={c.href}
                  className="block px-4 py-2 text-sm font-medium text-ink-soft hover:bg-cream-deep hover:text-green"
                >
                  {c.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileGroupOpen, setMobileGroupOpen] = useState<string | null>(null);
  const [storePickerOpen, setStorePickerOpen] = useState(false);
  const pathname = usePathname();
  const lines = useCart((s) => s.lines);
  const toggleCart = useCart((s) => s.toggle);
  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);

  const myStoreSlug = useStorePrefs((s) => s.myStoreSlug);
  const setMyStore = useStorePrefs((s) => s.setMyStore);
  const myStore = getMyLocation(myStoreSlug);
  const openNow = isOpenNow(myStore.hours);

  return (
    <header className="sticky top-0 z-40 border-b border-green-ink/10 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Image
            src="/images/brand/station-logo.png"
            alt={brand.displayName}
            width={1806}
            height={800}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.label}
                item={item}
                active={item.children.some((c) => !c.external && pathname?.startsWith(c.href.split("?")[0]))}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                aria-current={
                  (item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href!))
                    ? "page"
                    : undefined
                }
                className={`text-sm font-semibold uppercase tracking-wide transition-colors hover:text-green ${
                  (item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href!))
                    ? "text-green"
                    : "text-ink-soft"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/account"
            className="focus-ring hidden rounded-full p-2 text-ink-soft transition-colors hover:bg-cream-deep hover:text-green sm:inline-flex"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>
          <button
            onClick={toggleCart}
            className="focus-ring relative rounded-full p-2 text-ink-soft transition-colors hover:bg-cream-deep hover:text-green"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span
                key={itemCount}
                className="badge-pop absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber text-[11px] font-bold text-ink"
              >
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="focus-ring rounded-full p-2 text-ink-soft hover:bg-cream-deep lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Sticky mobile store selector — "app home screen" pattern, hidden on
          desktop where the top nav + Locations dropdown already cover this.
          Fixed height (not implicit padding+text) so it can't vary in size
          and shift <main> on hydration. */}
      <div className="relative border-t border-green-ink/10 bg-cream-deep/70 lg:hidden">
        <button
          onClick={() => setStorePickerOpen((v) => !v)}
          className="focus-ring flex w-full items-center justify-between gap-2 px-4 text-xs font-semibold text-ink-soft"
          style={{ height: "var(--store-row-h)" }}
          aria-expanded={storePickerOpen}
        >
          <span className="flex min-w-0 items-center gap-1.5 truncate">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-green-deep" />
            Pick up at: <span className="truncate text-ink">{myStore.city}</span>
            <ChevronDown className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${storePickerOpen ? "rotate-180" : ""}`} />
          </span>
          <span className="flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap">
            <span
              className={`h-2 w-2 rounded-full ${openNow ? "bg-green-bright" : "bg-red-accent"}`}
              aria-hidden
            />
            {openNow ? "Open Now" : "Closed"}
          </span>
        </button>
        {storePickerOpen && (
          <div className="border-t border-green-ink/10 bg-paper px-2 py-1.5 shadow-soft">
            {locations.map((loc) => (
              <button
                key={loc.slug}
                onClick={() => {
                  setMyStore(loc.slug);
                  setStorePickerOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${
                  loc.slug === myStoreSlug
                    ? "bg-green/10 font-semibold text-green-deep"
                    : "text-ink-soft hover:bg-cream-deep"
                }`}
              >
                <span>
                  #{loc.number} {loc.city} <span className="text-xs text-ink-soft/60">— {loc.address}</span>
                </span>
                {loc.slug === myStoreSlug && <span className="text-xs font-bold">My store</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {open && (
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-green-ink/10 bg-paper px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    onClick={() =>
                      setMobileGroupOpen((g) => (g === item.label ? null : item.label))
                    }
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wide text-ink-soft hover:bg-cream-deep hover:text-green"
                    aria-expanded={mobileGroupOpen === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileGroupOpen === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileGroupOpen === item.label && (
                    <ul className="ml-3 flex flex-col gap-0.5 border-l border-green-ink/10 pl-3">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          {c.external ? (
                            <a
                              href={c.href}
                              target="_blank"
                              rel="noreferrer"
                              className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-cream-deep hover:text-green"
                            >
                              {c.label}
                            </a>
                          ) : (
                            <Link
                              href={c.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-cream-deep hover:text-green"
                            >
                              {c.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href!}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wide text-ink-soft hover:bg-cream-deep hover:text-green"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
            <li>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wide text-ink-soft hover:bg-cream-deep hover:text-green"
              >
                Account
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
