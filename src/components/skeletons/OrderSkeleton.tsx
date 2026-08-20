// Shimmer placeholder for the checkout-success / gift-card-success Suspense
// boundaries — mirrors the real confirmation card's geometry (icon, title,
// line items, total) so the swap-in doesn't jump.
export default function OrderSkeleton({ label }: { label: string }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6" role="status">
      <span className="sr-only">{label}</span>
      <div className="flex flex-col items-center" aria-hidden="true">
        <div className="skeleton h-14 w-14 !rounded-full" />
        <div className="skeleton mt-4 h-8 w-64" />
        <div className="skeleton mt-3 h-4 w-72" />
      </div>
      <div className="mt-8 space-y-4 rounded-2xl border border-green-ink/10 bg-paper p-6 shadow-soft" aria-hidden="true">
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-4 w-2/3" />
        <div className="space-y-2 border-t border-green-ink/10 pt-4">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
        </div>
        <div className="skeleton h-5 w-1/3" />
      </div>
    </div>
  );
}
