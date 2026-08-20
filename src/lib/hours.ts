// Tiny "is this store open right now" helper. Parses strings shaped like
// "5:00 AM – 11:00 PM · Daily" from src/data/locations.ts. Prototype-only —
// assumes the same hours every day (all 4 locations are listed as Daily).

function parseTimeToMinutes(raw: string): number | null {
  const m = raw.trim().match(/(\d{1,2}):(\d{2})\s*([AP]M)/i);
  if (!m) return null;
  let hour = parseInt(m[1], 10) % 12;
  const minute = parseInt(m[2], 10);
  if (m[3].toUpperCase() === "PM") hour += 12;
  return hour * 60 + minute;
}

export function parseHoursRange(hoursStr: string): { openMin: number; closeMin: number } | null {
  const m = hoursStr.match(/(\d{1,2}:\d{2}\s*[AP]M)\s*[–-]\s*(\d{1,2}:\d{2}\s*[AP]M)/i);
  if (!m) return null;
  const openMin = parseTimeToMinutes(m[1]);
  const closeMin = parseTimeToMinutes(m[2]);
  if (openMin == null || closeMin == null) return null;
  return { openMin, closeMin };
}

export function isOpenNow(hoursStr: string, now: Date = new Date()): boolean {
  const range = parseHoursRange(hoursStr);
  if (!range) return true;
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const { openMin, closeMin } = range;
  if (closeMin > openMin) return nowMin >= openMin && nowMin < closeMin;
  // Overnight wrap (close time is past midnight relative to open).
  return nowMin >= openMin || nowMin < closeMin;
}

export function closeTimeLabel(hoursStr: string): string {
  const m = hoursStr.match(/[–-]\s*(\d{1,2}:\d{2}\s*[AP]M)/i);
  return m ? m[1].replace(/\s+/, " ") : "";
}
