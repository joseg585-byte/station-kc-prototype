// Menu data for the station's three food/drink concepts. Item names and
// prices are representative (the real Di Bella's PDF menus are not
// machine-readable) but every category, brand name, and concept blurb is
// sourced straight from thestationkc.com.

export type MenuCategory = "donuts" | "grill" | "pizza" | "liquor";

export type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: number; // dollars
  image?: string;
  tags?: string[];
  sellableOnline: boolean; // liquor items are browse-only for Phase 1
};

export const menuItems: MenuItem[] = [
  // ---------------------------------------------------------------- donuts
  {
    id: "donut-glazed",
    category: "donuts",
    name: "Classic Glazed Donut",
    description: "Fried fresh every morning, dipped in our light vanilla glaze.",
    price: 1.49,
    image: "/images/menu/donut-glazed.jpg",
    tags: ["bestseller"],
    sellableOnline: true,
  },
  {
    id: "donut-sprinkle",
    category: "donuts",
    name: "Rainbow Sprinkle Donut",
    description: "Soft yeast donut, hand-iced and finished with a rainbow of sprinkles.",
    price: 1.79,
    image: "/images/menu/donut-sprinkles.jpg",
    sellableOnline: true,
  },
  {
    id: "donut-chocolate",
    category: "donuts",
    name: "Chocolate Frosted Donut",
    description: "Rich chocolate frosting over our signature raised dough.",
    price: 1.79,
    image: "/images/menu/donuts-assorted.jpg",
    sellableOnline: true,
  },
  {
    id: "donut-dozen",
    category: "donuts",
    name: "Mixed Dozen",
    description: "A dozen assorted donuts, fresh from the case — a Di Bella's classic.",
    price: 14.99,
    image: "/images/menu/donuts-assorted.jpg",
    tags: ["bestseller"],
    sellableOnline: true,
  },
  {
    id: "coffee-regular",
    category: "donuts",
    name: "Fresh Brewed Coffee",
    description: "Hot, always fresh, brewed all day long.",
    price: 2.29,
    image: "/images/menu/coffee-cup.jpg",
    sellableOnline: true,
  },
  {
    id: "coffee-iced",
    category: "donuts",
    name: "Iced Coffee",
    description: "Cold-poured over ice, sweetened your way.",
    price: 2.79,
    image: "/images/menu/coffee-cup.jpg",
    sellableOnline: true,
  },
  {
    id: "kolache",
    category: "donuts",
    name: "Sausage & Cheese Kolache",
    description: "Soft-baked pastry wrapped around savory sausage and melted cheese.",
    price: 3.49,
    sellableOnline: true,
  },
  {
    id: "muffin",
    category: "donuts",
    name: "Blueberry Muffin",
    description: "Bakery-fresh, loaded with blueberries.",
    price: 2.49,
    sellableOnline: true,
  },

  // ----------------------------------------------------------------- grill
  {
    id: "philly-cheesesteak",
    category: "grill",
    name: "Philly Cheesesteak",
    description: "Shaved steak, grilled onions & peppers, melted cheese on a hoagie roll.",
    price: 8.99,
    image: "/images/menu/philly-cheesesteak.jpg",
    tags: ["bestseller"],
    sellableOnline: true,
  },
  {
    id: "cheeseburger",
    category: "grill",
    name: "Station Cheeseburger",
    description: "Fresh off the grill, hand-formed patty with American cheese.",
    price: 7.49,
    image: "/images/menu/cheeseburger.jpg",
    tags: ["bestseller"],
    sellableOnline: true,
  },
  {
    id: "double-cheeseburger",
    category: "grill",
    name: "Double Cheeseburger",
    description: "Two patties, double cheese, grilled to order.",
    price: 9.49,
    image: "/images/menu/cheeseburger.jpg",
    sellableOnline: true,
  },
  {
    id: "chicken-tenders",
    category: "grill",
    name: "Hand-Breaded Chicken Tenders",
    description: "Breaded in-house and fried golden, served with your choice of sauce.",
    price: 7.99,
    sellableOnline: true,
  },
  {
    id: "chicken-sandwich",
    category: "grill",
    name: "Crispy Chicken Sandwich",
    description: "Hand-breaded chicken breast, pickles, brioche bun.",
    price: 7.99,
    sellableOnline: true,
  },
  {
    id: "hot-dog",
    category: "grill",
    name: "All-Beef Hot Dog",
    description: "Grilled all-beef dog, classic fixings available.",
    price: 3.99,
    sellableOnline: true,
  },
  {
    id: "wings",
    category: "grill",
    name: "Grill Wings (8pc)",
    description: "Tossed in your choice of house sauce.",
    price: 9.99,
    sellableOnline: true,
  },
  {
    id: "fries",
    category: "grill",
    name: "Seasoned Fries",
    description: "Crispy-cut fries, seasoned hot off the fryer.",
    price: 3.49,
    sellableOnline: true,
  },

  // ----------------------------------------------------------------- pizza
  {
    id: "pizza-cheese-slice",
    category: "pizza",
    name: "Cheese Pizza Slice",
    description: "Hand-tossed dough, house red sauce, mozzarella.",
    price: 3.29,
    image: "/images/menu/pizza-slice.jpg",
    sellableOnline: true,
  },
  {
    id: "pizza-pepperoni-slice",
    category: "pizza",
    name: "Pepperoni Pizza Slice",
    description: "Loaded with pepperoni, baked fresh all day.",
    price: 3.59,
    image: "/images/menu/pizza-pepperoni.jpg",
    tags: ["bestseller"],
    sellableOnline: true,
  },
  {
    id: "pizza-whole-cheese",
    category: "pizza",
    name: "Whole Cheese Pizza (16\")",
    description: "A whole pie of our classic hand-tossed cheese pizza.",
    price: 13.99,
    image: "/images/menu/pizza-slice.jpg",
    sellableOnline: true,
  },
  {
    id: "pizza-whole-pepperoni",
    category: "pizza",
    name: "Whole Pepperoni Pizza (16\")",
    description: "A whole pie loaded edge-to-edge with pepperoni.",
    price: 15.99,
    image: "/images/menu/pizza-pepperoni.jpg",
    sellableOnline: true,
  },
  {
    id: "pizza-supreme",
    category: "pizza",
    name: "Supreme Slice",
    description: "Pepperoni, sausage, peppers, onions, mushrooms.",
    price: 3.99,
    sellableOnline: true,
  },
  {
    id: "breadsticks",
    category: "pizza",
    name: "Cheesy Breadsticks",
    description: "Baked golden, topped with mozzarella and garlic butter.",
    price: 5.49,
    sellableOnline: true,
  },

  // ---------------------------------------------------------------- liquor
  // Cutter & Cork — browse-only for Phase 1 (no online liquor sale).
  {
    id: "liquor-ipa-6pk",
    category: "liquor",
    name: "Local Craft IPA — 6 Pack",
    description: "Rotating KC-brewed IPA, kept ice cold in our beer cooler.",
    price: 11.99,
    image: "/images/menu/beer-cooler.jpg",
    sellableOnline: false,
  },
  {
    id: "liquor-lager-12pk",
    category: "liquor",
    name: "Domestic Lager — 12 Pack",
    description: "The everyday favorite, always stocked and always cold.",
    price: 14.99,
    image: "/images/menu/beer-cooler.jpg",
    sellableOnline: false,
  },
  {
    id: "liquor-red-blend",
    category: "liquor",
    name: "Red Blend — 750ml",
    description: "A smooth, food-friendly red from our wine wall.",
    price: 12.99,
    image: "/images/menu/liquor-bottles.jpg",
    sellableOnline: false,
  },
  {
    id: "liquor-chardonnay",
    category: "liquor",
    name: "Chardonnay — 750ml",
    description: "Crisp and lightly oaked, chilled and ready to go.",
    price: 11.99,
    image: "/images/menu/liquor-bottles.jpg",
    sellableOnline: false,
  },
  {
    id: "liquor-vodka",
    category: "liquor",
    name: "Premium Vodka — 750ml",
    description: "Top-shelf vodka from Cutter & Cork's spirits aisle.",
    price: 19.99,
    image: "/images/menu/liquor-shelf.jpg",
    sellableOnline: false,
  },
  {
    id: "liquor-tequila",
    category: "liquor",
    name: "Blanco Tequila — 750ml",
    description: "Smooth blanco, perfect for margaritas or sipping.",
    price: 24.99,
    image: "/images/menu/liquor-shelf.jpg",
    sellableOnline: false,
  },
  {
    id: "liquor-whiskey",
    category: "liquor",
    name: "Bourbon Whiskey — 750ml",
    description: "A KC bar-cart staple, straight from our whiskey row.",
    price: 27.99,
    image: "/images/menu/liquor-shelf.jpg",
    sellableOnline: false,
  },
  {
    id: "liquor-seltzer",
    category: "liquor",
    name: "Hard Seltzer Variety — 12 Pack",
    description: "Assorted flavors, low-cal, ice cold.",
    price: 15.99,
    image: "/images/menu/beer-cooler.jpg",
    sellableOnline: false,
  },
];

export const categoryMeta: Record<
  MenuCategory,
  { label: string; blurb: string; brand?: string }
> = {
  donuts: {
    label: "Di Bella's Donuts & More",
    blurb: "Fresh-fried donuts, coffee, and grab-and-go bakery.",
  },
  grill: {
    label: "Di Bella's Grill",
    blurb: "Burgers, cheesesteaks, tenders, and more — hot off the grill.",
  },
  pizza: {
    label: "Di Bella's Pizza",
    blurb: "Hand-tossed pizza by the slice or the whole pie.",
  },
  liquor: {
    label: "Cutter & Cork Liquor",
    blurb: "The Station's liquor store — beer, wine & spirits. Browse in-app, purchase in-store (21+).",
  },
};

export function getMenuItem(id: string) {
  return menuItems.find((i) => i.id === id);
}
