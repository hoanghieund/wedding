import EventDetailsSection from "@/components/sections/EventDetailsSection";
import HeroSection from "@/components/sections/HeroSection";
import { Calendar } from "@/components/sections/Calendar";
import { ContactSection } from "@/components/sections/ContactSection";
import { Gallery } from "@/components/sections/Gallery";
import ScheduleSection from "@/components/sections/ScheduleSection";
import { Travel } from "@/components/sections/Travel";
import { FaqSection } from "@/components/sections/faq";

const venue = {
  venueName: "Trung tâm Tiệc cưới White Palace",
  addressLines: ["194 Hoàng Văn Thụ, Phường 9", "Quận Phú Nhuận, TP. Hồ Chí Minh"],
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=White+Palace+Phạm+Văn+Đồng",
  note: "Bãi đậu xe tại chỗ có giới hạn, nên ưu tiên sử dụng dịch vụ gọi xe hoặc đi chung xe.",
};

const contactActions = [
  {
    label: "Gọi cho gia chủ",
    hint: "+84 912 345 678",
    href: "tel:+84912345678",
    icon: "phone" as const,
  },
  {
    label: "Email hỗ trợ",
    hint: "hello@ourweddingday.com",
    href: "mailto:hello@ourweddingday.com",
    icon: "mail" as const,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf6_0%,#faf7f2_45%,#f5f1eb_100%)] text-stone-900">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <HeroSection />
        <EventDetailsSection />
        <ScheduleSection />
        <VenueSection
          venueName={venue.venueName}
          addressLines={venue.addressLines}
          mapUrl={venue.mapUrl}
          note={venue.note}
        />
        <ContactSection actions={contactActions} />
        <Gallery />
        <Travel />
        <FaqSection />
        <Calendar />
      </main>
    </div>
  );
}
