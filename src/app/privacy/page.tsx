import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Privacy Policy — the station",
  description: "How the station collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      title="Privacy Policy"
      description="the station's full privacy policy — what data we collect, how it's used, and how to control it"
    />
  );
}
