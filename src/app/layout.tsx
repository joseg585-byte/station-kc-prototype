import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import GlobalProviders from "@/components/GlobalProviders";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

// Bold, condensed display font for headlines — highway-signage energy.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

// Quiet, modern sans for body & UI.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "the station — Your Favorite One Stop Shop",
  description:
    "KC's local convenience—fuel, food, drinks, and more. Order Di Bella's donuts, grill & pizza for pickup, buy gift cards, and find all 4 Kansas City the station locations.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "the station",
  },
  openGraph: {
    title: "the station — Your Favorite One Stop Shop",
    description: "KC's local convenience—fuel, food, drinks, and more.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#057034",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper text-ink">
        {children}
        <GlobalProviders />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
