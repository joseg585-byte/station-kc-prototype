// the station — brand/tenant record.
// Real business info sourced from thestationkc.com (Aug 2026).

export const brand = {
  name: "the station",
  displayName: "the station",
  tagline: "Your Favorite One Stop Shop",
  subtagline: "KC's local convenience—fuel, food, drinks, and more.",
  city: "Kansas City",
  color: {
    green: "#057034",
    greenDeep: "#044f25",
    cream: "#faf6ec",
  },
  socials: {
    facebook: "https://www.facebook.com/TheStationKC",
    instagram: "https://www.instagram.com/thestationkc",
    tiktok: "https://www.tiktok.com/@the.station.kc",
    x: "https://www.x.com/@TheStationKC",
    handle: "@TheStationKC",
  },
  rewardsUrl: "https://stationrewards.savearound.com/",
  liquorBrand: {
    name: "Cutter & Cork",
    tagline: "The Station's Liquor Store",
    blurb:
      "Rows of gin, rum, tequila, vodka, and whiskey, plus a beer cooler kept right above freezing so every drink is always cold.",
  },
  foodBrand: {
    donuts: "Di Bella's Donuts & More",
    grill: "Di Bella's Grill & Pizza",
    grillUrl: "https://dibellasfood.com/",
  },
} as const;

export type Brand = typeof brand;
