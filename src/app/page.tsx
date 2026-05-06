import HeroSection from "@/components/sections/HeroSection";
import { QuickFactsBand } from "@/components/sections/QuickFactsBand";
import { InvitationNote } from "@/components/sections/InvitationNote";
import ScheduleSection from "@/components/sections/ScheduleSection";
import { VenueSection } from "@/components/sections/VenueSection";
import { GalleryTeaserSection } from "@/components/sections/GalleryTeaserSection";
import { TravelSection } from "@/components/sections/TravelSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { RsvpBand } from "@/components/sections/RsvpBand";
import { VENUE } from "@/lib/constants/event-data";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-rose-950">
      <HeroSection />
      <QuickFactsBand />

      <main className="mx-auto w-full max-w-6xl space-y-16 px-4 py-16 sm:space-y-20 sm:px-6 sm:py-20 lg:space-y-24 lg:px-8 lg:py-24">
        <InvitationNote />
        <ScheduleSection />
        <VenueSection
          venueName={VENUE.venueName}
          addressLines={VENUE.addressLines}
          mapUrl={VENUE.mapUrl}
          note={VENUE.note}
        />
        <GalleryTeaserSection />

        <div className="grid gap-12 lg:grid-cols-2">
          <TravelSection />
          <FaqSection />
        </div>
      </main>

      <RsvpBand />
    </div>
  );
}
