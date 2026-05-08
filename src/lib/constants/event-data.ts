export type EventDetail = {
  label: string;
  value: string;
  supportingText?: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  description: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type TravelItem = {
  title: string;
  summary: string;
  details: string;
  link?: {
    label: string;
    href: string;
  };
};

export type GalleryTeaserItem = {
  src: string;
  alt: string;
  aspectRatio?: "portrait" | "landscape" | "square";
};

export const COUPLE = {
  groom: {
    name: "Hoàng Hiếu",
    fullName: "Nguyễn Hoàng Hiếu",
    title: "Chú rể",
  },
  bride: {
    name: "Kim Liên",
    fullName: "Trần Kim Liên",
    title: "Cô dâu",
  },
  combinedName: "Hoàng Hiếu & Kim Liên",
};

export const EVENT_CONFIG = {
  weddingDateISO: "2026-12-25T09:00:00+07:00",
  rsvpDeadlineISO: "2026-12-15T23:59:59+07:00",
  ceremonyTime: "09:00",
  weddingDateFormatted: "Thứ Năm, ngày 25 tháng 12, 2026",
};

// Backward compatibility for existing components
export const COUPLE_NAMES = COUPLE.combinedName;
export const WEDDING_DATE_ISO = EVENT_CONFIG.weddingDateISO;
export const RSVP_DEADLINE_ISO = EVENT_CONFIG.rsvpDeadlineISO;

export const VENUE_GROOM = {
  venueName: "Tư gia nhà trai",
  addressLines: ["An Lạc, Xã Vụ Bản", "Tỉnh Ninh Bình"],
  coordinates: { lat: 20.324818, lng: 106.088168 },
  mapUrl:
    "https://www.google.com/maps/place/20%C2%B019'29.3%22N+106%C2%B005'17.4%22E/@20.324818,106.0855931,17z",
  note: "Có bãi đậu xe tại nhà. Kính mong quý vị đến sớm 20-30 phút để thuận tiện sắp xếp chỗ ngồi.",
};

export const VENUE_BRIDE = {
  venueName: "Tư gia nhà gái",
  addressLines: ["Đội 3 Vân Cát, Xã Vụ Bản", "Tỉnh Ninh Bình"],
  coordinates: { lat: 20.363823, lng: 106.083362 },
  mapUrl:
    "https://www.google.com/maps/place/20%C2%B021'49.8%22N+106%C2%B005'00.1%22E/@20.363823,106.0827183,19z",
  note: "Địa điểm tổ chức Lễ Vu Quy vào sáng sớm.",
};

export const VENUE = VENUE_GROOM;

export const EVENT_DETAILS: EventDetail[] = [
  {
    label: "Địa điểm",
    value: VENUE_GROOM.venueName,
    supportingText: VENUE_GROOM.addressLines.join(", "),
  },
  {
    label: "Ngày & Giờ",
    value: `${EVENT_CONFIG.weddingDateFormatted} · ${EVENT_CONFIG.ceremonyTime}`,
    supportingText:
      "Lễ Thành Hôn sẽ bắt đầu đúng giờ, kính mong quý vị đến sớm 20-30 phút.",
  },
  {
    label: "Hạn xác nhận",
    value: "Thứ Hai, ngày 15 tháng 12, 2026",
    supportingText:
      "Kính mong quý vị xác nhận tham dự sớm để gia đình chuẩn bị chu đáo.",
  },
  {
    label: "Trang phục",
    value: "Trang phục lịch sự, áo dài truyền thống được hoan nghênh",
    supportingText:
      "Kính mong quý vị tránh mặc trang phục màu trắng để dành sự nổi bật cho cô dâu.",
  },
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    time: "07:00 - 08:30",
    title: "Lễ Vu Quy tại nhà gái",
    description:
      "Gia đình nhà trai đến nhà gái làm lễ Vu Quy, cô dâu từ giã tổ tiên và gia đình.",
  },
  {
    time: "08:30 - 09:00",
    title: "Rước dâu về nhà trai",
    description:
      "Đoàn rước dâu khởi hành từ nhà gái về nhà trai, cô dâu chính thức về nhà chồng.",
  },
  {
    time: "09:00 - 10:00",
    title: "Lễ Thành Hôn tại nhà trai",
    description:
      "Lễ gia tiên, lễ thành hôn, cô dâu chú rể làm lễ trước bàn thờ tổ tiên nhà trai và nhận lời chúc phúc từ gia đình hai bên.",
  },
  {
    time: "11:00 - 13:30",
    title: "Tiệc mừng",
    description:
      "Tiệc mừng cưới với các món ăn truyền thống, nâng ly chúc phúc và chung vui cùng gia đình hai họ.",
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "Trang phục tham dự như thế nào?",
    answer:
      "Kính mong quý vị lựa chọn trang phục lịch sự, áo dài truyền thống được hoan nghênh. Vui lòng tránh màu trắng để dành sự nổi bật cho cô dâu.",
  },
  {
    question: "Hạn xác nhận tham dự là khi nào?",
    answer: `Kính mong quý vị xác nhận tham dự trước ngày 15 tháng 12 năm 2026 để gia đình chúng tôi có thể chuẩn bị chu đáo.`,
  },
];

export const CALENDAR_EVENT = {
  title: `Lễ Thành Hôn ${COUPLE.combinedName}`,
  location: `${VENUE_GROOM.venueName}, ${VENUE_GROOM.addressLines.join(", ")}`,
  startTime: EVENT_CONFIG.weddingDateISO,
  endTime: "2026-12-25T13:30:00+07:00",
  description:
    "Gia đình chúng tôi trân trọng kính mời quý vị đến chung vui trong ngày trọng đại.",
  ctaLabel: "Thêm vào lịch",
};

export const TRAVEL_GUIDANCE: TravelItem[] = [
  {
    title: "Từ Hà Nội",
    summary: "Khoảng cách ~90km, thời gian di chuyển khoảng 2 giờ",
    details:
      "Từ Hà Nội đi theo Quốc lộ 1A hoặc cao tốc Pháp Vân - Ninh Bình, sau đó rẽ vào hướng Vụ Bản.",
    link: {
      label: "Xem chỉ đường trên Google Maps",
      href: "https://www.google.com/maps/dir/Hà+Nội/An+Lạc+Vụ+Bản+Ninh+Bình",
    },
  },
];

export const CONTACT_ACTIONS = [
  {
    label: `Liên hệ gia đình ${COUPLE.groom.name}`,
    hint: "+84 912 345 678",
    href: "tel:+84912345678",
    icon: "phone" as const,
  },
  {
    label: `Liên hệ gia đình ${COUPLE.bride.name}`,
    hint: "+84 987 654 321",
    href: "tel:+84987654321",
    icon: "phone" as const,
  },
];

export const HERO_IMAGE = {
  src: "/images/hero/HAR01404.jpg",
  alt: "Ảnh cặp đôi - Hero background",
};

export const GALLERY_TEASER_ITEMS: GalleryTeaserItem[] = [
  {
    src: "/images/gallery/couple-1.svg",
    alt: "Ảnh minh hoạ cặp đôi",
    aspectRatio: "portrait",
  },
  {
    src: "/images/gallery/couple-2.svg",
    alt: "Ảnh minh hoạ cặp đôi",
    aspectRatio: "portrait",
  },
];
