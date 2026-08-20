// Faded inline donut illustration for the empty-cart state — a small nod to
// Di Bella's Donuts without pulling in an external asset. Muted on purpose
// so it reads as an empty-state glyph, not a photo.
export default function EmptyCartIllustration() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-28 w-28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="46" fill="var(--cream-deep)" />
      <circle cx="60" cy="60" r="46" stroke="var(--green-ink)" strokeOpacity="0.08" strokeWidth="2" />
      <circle cx="60" cy="60" r="17" fill="var(--paper)" />
      <circle cx="60" cy="60" r="17" stroke="var(--green-ink)" strokeOpacity="0.08" strokeWidth="2" />
      {/* sprinkles */}
      <g stroke="var(--green)" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round">
        <line x1="40" y1="34" x2="45" y2="39" />
        <line x1="78" y1="32" x2="74" y2="38" />
        <line x1="90" y1="55" x2="84" y2="58" />
        <line x1="88" y1="80" x2="82" y2="76" />
        <line x1="66" y1="94" x2="63" y2="88" />
      </g>
      <g stroke="var(--amber)" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round">
        <line x1="55" y1="30" x2="58" y2="36" />
        <line x1="33" y1="50" x2="39" y2="53" />
        <line x1="32" y1="72" x2="38" y2="70" />
        <line x1="48" y1="93" x2="50" y2="87" />
        <line x1="85" y1="68" x2="79" y2="70" />
      </g>
    </svg>
  );
}
