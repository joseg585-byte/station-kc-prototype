// Small grayed-out "we accept" row for the empty cart — a subconscious
// signal that checkout is a real, working transactional engine. Simplified
// inline glyphs (not pixel-exact trademarks), muted to sit quietly in an
// empty state.
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-7 items-center rounded-md border border-ink/10 bg-paper px-2.5 text-ink-soft/50 grayscale">
      {children}
    </span>
  );
}

export default function PaymentLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2" aria-label="Accepted payment methods">
      <Chip>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
          <path d="M16.5 6.7c-.9 1-2.3 1.8-3.6 1.7-.2-1.3.4-2.7 1.2-3.5.9-1 2.4-1.8 3.6-1.9.1 1.4-.4 2.7-1.2 3.7Zm1.2 1.9c-2-.1-3.7 1.1-4.6 1.1-1 0-2.4-1.1-4-1.1-2 0-3.9 1.2-4.9 3-2.1 3.6-.5 9 1.5 12 1 1.4 2.1 3 3.6 3 1.4-.1 2-1 3.7-1s2.2.9 3.7.9 2.5-1.4 3.5-2.8c1-1.5 1.4-3 1.4-3.1-.1 0-2.7-1-2.7-4 0-2.5 2.1-3.7 2.2-3.8-1.2-1.8-3.1-2-3.6-2.2Z" />
        </svg>
        <span className="ml-1.5 text-[11px] font-semibold">Pay</span>
      </Chip>
      <Chip>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
          <path fill="currentColor" d="M21.6 12.23c0-.68-.06-1.36-.18-2H12v3.79h5.4a4.6 4.6 0 0 1-2 3.02v2.5h3.2c1.9-1.75 2.99-4.32 2.99-7.31Z" />
          <path fill="currentColor" d="M12 22c2.7 0 4.96-.89 6.62-2.42l-3.2-2.5c-.9.6-2.05.95-3.42.95-2.63 0-4.86-1.77-5.66-4.16H3.03v2.6A10 10 0 0 0 12 22Z" opacity=".7" />
        </svg>
        <span className="ml-1.5 text-[11px] font-semibold">G Pay</span>
      </Chip>
      <Chip>
        <span className="text-xs font-black italic tracking-tight">VISA</span>
      </Chip>
      <Chip>
        <svg viewBox="0 0 24 14" className="h-3.5 w-6" aria-hidden="true">
          <circle cx="8" cy="7" r="7" fill="currentColor" opacity=".55" />
          <circle cx="16" cy="7" r="7" fill="currentColor" opacity=".3" />
        </svg>
      </Chip>
      <Chip>
        <span className="text-xs font-bold tracking-tight">stripe</span>
      </Chip>
    </div>
  );
}
