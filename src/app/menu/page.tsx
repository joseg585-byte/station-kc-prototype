import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuExplorer from "@/components/MenuExplorer";
import MenuSkeleton from "@/components/skeletons/MenuSkeleton";

export const metadata: Metadata = {
  title: "Menu — the station",
  description:
    "Order Di Bella's Donuts & More, Di Bella's Grill & Pizza for pickup, and browse Cutter & Cork liquor at the station.",
};

export default function MenuPage() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-green-ink/10 bg-cream py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="overline text-green-deep">Order for pickup</p>
            <h1 className="mt-3 font-display-impact text-5xl tracking-tight text-ink sm:text-6xl">
              The Menu
            </h1>
            <p className="mt-3 max-w-xl text-ink-soft">
              Donuts, grill &amp; pizza from Di Bella&apos;s, plus a browse-only
              look at Cutter &amp; Cork liquor. Pick a location, add to your
              order, and pick it up fresh.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Suspense fallback={<MenuSkeleton />}>
            <MenuExplorer />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
