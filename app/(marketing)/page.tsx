import ScrollExperience from "@/components/ScrollExperience";
import CTA from "@/features/landing/components/CTA";
import Hero from "@/features/landing/components/Hero";
import Library from "@/features/landing/components/Library";
import Navbar from "@/features/landing/components/Navbar";
import Quotes from "@/features/landing/components/Quotes";
import ReadingJourney from "@/features/landing/components/ReadingJourney";
import Timeline from "@/features/landing/components/Timeline";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
      <Hero />
      <ScrollExperience />
      <ReadingJourney />
      <Quotes />
      <Timeline />
      <Library />
      <CTA />
      </main>
    </>
  );
}
