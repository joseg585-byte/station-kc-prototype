"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { menuItems, categoryMeta, type MenuCategory } from "@/data/menu";
import { locations } from "@/data/locations";
import MenuItemCard from "./MenuItemCard";

const CATEGORIES: MenuCategory[] = ["donuts", "grill", "pizza", "liquor"];

export default function MenuExplorer() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as MenuCategory) || "donuts";
  const initialLocation = searchParams.get("location") || locations[0].slug;

  const [category, setCategory] = useState<MenuCategory>(
    CATEGORIES.includes(initialCategory) ? initialCategory : "donuts"
  );
  const [locationSlug, setLocationSlug] = useState(initialLocation);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      if (item.category !== category) return false;
      if (!query.trim()) return true;
      const q = query.trim().toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    });
  }, [category, query]);

  return (
    <div>
      {/* Pickup location + search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <label className="overline mb-1.5 block text-ink-soft/60">Pickup Location</label>
          <select
            value={locationSlug}
            onChange={(e) => setLocationSlug(e.target.value)}
            className="focus-ring w-full rounded-lg border border-green-ink/15 bg-paper px-4 py-2.5 text-sm font-medium text-ink sm:w-64"
          >
            {locations.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative sm:w-72">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the menu..."
            className="focus-ring w-full rounded-full border border-green-ink/15 bg-paper py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-soft/40"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="scroll-elegant mt-6 flex gap-2 overflow-x-auto border-b border-green-ink/10 pb-px">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`focus-ring flex-shrink-0 border-b-2 px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
              category === cat
                ? "border-green text-green-deep"
                : "border-transparent text-ink-soft/60 hover:text-ink"
            }`}
          >
            {categoryMeta[cat].label}
          </button>
        ))}
      </div>

      <div className="mt-2 py-4">
        <p className="text-sm text-ink-soft/70">{categoryMeta[category].blurb}</p>
      </div>

      {/* Items */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-ink-soft">No items match &ldquo;{query}&rdquo;.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} locationSlug={locationSlug} />
          ))}
        </div>
      )}
    </div>
  );
}
