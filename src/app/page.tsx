import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import { QuickFactsBand } from "@/components/sections/QuickFactsBand";
import FloatingControls from "@/components/sections/FloatingControls";
import EnterInvitationOverlay from "@/components/sections/EnterInvitationOverlay";
import { FAQStructuredData } from "@/components/seo/StructuredData";
import { EVENT_DATA, VENUE_GROOM, VENUE_BRIDE } from "@/lib/constants/event-data";

const LoveStorySection = dynamic(() => import("@/components/sections/LoveStorySection"), {
  loading: () => <div className="h-40" />,
});
const GalleryProvider = dynamic(() => import("@/components/sections/GalleryProvider"), {
  loading: () => <div className="h-40" />,
});
const ScheduleSection = dynamic(() => import("@/components/sections/ScheduleSection"), {
  loading: () => <div className="h-40" />,
});
const WeddingPartySection = dynamic(() => import("@/components/sections/WeddingPartySection"), {
  loading: () => <div className="h-40" />,
});
const GiftSection = dynamic(() => import("@/components/sections/GiftSection"), {
  loading: () => <div className="h-40" />,
});
const VenueSection = dynamic(() => import("@/components/sections/VenueSection").then(m => ({ default: m.VenueSection })), {
  loading: () => <div className="h-40" />,
});
const TravelSection = dynamic(() => import("@/components/sections/TravelSection").then(m => ({ default: m.TravelSection })), {
  loading: () => <div className="h-40" />,
});
const FaqSection = dynamic(() => import("@/components/sections/FaqSection").then(m => ({ default: m.FaqSection })), {
  loading: () => <div className="h-40" />,
});
const RsvpBand = dynamic(() => import("@/components/sections/RsvpBand").then(m => ({ default: m.RsvpBand })), {
  loading: () => <div className="h-40" />,
});

export default function Home() {
  const eventStructuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: EVENT_DATA.event.name,
    startDate: EVENT_DATA.event.startISO,
    endDate: EVENT_DATA.event.endISO,
    eventAttendanceMode: EVENT_DATA.event.attendanceMode,
    eventStatus: EVENT_DATA.event.status,
    location: {
      "@type": "Place",
      name: VENUE_GROOM.venueName,
      address: {
        "@type": "PostalAddress",
        streetAddress: VENUE_GROOM.streetAddress,
        addressLocality: VENUE_GROOM.addressLocality,
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
      validFrom: EVENT_DATA.event.validFromISO,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
      />
      <FAQStructuredData />
      <div className="relative min-h-screen">
        <HeroSection />
        <QuickFactsBand />
        <FloatingControls />
        <EnterInvitationOverlay />

        <main className="mx-auto w-full max-w-6xl space-y-20 px-4 py-20 sm:space-y-24 sm:px-6 sm:py-24 lg:space-y-32 lg:px-8 lg:py-32">
          <LoveStorySection />
          <GalleryProvider />
          <ScheduleSection />
          <WeddingPartySection />
          <GiftSection />
          <VenueSection groomVenue={VENUE_GROOM} brideVenue={VENUE_BRIDE} />

          <div className="grid gap-12 lg:grid-cols-2">
            <TravelSection />
            <FaqSection />
          </div>
        </main>

        <RsvpBand />
      </div>
    </>
  );
}
