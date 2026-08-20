import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import LocationsPreview from "@/components/LocationsPreview";
import GiftCardPromo from "@/components/GiftCardPromo";
import Footer from "@/components/Footer";
import SweepstakesBanner from "@/components/SweepstakesBanner";
import ProductShowcase from "@/components/ProductShowcase";
import HumanTouchpoints from "@/components/HumanTouchpoints";

export default function Home() {
  return (
    <>
      <Header />
      <SweepstakesBanner />
      <main>
        <Hero />
        <ProductShowcase />
        <HumanTouchpoints />
        <FeatureGrid />
        <LocationsPreview />
        <GiftCardPromo />
      </main>
      <Footer />
    </>
  );
}
