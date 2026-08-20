// Shimmer placeholder shown while the menu's Suspense boundary resolves.
// Mirrors MenuExplorer's real geometry (location/search row, category tabs,
// 2-col card grid) so the swap-in doesn't jump. The visible label is a
// screen-reader-only fallback — the shimmer itself carries the loading cue
// visually, brand-flavored copy carries it for assistive tech.
export default function MenuSkeleton() {
  return (
    <div aria-hidden={false} role="status">
      <span className="sr-only">Firing up the grill…</span>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" aria-hidden="true">
        <div className="skeleton h-[3.25rem] w-full sm:w-64" />
        <div className="skeleton h-11 w-full sm:w-72 !rounded-full" />
      </div>

      <div className="mt-6 flex gap-2 border-b border-green-ink/10 pb-px" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-9 w-24 !rounded-full" />
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 rounded-2xl border border-green-ink/10 bg-paper p-4 shadow-soft">
            <div className="skeleton h-24 w-24 flex-shrink-0" />
            <div className="flex flex-1 flex-col gap-2 py-1">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-2/3" />
              <div className="mt-auto skeleton h-8 w-28 !rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
