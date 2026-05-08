import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import { QuickFactsBand } from "@/components/sections/QuickFactsBand";
import FloatingControls from "@/components/sections/FloatingControls";
import EnterInvitationOverlay from "@/components/sections/EnterInvitationOverlay";
import { FAQStructuredData } from "@/components/seo/StructuredData";
import { VENUE_GROOM, VENUE_BRIDE } from "@/lib/constants/event-data";

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
    name: "Lễ thành hôn Hoàng Hiếu & Kim Liên",
    startDate: "2026-12-25T09:00:00+07:00",
    endDate: "2026-12-25T13:30:00+07:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Tư gia nhà trai",
      address: {
        "@type": "PostalAddress",
        streetAddress: "An Lạc, Vụ Bản",
        addressLocality: "Ninh Bình",
        addressCountry: "VN",
      },
    },
    image: ["https://wedding.hoho-kimlien.com/opengraph-image.png"],
    description:
      "Gia đình chúng tôi trân trọng kính mời quý vị đến chung vui trong ngày trọng đại.",
    offers: {
      "@type": "Offer",
      url: "https://wedding.hoho-kimlien.com",
      price: "0",
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
      validFrom: "2026-05-07T00:00:00+07:00",
    },
    performer: {
      "@type": "Person",
      name: "Hoàng Hiếu & Kim Liên",
    },
    organizer: {
      "@type": "Person",
      name: "Hoàng Hiếu & Kim Liên",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
      />
      <FAQStructuredData />
      <div className="relative min-h-screen bg-[#030305] bg-[linear-gradient(rgba(3,3,5,0.86),rgba(3,3,5,0.9)),url('/images/HAR01404.jpg')] bg-cover bg-fixed bg-center text-[#f0f0f5]">
        <HeroSection />
        <QuickFactsBand />
        <FloatingControls />
        <EnterInvitationOverlay />

        <main className="mx-auto w-full max-w-6xl space-y-16 px-4 py-16 sm:space-y-20 sm:px-6 sm:py-20 lg:space-y-24 lg:px-8 lg:py-24">
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
