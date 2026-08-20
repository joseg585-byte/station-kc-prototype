import { FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Shared shell for the trust-boilerplate pages (Privacy, Terms,
// Accessibility, Help) — prototype-stage pages that just state what they'd
// contain rather than shipping real legal/support copy.
export default function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <FileText className="mx-auto h-10 w-10 text-ink-soft/30" />
        <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-ink">{title}</h1>
        <p className="mt-4 text-ink-soft">
          <span className="font-semibold text-green-deep">Coming soon</span> — this would contain{" "}
          {description}.
        </p>
      </main>
      <Footer />
    </>
  );
}
