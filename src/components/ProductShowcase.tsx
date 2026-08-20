import Image from "next/image";

// Horizontally-scrollable product imagery row. Uses the site's existing,
// already-vetted local photo set (see README — an earlier pass caught bad
// stock picks like rival-brand pumps and wrong cuisines) rather than
// pulling fresh, unverified images for this pass.
const SHOTS = [
  { src: "/images/menu/donuts-assorted.jpg", alt: "Assorted fresh donuts" },
  { src: "/images/menu/coffee-cup.jpg", alt: "Hot coffee to go" },
  { src: "/images/menu/philly-cheesesteak.jpg", alt: "Philly cheesesteak off the flat-top" },
  { src: "/images/menu/pizza-slice.jpg", alt: "Hand-tossed pizza slice" },
  { src: "/images/menu/cheeseburger.jpg", alt: "Grilled cheeseburger" },
  { src: "/images/menu/beer-cooler.jpg", alt: "Cold beer cooler" },
  { src: "/images/menu/liquor-bottles.jpg", alt: "Liquor bottles on the shelf" },
  { src: "/images/locations/exterior-pumps.jpg", alt: "Fuel pumps under the canopy" },
];

export default function ProductShowcase() {
  return (
    <section className="bg-paper py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="overline text-green-deep">A taste of the station</p>
        <h2 className="mt-3 font-display-impact text-3xl tracking-tight text-ink sm:text-4xl">
          Fresh food, cold drinks, hot fuel
        </h2>
      </div>
      <div className="scroll-elegant mt-8 flex gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8">
        {SHOTS.map((shot) => (
          <div
            key={shot.src}
            className="relative h-48 w-40 flex-shrink-0 overflow-hidden rounded-2xl shadow-soft transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-95 sm:h-56 sm:w-48"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="192px"
              className="object-cover photo-treat"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
