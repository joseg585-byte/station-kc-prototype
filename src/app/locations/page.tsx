import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Locations — the station",
  description: "All 4 the station Kansas City locations: hours, phone, and directions.",
};

export default function LocationsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-green-ink/10 bg-cream py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="overline text-green-deep">Kansas City, Missouri</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
              Our 4 Locations
            </h1>
            <p className="mt-3 max-w-xl text-ink-soft">
              Every station pumps fuel 24 hours a day and serves Di Bella&apos;s
              food fresh, all day long.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-green-ink/10 bg-paper shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={loc.photo}
                    alt={loc.name}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover photo-treat transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                    #{loc.number}
                  </span>
                  <p className="absolute bottom-3 left-4 font-display text-xl font-bold text-cream">
                    {loc.city}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-start gap-2 text-sm text-ink-soft">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-deep" />
                    {loc.address}, {loc.city}, {loc.state} {loc.zip}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
                    <Clock className="h-4 w-4 flex-shrink-0 text-green-deep" />
                    {loc.hours}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
                    <Phone className="h-4 w-4 flex-shrink-0 text-green-deep" />
                    {loc.phone}
                  </p>
                  <p className="mt-3 text-sm text-ink-soft/80">{loc.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-green-deep">
                    Store details <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
