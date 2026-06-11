import ScrollExperience from "@/features/landing/components/ScrollExperience";
import Footer from "@/features/landing/components/Footer";
import Hero from "@/features/landing/components/Hero";
import LibrarySection from "@/features/landing/components/LibrarySection";
import Navbar from "@/features/landing/components/Navbar";
import Quotes from "@/features/landing/components/Quotes";
import ReadingJourney from "@/features/landing/components/ReadingJourney";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
      <Hero />
      <ScrollExperience />
      <ReadingJourney />
      <Quotes />
      <LibrarySection />
      </main>
      <Footer />
    </>
  );
}
