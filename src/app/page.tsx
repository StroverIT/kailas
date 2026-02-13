import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ConceptSection from "@/components/ConceptSection";
import SpaceSection from "@/components/SpaceSection";
import YogaSystemSection from "@/components/YogaSystemSection";
import YogaTypesSection from "@/components/YogaTypesSection";
import AudienceSection from "@/components/AudienceSection";
import EventsSection from "@/components/EventsSection";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import BookingSection from "@/components/BookingSection";
import FooterSection from "@/components/FooterSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ConceptSection />
      <SpaceSection />
      <YogaSystemSection />
      <YogaTypesSection />
      <AudienceSection />
      <EventsSection />
      <LeadMagnetSection />
      <BookingSection />
      <FooterSection />
    </div>
  );
}
