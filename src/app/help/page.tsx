import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Help & Support — the station",
  description: "Get help with orders, gift cards, and Station Rewards.",
};

export default function HelpPage() {
  return (
    <PlaceholderPage
      title="Help / Support"
      description="an FAQ and contact form for order issues, gift card questions, and Station Rewards support"
    />
  );
}
