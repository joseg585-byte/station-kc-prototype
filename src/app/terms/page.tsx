import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Terms of Service — the station",
  description: "The terms governing use of the station's website and app.",
};

export default function TermsPage() {
  return (
    <PlaceholderPage
      title="Terms of Service"
      description="the station's terms of service — the rules for using this site, placing pickup orders, and buying gift cards"
    />
  );
}
