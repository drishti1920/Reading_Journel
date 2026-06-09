import ScrollExperience from "@/components/ScrollExperience";
import CTA from "@/features/landing/components/CTA";
import Hero from "@/features/landing/components/Hero";
import LibrarySection from "@/components/LibrarySection";
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
      <CTA />
      </main>
    </>
  );
}
