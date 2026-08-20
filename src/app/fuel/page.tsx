import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Fuel, ArrowRight, CreditCard } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locations } from "@/data/locations";
import { formatCurrency } from "@/lib/format";

export const metadata: Metadata = {
  title: "Fuel — the station",
  description: "24-hour fuel at all 4 the station Kansas City locations. Unleaded, Plus, Premium, Diesel, and more.",
};

export default function FuelPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative h-[38vh] min-h-[280px] w-full overflow-hidden">
          <Image
            src="/images/locations/exterior-pumps.jpg"
            alt="Fuel pumps at the station"
            fill
            priority
            className="object-cover photo-treat"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-ink/90 via-green-ink/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <p className="overline text-amber">Every location, all day</p>
            <h1 className="mt-3 flex items-center gap-3 font-display-impact text-5xl tracking-tight text-cream sm:text-6xl">
              <Fuel className="h-9 w-9" /> 24-Hour Fuel
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 rounded-2xl border border-green-ink/10 bg-cream p-6">
            <CreditCard className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-deep" />
            <p className="text-sm text-ink-soft">
              All pumps are 24 hours using a credit or debit card. All stores
              currently carry Unleaded, Unleaded Plus, Premium, and Diesel.
              Brink Meyer Rd &amp; Stark Ave also carry No Ethanol Premium,
              Brighton also carries E85, and Homer Pkwy also carries Off-Road
              Diesel. All locations sell DEF as well as anti-freeze/coolant,
              brake fluid, many types of oil, and several other items for
              your car for your convenience.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {locations.map((loc) => (
              <div key={loc.slug} className="rounded-2xl border border-green-ink/10 bg-paper p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-ink">{loc.city}</h2>
                  <span className="rounded-full bg-green/10 px-2.5 py-1 text-xs font-bold text-green-deep">#{loc.number}</span>
                </div>
                <p className="mt-1 text-sm text-ink-soft">{loc.address}</p>
                <ul className="mt-4 divide-y divide-green-ink/10 text-sm">
                  {loc.fuelPrices.map((f) => (
                    <li key={f.grade} className="flex justify-between py-1.5">
                      <span className="text-ink-soft">{f.grade}</span>
                      <span className="font-bold text-green-deep">{formatCurrency(f.price)}/gal</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/locations/${loc.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-green-deep hover:text-green"
                >
                  Store details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
