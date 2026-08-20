import Link from "next/link";
import Image from "next/image";
import { Fuel, Croissant, Pizza, Wine, ArrowUpRight } from "lucide-react";

const FEATURES = [
  {
    href: "/menu?category=donuts",
    icon: Croissant,
    label: "Di Bella's Donuts & More",
    blurb: "Donuts hot enough to fog the bag. Coffee that fixes mornings.",
    image: "/images/menu/donuts-assorted.jpg",
  },
  {
    href: "/menu?category=grill",
    icon: Pizza,
    label: "Di Bella's Grill & Pizza",
    blurb: "Cheesesteaks off the flat-top. Pizza pulled from the oven, still bubbling.",
    image: "/images/menu/philly-cheesesteak.jpg",
  },
  {
    href: "/menu?category=liquor",
    icon: Wine,
    label: "Cutter & Cork Liquor",
    blurb: "Ice-cold beer, KC craft on rotation, and whiskey for every last-minute gift.",
    image: "/images/menu/liquor-shelf.jpg",
  },
  {
    href: "/fuel",
    icon: Fuel,
    label: "24-Hour Fuel",
    blurb: "Pumps never sleep. Unleaded, Plus, Premium, Diesel — plus E85, Off-Road, and No-Ethanol at select stops.",
    image: "/images/locations/exterior-pumps.jpg",
  },
];

export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <p className="overline text-green-deep">What we&apos;ve got</p>
        <h2 className="mt-3 font-display-impact text-4xl tracking-tight text-ink sm:text-5xl">
          Everything in one stop
        </h2>
        <p className="mt-3 text-ink-soft">
          Four categories, four Kansas City locations, one fast checkout.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl shadow-soft transition-transform duration-200 ease-out hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] active:scale-95"
          >
            <Image
              src={f.image}
              alt={f.label}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover photo-treat transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
            <div className="relative z-10 p-5">
              <f.icon className="mb-2 h-6 w-6 text-amber" />
              <h3 className="font-display font-black uppercase tracking-tight text-lg text-cream">{f.label}</h3>
              <p className="mt-1 text-sm text-cream/75">{f.blurb}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-amber opacity-0 transition-opacity group-hover:opacity-100">
                Explore <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
