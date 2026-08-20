import Link from "next/link";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { locations } from "@/data/locations";
import OrderFromStationButton from "@/components/OrderFromStationButton";

export default function LocationsPreview() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="overline text-green-deep">4 Kansas City locations</p>
            <h2 className="mt-3 font-display-impact text-4xl tracking-tight text-ink sm:text-5xl">
              Find your station
            </h2>
          </div>
          <Link
            href="/locations"
            className="focus-ring inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-green-deep hover:text-green"
          >
            View all locations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((loc) => (
            <div
              key={loc.slug}
              className="group flex flex-col rounded-2xl border border-green-ink/10 bg-paper p-6 shadow-soft transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            >
              <Link href={`/locations/${loc.slug}`} className="focus-ring flex flex-1 flex-col rounded-lg">
                <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-green/10 px-2.5 py-1 text-xs font-bold text-green-deep">
                  #{loc.number}
                </span>
                <h3 className="font-display text-lg font-bold text-ink">{loc.city}</h3>
                <p className="mt-1 flex items-start gap-1.5 text-sm text-ink-soft">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                  {loc.address}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
                  <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                  {loc.hours}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                  {loc.phone}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-green-deep opacity-70 transition-opacity group-hover:opacity-100">
                  Store details <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
              <OrderFromStationButton
                slug={loc.slug}
                className="focus-ring mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-green px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-cream shadow-soft transition-transform hover:scale-[1.02] active:scale-95"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
