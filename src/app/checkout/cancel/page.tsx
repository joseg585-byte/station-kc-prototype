import Link from "next/link";
import { XCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CheckoutCancelPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <XCircle className="mx-auto h-14 w-14 text-ink-soft/40" />
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">Checkout canceled</h1>
        <p className="mt-2 text-ink-soft">No charge was made. Your cart is still saved.</p>
        <Link href="/menu" className="mt-6 inline-block rounded-full bg-green px-6 py-3 text-sm font-bold uppercase tracking-wide text-cream">
          Back to Menu
        </Link>
      </main>
      <Footer />
    </>
  );
}
