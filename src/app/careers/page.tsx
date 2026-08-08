import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Users, ChefHat, ShoppingBag as BagIcon, Clock, ArrowRight, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Careers — the station",
  description:
    "Join the team at the station. Openings for leaders, cooks, and cashiers across our Kansas City-area locations.",
};

const ROLES = [
  {
    icon: Users,
    title: "Team Leaders",
    blurb:
      "Run the shift, mentor the crew, and keep the store running like a well-oiled pump. Prior retail or food-service leadership a plus.",
  },
  {
    icon: ChefHat,
    title: "Cooks & Kitchen Staff",
    blurb:
      "Fry the donuts, fire the grill, stretch the pizza dough. Fast-paced kitchen work behind the Di Bella's counter.",
  },
  {
    icon: BagIcon,
    title: "Cashiers & Store Associates",
    blurb:
      "First face customers see. Ring up fuel, snacks, and Cutter & Cork purchases, and keep the store stocked and welcoming.",
  },
];

const HIRING_AREAS = ["Parkville", "Kansas City", "Liberty"];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative h-[38vh] min-h-[280px] w-full overflow-hidden">
          <Image
            src="/images/brand/storefront-real.jpg"
            alt="the station storefront"
            fill
            priority
            className="object-cover photo-treat"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-ink/90 via-green-ink/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <p className="overline text-amber">Careers</p>
            <h1 className="mt-3 flex items-center gap-3 font-display text-4xl font-black tracking-tight text-cream sm:text-5xl">
              <Users className="h-9 w-9" /> Join Our Team
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Careers at the station
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink-soft">
            Explore local job opportunities at the station! Join a friendly team
            where we value family, service, and fun.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-green-deep">
            <Clock className="h-4 w-4" /> Flexible scheduling for every crew
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {ROLES.map((role) => (
              <div
                key={role.title}
                className="rounded-2xl border border-green-ink/10 bg-paper p-6 shadow-soft"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green/10 text-green-deep">
                  <role.icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{role.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{role.blurb}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-green-ink/10 bg-cream">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-8 rounded-2xl bg-green-ink px-6 py-12 text-center text-cream sm:px-12">
              <div>
                <p className="overline text-amber">Now hiring</p>
                <h2 className="mt-3 font-display text-3xl font-black tracking-tight sm:text-4xl">
                  Join us today!
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-cream/80">
                  We&apos;re hiring leaders, cooks, and cashiers across the metro. Stop
                  by your nearest location and ask about current openings.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {HIRING_AREAS.map((area) => (
                  <span
                    key={area}
                    className="flex items-center gap-1.5 rounded-full bg-cream/10 px-4 py-2 text-sm font-semibold"
                  >
                    <MapPin className="h-3.5 w-3.5 text-amber" /> {area}
                  </span>
                ))}
              </div>
              <Link
                href="/locations"
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-ink shadow-lift transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Find a location near you <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="overline text-ink-soft/60">Our locations</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="rounded-2xl border border-green-ink/10 bg-paper p-5 shadow-soft transition-colors hover:border-green/40"
              >
                <span className="rounded-full bg-green/10 px-2.5 py-1 text-xs font-bold text-green-deep">
                  #{loc.number}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-ink">{loc.city}</h3>
                <p className="mt-1 text-sm text-ink-soft">{loc.address}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
