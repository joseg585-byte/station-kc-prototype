import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Phone, Clock, Fuel, ArrowRight, Navigation } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderFromStationButton from "@/components/OrderFromStationButton";
import { locations, getLocation } from "@/data/locations";
import { formatCurrency, formatPhoneHref } from "@/lib/format";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  return {
    title: `${loc.name} — the station`,
    description: `${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}. Hours: ${loc.hours}.`,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const fullAddress = `${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

  return (
    <>
      <Header />
      <main>
        <section className="relative h-[46vh] min-h-[320px] w-full overflow-hidden">
          <Image src={loc.photo} alt={loc.name} fill priority className="object-cover photo-treat" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <span className="rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
              Station #{loc.number}
            </span>
            <h1 className="mt-3 font-display-impact text-5xl tracking-tight text-cream sm:text-6xl">
              {loc.city}
            </h1>
            <p className="mt-2 text-cream/85">{loc.address}, {loc.city}, {loc.state} {loc.zip}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-ink">About this station</h2>
              <p className="mt-3 text-ink-soft">{loc.blurb}</p>
              <p className="mt-1 text-sm font-medium text-green-deep">{loc.since}</p>

              <div className="mt-8 overflow-hidden rounded-2xl border border-green-ink/10 shadow-soft">
                <iframe
                  title={`Map to ${loc.name}`}
                  src={mapSrc}
                  className="h-80 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-10">
                <h3 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
                  <Fuel className="h-5 w-5 text-green-deep" /> Fuel Prices
                </h3>
                <p className="mt-1 text-sm text-ink-soft/70">
                  Illustrative pricing for this prototype — pumps run 24 hours with credit/debit card.
                </p>
                <div className="mt-4 overflow-hidden rounded-xl border border-green-ink/10">
                  <table className="w-full text-sm">
                    <tbody>
                      {loc.fuelPrices.map((f, i) => (
                        <tr key={f.grade} className={i % 2 === 0 ? "bg-cream" : "bg-paper"}>
                          <td className="px-4 py-3 font-medium text-ink">{f.grade}</td>
                          <td className="px-4 py-3 text-right font-bold text-green-deep">
                            {formatCurrency(f.price)}/gal
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {loc.fuelNotes.map((n) => (
                    <li key={n} className="rounded-full bg-cream-deep px-3 py-1 text-xs font-medium text-ink-soft">
                      {n}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 rounded-2xl border border-green-ink/10 bg-cream p-6">
                <h3 className="font-display text-xl font-bold text-ink">{loc.foodConcept}</h3>
                <p className="mt-2 text-sm text-ink-soft">
                  Order Di Bella&apos;s for pickup at this location from our full menu.
                </p>
                <Link
                  href={`/menu?location=${loc.slug}`}
                  className="focus-ring mt-4 inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 text-sm font-bold uppercase tracking-wide text-cream shadow-soft transition-transform hover:scale-[1.02]"
                >
                  Order for Pickup <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-green-ink/10 bg-paper p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold text-ink">Contact &amp; Hours</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-deep" />
                  <span className="text-ink-soft">{loc.address}<br />{loc.city}, {loc.state} {loc.zip}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 flex-shrink-0 text-green-deep" />
                  <span className="text-ink-soft">{loc.hours}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 flex-shrink-0 text-green-deep" />
                  <a href={formatPhoneHref(loc.phone)} className="font-medium text-ink hover:text-green-deep">
                    {loc.phone} <span className="text-ink-soft/60">(cashier)</span>
                  </a>
                </li>
                {loc.kitchenPhone && (
                  <li className="flex items-center gap-3 pl-7">
                    <a href={formatPhoneHref(loc.kitchenPhone)} className="font-medium text-ink hover:text-green-deep">
                      {loc.kitchenPhone} <span className="text-ink-soft/60">(kitchen)</span>
                    </a>
                  </li>
                )}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <OrderFromStationButton
                  slug={loc.slug}
                  className="focus-ring flex items-center justify-center gap-2 rounded-full bg-green px-5 py-3 text-sm font-bold uppercase tracking-wide text-cream shadow-soft transition-transform hover:scale-[1.02] active:scale-95"
                />
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring flex items-center justify-center gap-2 rounded-full border-2 border-green px-5 py-3 text-sm font-bold uppercase tracking-wide text-green-deep transition-colors hover:bg-green hover:text-cream active:scale-95"
                >
                  <Navigation className="h-4 w-4" /> Get Directions
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
