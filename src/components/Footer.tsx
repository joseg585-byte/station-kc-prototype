import Link from "next/link";
import Image from "next/image";
import { Music2 } from "lucide-react";
import { brand } from "@/data/brand";
import { locations } from "@/data/locations";

// lucide-react dropped brand/social glyphs, so these socials use small
// inline SVGs instead of icon-library imports.
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.35C16.24 4.32 15.32 4.24 14.26 4.24c-2.2 0-3.76 1.34-3.76 3.8V10.5H8v3h2.5V21h3Z" />
    </svg>
  );
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 4l7.2 8.6L4.4 20h2.3l5.9-6.4 4.5 6.4H21l-7.5-9 6.4-7.4h-2.3l-5.5 6-4.1-6H4Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-green-ink/10 bg-green-ink text-cream">
      <div className="stripe-bar h-1.5 w-full" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center rounded-lg bg-cream/95 p-1.5 w-fit">
              <Image
                src="/images/brand/station-logo.png"
                alt={brand.displayName}
                width={1806}
                height={800}
                className="h-9 w-auto"
              />
            </div>
            <p className="mt-4 max-w-xs text-sm text-cream/70">
              {brand.subtagline}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={brand.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="focus-ring rounded-full bg-cream/10 p-2 text-cream/80 transition-colors hover:bg-amber hover:text-ink"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={brand.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="focus-ring rounded-full bg-cream/10 p-2 text-cream/80 transition-colors hover:bg-amber hover:text-ink"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={brand.socials.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="focus-ring rounded-full bg-cream/10 p-2 text-cream/80 transition-colors hover:bg-amber hover:text-ink"
              >
                <Music2 className="h-4 w-4" />
              </a>
              <a
                href={brand.socials.x}
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="focus-ring rounded-full bg-cream/10 p-2 text-cream/80 transition-colors hover:bg-amber hover:text-ink"
              >
                <XIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="overline text-cream/50">Shop</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/menu" className="text-cream/80 hover:text-amber">Full Menu</Link></li>
              <li><Link href="/menu?category=liquor" className="text-cream/80 hover:text-amber">Cutter &amp; Cork Liquor</Link></li>
              <li><Link href="/gift-cards" className="text-cream/80 hover:text-amber">Gift Cards</Link></li>
              <li><Link href="/rewards" className="text-cream/80 hover:text-amber">Station Rewards</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="overline text-cream/50">Locations</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link href={`/locations/${l.slug}`} className="text-cream/80 hover:text-amber">
                    {l.city} — {l.address.split(",")[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="overline text-cream/50">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/careers" className="text-cream/80 hover:text-amber">Careers</Link></li>
              <li><Link href="/sweepstakes" className="text-cream/80 hover:text-amber">Sweepstakes</Link></li>
              <li><Link href="/account" className="text-cream/80 hover:text-amber">My Account</Link></li>
              <li><a href="https://dibellasfood.com/" target="_blank" rel="noreferrer" className="text-cream/80 hover:text-amber">Di Bella&apos;s Grill &amp; Pizza</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} the station · Kansas City, MO</p>
          <p>SeJo Labs prototype — not affiliated with The Station.</p>
        </div>
      </div>
    </footer>
  );
}
