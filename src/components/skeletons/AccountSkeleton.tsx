// Shimmer placeholder shown for the brief window while the persisted auth
// store rehydrates from localStorage, so returning signed-in visitors don't
// see a flash of "Sign in to your account" before their session loads.
export default function AccountSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8" role="status">
      <span className="sr-only">Counting your points…</span>

      <div className="flex flex-wrap items-center justify-between gap-4" aria-hidden="true">
        <div className="space-y-2">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-3 w-40" />
        </div>
        <div className="skeleton h-10 w-32 !rounded-full" />
      </div>

      <div className="mt-10 rounded-2xl border border-green-ink/10 bg-cream p-6" aria-hidden="true">
        <div className="flex items-center justify-between">
          <div className="skeleton h-5 w-40" />
          <div className="skeleton h-7 w-20" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="skeleton h-9 w-full" />
          <div className="skeleton h-9 w-full" />
        </div>
      </div>

      <div className="mt-10" aria-hidden="true">
        <div className="skeleton h-5 w-36" />
        <div className="mt-4 space-y-3">
          {[0, 1].map((i) => (
            <div key={i} className="skeleton h-24 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
