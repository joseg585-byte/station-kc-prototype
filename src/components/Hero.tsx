"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-green-ink">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-70 photo-treat"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/locations/exterior-pumps.jpg"
      >
        <source src="/images/hero/station-hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-green-ink via-green-ink/60 to-green-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-ink/70 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <p className="float-up overline text-amber">Welcome to the station</p>
        <h1
          className="float-up mt-4 max-w-3xl font-display text-5xl font-black leading-[0.98] tracking-tight text-cream sm:text-6xl md:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          Your Favorite<br />One Stop Shop
        </h1>
        <p
          className="float-up mt-6 max-w-lg text-lg text-cream/85 sm:text-xl"
          style={{ animationDelay: "160ms" }}
        >
          KC&apos;s local convenience—fuel, food, drinks, and more. Four
          locations across Kansas City, open early to late, every day.
        </p>

        <div
          className="float-up mt-10 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            href="/menu"
            className="focus-ring group inline-flex items-center justify-center gap-2 rounded-full bg-amber px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-ink shadow-lift transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Order Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/locations"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border-2 border-cream/40 bg-cream/5 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-cream backdrop-blur-sm transition-colors hover:bg-cream/15"
          >
            <MapPin className="h-4 w-4" />
            Find a Location
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 stripe-bar h-2" />
    </section>
  );
}
