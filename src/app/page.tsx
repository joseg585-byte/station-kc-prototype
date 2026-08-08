import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import LocationsPreview from "@/components/LocationsPreview";
import GiftCardPromo from "@/components/GiftCardPromo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureGrid />
        <LocationsPreview />
        <GiftCardPromo />
      </main>
      <Footer />
    </>
  );
}
