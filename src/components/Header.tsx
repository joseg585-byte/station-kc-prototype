"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/store";
import { brand } from "@/data/brand";

const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/locations", label: "Locations" },
  { href: "/gift-cards", label: "Gift Cards" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lines = useCart((s) => s.lines);
  const toggleCart = useCart((s) => s.toggle);
  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-green-ink/10 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-green text-cream font-display font-black text-lg">
            S
          </span>
          <span className="font-display text-xl font-black tracking-tight text-ink lowercase">
            {brand.displayName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold uppercase tracking-wide transition-colors hover:text-green ${
                pathname?.startsWith(link.href) ? "text-green" : "text-ink-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
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
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber text-[11px] font-bold text-ink">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="focus-ring rounded-full p-2 text-ink-soft hover:bg-cream-deep md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-green-ink/10 bg-paper px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {[...NAV_LINKS, { href: "/account", label: "Account" }].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wide text-ink-soft hover:bg-cream-deep hover:text-green"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
