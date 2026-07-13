import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import { QuickFactsBand } from "@/components/sections/QuickFactsBand";
import FloatingControls from "@/components/sections/FloatingControls";
import EnterInvitationOverlay from "@/components/sections/EnterInvitationOverlay";
import { FooterSection } from "@/components/sections/FooterSection";
import { FAQStructuredData } from "@/components/seo/StructuredData";
import { EVENT_CONFIG, EVENT_DATA, VENUE_GROOM, VENUE_BRIDE } from "@/lib/constants/event-data";
import { getGalleryData } from "@/lib/gallery-data";

function SectionPlaceholder({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`section-shell rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] p-6 ${className}`}
    >
      <div className="mx-auto h-8 w-2/3 rounded bg-[var(--bg-elevated)]/70" />
      <div className="mx-auto mt-6 h-px w-24 bg-[var(--border-soft)]" />
      <div className="mx-auto mt-8 h-4 w-5/6 rounded bg-[var(--bg-elevated)]/60" />
      <div className="mx-auto mt-3 h-4 w-2/3 rounded bg-[var(--bg-elevated)]/60" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="h-24 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/40" />
        <div className="h-24 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/40" />
      </div>
    </div>
  );
}

const LoveStorySection = dynamic(() => import("@/components/sections/LoveStorySection"), {
  loading: () => <SectionPlaceholder className="h-[44rem] sm:h-[52rem]" />,
});
const GalleryTeaserSection = dynamic(() => import("@/components/sections/GalleryTeaserSection"), {
  loading: () => <SectionPlaceholder className="h-[32rem] sm:h-[38rem]" />,
});
const ScheduleSection = dynamic(() => import("@/components/sections/ScheduleSection"), {
  loading: () => <SectionPlaceholder className="h-[48rem] sm:h-[56rem]" />,
});
const WeddingPartySection = dynamic(() => import("@/components/sections/WeddingPartySection"), {
  loading: () => <SectionPlaceholder className="h-[38rem] sm:h-[44rem]" />,
});
const GiftSection = dynamic(() => import("@/components/sections/GiftSection"), {
  loading: () => <SectionPlaceholder className="h-[40rem] sm:h-[48rem]" />,
});
const VenueSection = dynamic(() => import("@/components/sections/VenueSection").then(m => ({ default: m.VenueSection })), {
  loading: () => <SectionPlaceholder className="h-[42rem] sm:h-[50rem]" />,
});
const TravelSection = dynamic(() => import("@/components/sections/TravelSection").then(m => ({ default: m.TravelSection })), {
  loading: () => <SectionPlaceholder className="h-[30rem] sm:h-[36rem]" />,
});
const FaqSection = dynamic(() => import("@/components/sections/FaqSection").then(m => ({ default: m.FaqSection })), {
  loading: () => <SectionPlaceholder className="h-[32rem] sm:h-[40rem]" />,
});
const RsvpBand = dynamic(() => import("@/components/sections/RsvpBand").then(m => ({ default: m.RsvpBand })), {
  loading: () => <SectionPlaceholder className="h-[42rem] sm:h-[50rem]" />,
});
export default async function Home() {
  const eventStructuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: EVENT_DATA.event.name,
    startDate: EVENT_CONFIG.weddingDateISO,
    endDate: EVENT_CONFIG.weddingEndISO,
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
      validFrom: EVENT_CONFIG.validFromISO,
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
        <HeroSection />
        <QuickFactsBand />
        <FloatingControls />
        <EnterInvitationOverlay />

        <main id="main-content" className="mx-auto w-full max-w-6xl space-y-20 px-4 py-20 sm:space-y-24 sm:px-6 sm:py-24 lg:space-y-32 lg:px-8 lg:py-32">
          <LoveStorySection />
          <ScheduleSection />
          <GalleryTeaserSection categories={categories} />
          <WeddingPartySection />
          <GiftSection />
          <VenueSection groomVenue={VENUE_GROOM} brideVenue={VENUE_BRIDE} />

          <div className="grid gap-12 lg:grid-cols-2">
            <TravelSection />
            <FaqSection />
          </div>
        </main>

        <RsvpBand />
        <FooterSection />
      </div>
    </>
  );
}
