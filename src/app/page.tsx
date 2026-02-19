import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ExperienceSection from "@/components/ExperienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EventsSection from "@/components/EventsSection";
import ConceptSection from "@/components/ConceptSection";
import YogaSystemSection from "@/components/YogaSystemSection";
import YogaTypesSection from "@/components/YogaTypesSection";
import SpaceSection from "@/components/SpaceSection";
import FoodSection from "@/components/FoodSection";
import StatsSection from "@/components/StatsSection";
import FoundationSection from "@/components/FoundationSection";
import BookingSection from "@/components/BookingSection";
import FooterSection from "@/components/FooterSection";
import { EnergyLineDivider } from "@/components/animations/EnergyLineDivider";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 1. HERO – Hook */}
      <HeroSection />
      {/* 2. PROBLEM – This is you */}
      <ProblemSection />
      {/* 3. SOLUTION – How we help */}
      <SolutionSection />
      {/* 4. EXPERIENCE – What happens there */}
      <ExperienceSection />
      {/* 5. SOCIAL PROOF */}
      <TestimonialsSection />
      {/* 6. UPCOMING EVENTS – Calendar */}
      <EventsSection />
      <EnergyLineDivider />
      {/* 7. ABOUT US – Trust builder */}
      <ConceptSection />
      <YogaSystemSection />
      <YogaTypesSection />
      {/* 8. FACILITIES */}
      <SpaceSection />
      <FoodSection />
      <StatsSection />
      <FoundationSection />
      {/* 9. FINAL CTA */}
      <BookingSection />
      <FooterSection />
    </div>
  );
}
