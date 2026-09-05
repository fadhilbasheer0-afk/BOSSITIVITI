import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import Collection from "@/components/Collection";
import BrandValues from "@/components/BrandValues";
import Philosophy from "@/components/Philosophy";
import FinalCTA from "@/components/FinalCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BrandStory />
      <Collection />
      <BrandValues />
      <Philosophy />
      <FinalCTA />
      <Contact />
      <Footer />
    </main>
  );
}
