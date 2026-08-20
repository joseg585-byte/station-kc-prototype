import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Accessibility Statement — the station",
  description: "the station's commitment to an accessible website and app.",
};

export default function AccessibilityPage() {
  return (
    <PlaceholderPage
      title="Accessibility Statement"
      description="the station's accessibility commitment, the standards we target, and how to report an issue"
    />
  );
}
