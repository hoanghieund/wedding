import HeroSection from "@/components/sections/HeroSection";
import LoveStorySection from "@/components/sections/LoveStorySection";
import GalleryTeaserSection from "@/components/sections/GalleryTeaserSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import WeddingPartySection from "@/components/sections/WeddingPartySection";
import GiftSection from "@/components/sections/GiftSection";
import { VenueSection } from "@/components/sections/VenueSection";
import { TravelSection } from "@/components/sections/TravelSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { RsvpBand } from "@/components/sections/RsvpBand";
import { QuickFactsBand } from "@/components/sections/QuickFactsBand";
import FloatingControls from "@/components/sections/FloatingControls";
import EnterInvitationOverlay from "@/components/sections/EnterInvitationOverlay";
import { FooterSection } from "@/components/sections/FooterSection";
import { FAQStructuredData } from "@/components/seo/StructuredData";
import { EVENT_DATA } from "@/lib/constants/event-data";
import { getGalleryData } from "@/lib/gallery-data";

export default async function Home() {
  const eventStructuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: EVENT_DATA.event.name,
    startDate: EVENT_DATA.event.startTime,
    endDate: EVENT_DATA.event.endTime,
    eventAttendanceMode: EVENT_DATA.event.attendanceMode,
    eventStatus: EVENT_DATA.event.status,
    location: {
      "@type": "Place",
      name: EVENT_DATA.venues.groom.venueName,
      address: {
        "@type": "PostalAddress",
        streetAddress: EVENT_DATA.venues.groom.streetAddress,
        addressLocality: EVENT_DATA.venues.groom.addressLocality,
        addressCountry: EVENT_DATA.event.countryCode,
      },
    },
    image: [EVENT_DATA.site.ogImage.absoluteUrl],
    description: EVENT_DATA.event.description,
    offers: {
      "@type": "Offer",
      url: EVENT_DATA.site.baseUrl,
      price: "0",
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
      validFrom: EVENT_DATA.event.validFrom,
    },
    performer: {
      "@type": "Person",
      name: EVENT_DATA.couple.combinedName,
    },
    organizer: {
      "@type": "Person",
      name: EVENT_DATA.couple.combinedName,
    },
  };
  const categories = await getGalleryData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
      />
      <FAQStructuredData />
      <div className="relative min-h-screen">
        <div id="page-content">
        <HeroSection />
        <QuickFactsBand />
        <FloatingControls />

        <main id="main-content" className="mx-auto w-full max-w-6xl space-y-20 px-4 py-20 sm:space-y-24 sm:px-6 sm:py-24 lg:space-y-32 lg:px-8 lg:py-32">
          <LoveStorySection />
          <ScheduleSection />
          <GalleryTeaserSection categories={categories} />
          <WeddingPartySection />
          <GiftSection />
          <VenueSection groomVenue={EVENT_DATA.venues.groom} brideVenue={EVENT_DATA.venues.bride} />

          <div className="grid gap-12 lg:grid-cols-2">
            <TravelSection />
            <FaqSection />
          </div>
        </main>

        <RsvpBand />
        <FooterSection />
      </div>
        <EnterInvitationOverlay />
     </div>
    </>
  );
}
