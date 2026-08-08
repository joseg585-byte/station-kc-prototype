// Real location data scraped from thestationkc.com location pages (Aug 2026).
// Fuel prices are illustrative/mocked for the prototype (Phase 1 scope).

export type FuelPrice = {
  grade: string;
  price: number;
};

export type Location = {
  slug: string;
  number: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  kitchenPhone?: string;
  hours: string;
  since: string;
  blurb: string;
  foodConcept: string;
  foodMenuUrl: string;
  fuelNotes: string[];
  fuelPrices: FuelPrice[];
  photo: string;
  lat: number;
  lng: number;
};

export const locations: Location[] = [
  {
    slug: "brink-meyer",
    number: 1,
    name: "The Station #1 — Brink Meyer",
    address: "15399 NW Brink Meyer Rd",
    city: "Parkville",
    state: "MO",
    zip: "64152",
    phone: "(816) 891-9992",
    kitchenPhone: "(816) 891-9993",
    hours: "5:00 AM – 11:00 PM · Daily",
    since: "Open since June 2010",
    blurb:
      "Located in Creekside Parkville, near the intersection of Highway 45 and Interstate 435.",
    foodConcept: "Di Bella's Pizza & More",
    foodMenuUrl: "https://dibellasfood.com/15399-brink-myer-rd",
    fuelNotes: ["Unleaded, Plus, Premium, Diesel", "No Ethanol Premium"],
    fuelPrices: [
      { grade: "Unleaded", price: 2.99 },
      { grade: "Plus", price: 3.29 },
      { grade: "Premium", price: 3.59 },
      { grade: "Diesel", price: 3.69 },
    ],
    photo: "/images/locations/exterior-pumps.jpg",
    lat: 39.2136,
    lng: -94.6802,
  },
  {
    slug: "brighton",
    number: 2,
    name: "The Station #2 — Brighton",
    address: "8050 North Brighton Ave",
    city: "Kansas City",
    state: "MO",
    zip: "64119",
    phone: "(816) 468-4444",
    kitchenPhone: "(816) 468-8888",
    hours: "6:00 AM – 11:00 PM · Daily",
    since: "Open since December 2015",
    blurb: "Right off the Highway 152 exit on Brighton Rd. in Kansas City, Missouri.",
    foodConcept: "Di Bella's Grill & Pizza",
    foodMenuUrl: "https://dibellasfood.com/8050-n-brighton-ave",
    fuelNotes: ["Unleaded, Plus, Premium, Diesel", "Also carries E85"],
    fuelPrices: [
      { grade: "Unleaded", price: 2.97 },
      { grade: "Plus", price: 3.27 },
      { grade: "Premium", price: 3.57 },
      { grade: "Diesel", price: 3.67 },
      { grade: "E85", price: 2.59 },
    ],
    photo: "/images/locations/store-aisle.jpg",
    lat: 39.1943,
    lng: -94.5372,
  },
  {
    slug: "stark",
    number: 3,
    name: "The Station #3 — Stark",
    address: "10840 N Stark Ave",
    city: "Kansas City",
    state: "MO",
    zip: "64157",
    phone: "(816) 890-5650",
    kitchenPhone: "(816) 890-5660",
    hours: "5:00 AM – 11:00 PM · Daily",
    since: "Open since January 2023 — our newest store",
    blurb: "At the corner of Route 291 and N Stark Ave. in Kansas City, Missouri.",
    foodConcept: "Di Bella's Grill & Pizza",
    foodMenuUrl: "https://dibellasfood.com/10840-n-stark-ave",
    fuelNotes: ["Unleaded, Plus, Premium, Diesel", "No Ethanol Premium"],
    fuelPrices: [
      { grade: "Unleaded", price: 2.98 },
      { grade: "Plus", price: 3.28 },
      { grade: "Premium", price: 3.58 },
      { grade: "Diesel", price: 3.68 },
    ],
    photo: "/images/locations/exterior-pumps.jpg",
    lat: 39.2478,
    lng: -94.4523,
  },
  {
    slug: "homer",
    number: 4,
    name: "The Station #4 — Homer",
    address: "7201 Homer Pkwy",
    city: "Parkville",
    state: "MO",
    zip: "64152",
    phone: "(816) 505-5511",
    kitchenPhone: "(816) 505-5522",
    hours: "5:30 AM – 10:00 PM · Daily",
    since: "Opened May 2021",
    blurb:
      "Creekside Parkville, at the intersection of Interstate 435 and Highway 45.",
    foodConcept: "Di Bella's Grill & More",
    foodMenuUrl: "https://dibellasfood.com/7201-homer-parkway",
    fuelNotes: ["Unleaded, Plus, Premium, Diesel", "Also carries Off-Road Diesel"],
    fuelPrices: [
      { grade: "Unleaded", price: 2.96 },
      { grade: "Plus", price: 3.26 },
      { grade: "Premium", price: 3.56 },
      { grade: "Diesel", price: 3.66 },
    ],
    photo: "/images/locations/store-aisle.jpg",
    lat: 39.2138,
    lng: -94.6544,
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}
