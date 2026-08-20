import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import LocationsPreview from "@/components/LocationsPreview";
import GiftCardPromo from "@/components/GiftCardPromo";
import Footer from "@/components/Footer";
import SweepstakesBanner from "@/components/SweepstakesBanner";
import ProductShowcase from "@/components/ProductShowcase";

export default function Home() {
  return (
    <>
      <Header />
      <SweepstakesBanner />
      <main>
        <Hero />
        <ProductShowcase />
        <FeatureGrid />
        <LocationsPreview />
        <GiftCardPromo />
      </main>
      <Footer />
    </>
  );
}
