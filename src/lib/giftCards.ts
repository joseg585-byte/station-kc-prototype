// Lightweight local gift-card store for the prototype. When Supabase is
// configured, the real backend (see supabase-schema.sql) should be the
// source of truth; this local fallback keeps the demo fully functional
// offline (mirrors the menuStore/orders pattern from the Anthony's build).

import type { GiftCard } from "./types";

const STORAGE_KEY = "thestation-giftcards";

function readAll(): GiftCard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GiftCard[]) : [];
  } catch {
    return [];
  }
}

function writeAll(cards: GiftCard[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function generateGiftCardCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "STN-";
  for (let group = 0; group < 3; group++) {
    for (let i = 0; i < 4; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    if (group < 2) code += "-";
  }
  return code;
}

export function saveGiftCard(card: GiftCard) {
  const cards = readAll();
  cards.push(card);
  writeAll(cards);
}

export function findGiftCard(code: string): GiftCard | undefined {
  return readAll().find((c) => c.code.toUpperCase() === code.toUpperCase());
}

export function listGiftCardsFor(email: string): GiftCard[] {
  return readAll().filter(
    (c) =>
      c.purchaserEmail.toLowerCase() === email.toLowerCase() ||
      c.recipientEmail.toLowerCase() === email.toLowerCase()
  );
}

export function redeemFromGiftCard(code: string, amount: number): boolean {
  const cards = readAll();
  const card = cards.find((c) => c.code.toUpperCase() === code.toUpperCase());
  if (!card || card.balance < amount) return false;
  card.balance = Math.round((card.balance - amount) * 100) / 100;
  writeAll(cards);
  return true;
}
