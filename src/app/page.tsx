import HeroSection from "@/components/HeroSection";
import YogaPracticesSection from "@/components/YogaPracticesSection";
import WeeklyScheduleSection from "@/components/WeeklyScheduleSection";
import ConceptSection from "@/components/ConceptSection";
import SpaceSection from "@/components/SpaceSection";
import YogaTypesSection from "@/components/YogaTypesSection";
import FoodSection from "@/components/FoodSection";
import EventsSection from "@/components/EventsSection";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import BookingSection from "@/components/BookingSection";
import FooterSection from "@/components/FooterSection";
import YogaSystemSection from "@/components/YogaSystemSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <HeroSection />
      {/* YOGA PRACTICES */}
      <YogaPracticesSection />
      <WeeklyScheduleSection />
      {/* ABOUT / PLACE */}
      <ConceptSection />
      <SpaceSection />
      {/* YOGA SYSTEM & TYPES */}
      <YogaSystemSection />
      <YogaTypesSection />
      {/* WHO IT'S FOR */}
      {/* <AudienceSection /> */}
      {/* FOOD */}
      <FoodSection />
      {/* EVENTS */}
      <EventsSection />
      {/* LEAD MAGNET */}
      <LeadMagnetSection />
      {/* FINAL CTA */}
      <BookingSection />
      <FooterSection />
    </div>
  );
}
