import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Bebas_Neue } from "next/font/google";
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

// Extra-heavy, all-caps display face reserved for hero-scale headlines —
// punchier, more "native app" than a body-adjacent font at huge sizes.
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
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
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${bebasNeue.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper text-ink">
        {children}
        <GlobalProviders />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
