import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ConceptSection from "@/components/ConceptSection";
import SpaceSection from "@/components/SpaceSection";
import YogaSystemSection from "@/components/YogaSystemSection";
import YogaTypesSection from "@/components/YogaTypesSection";
import AudienceSection from "@/components/AudienceSection";
import EventsSection from "@/components/EventsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import BookingSection from "@/components/BookingSection";
import StatsSection from "@/components/StatsSection";
import FooterSection from "@/components/FooterSection";
import { EnergyLineDivider } from "@/components/animations/EnergyLineDivider";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ConceptSection />
      <EnergyLineDivider />
      <SpaceSection />
      <YogaSystemSection />
      <YogaTypesSection />
      <AudienceSection />
      <EventsSection />
      <EnergyLineDivider />
      <TestimonialsSection />
      <LeadMagnetSection />
      <StatsSection />
      <BookingSection />
      <FooterSection />
    </div>
  );
}
