"use client";

import Image from "next/image";
import { Plus, Check, Wine } from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "@/data/menu";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/lib/store";

export default function MenuItemCard({
  item,
  locationSlug,
}: {
  item: MenuItem;
  locationSlug: string;
}) {
  const addItem = useCart((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem(item.id, locationSlug);
    navigator.vibrate?.(50);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group flex gap-4 rounded-2xl border border-green-ink/10 bg-paper p-4 shadow-soft transition-shadow hover:shadow-lift">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-cream-deep">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="96px"
            className="object-cover photo-treat transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-green-deep/30">
            <Wine className="h-8 w-8" />
          </div>
        )}
        {item.tags?.includes("bestseller") && (
          <span className="absolute left-1.5 top-1.5 rounded-full bg-amber px-2 py-0.5 text-[10px] font-bold uppercase text-ink">
            Popular
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-bold leading-snug text-ink">{item.name}</h3>
          <span className="flex-shrink-0 font-bold text-green-deep">{formatCurrency(item.price)}</span>
        </div>
        <p className="mt-1 text-sm text-ink-soft/80">{item.description}</p>

        <div className="mt-auto pt-3">
          {item.sellableOnline ? (
            <button
              onClick={handleAdd}
              className={`focus-ring inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all active:scale-95 ${
                justAdded ? "bg-green text-cream" : "bg-cream-deep text-ink hover:bg-green hover:text-cream"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Added
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" /> Add to Order
                </>
              )}
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-deep px-4 py-2 text-xs font-semibold text-ink-soft">
              In-store purchase only · 21+
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
