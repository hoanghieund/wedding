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

export const COUPLE_NAMES = "Hoàng Hiếu & Kim Liên";

export const WEDDING_DATE_ISO = "2026-12-25T09:00:00+07:00";
export const RSVP_DEADLINE_ISO = "2026-12-15T23:59:59+07:00";

export const EVENT_DETAILS: EventDetail[] = [
  {
    label: "Địa điểm",
    value: "Tư gia nhà trai",
    supportingText: "An Lạc, Xã Vụ Bản, Tỉnh Ninh Bình",
  },
  {
    label: "Ngày & Giờ",
    value: "Thứ Năm, ngày 25 tháng 12, 2026 · 09:00",
    supportingText: "Lễ Thành Hôn sẽ bắt đầu đúng giờ, kính mong quý vị đến sớm 20-30 phút.",
  },
  {
    label: "Hạn xác nhận",
    value: "Thứ Hai, ngày 15 tháng 12, 2026",
    supportingText: "Kính mong quý vị xác nhận tham dự sớm để gia đình chuẩn bị chu đáo.",
  },
  {
    label: "Trang phục",
    value: "Trang phục lịch sự, áo dài truyền thống được hoan nghênh",
    supportingText: "Kính mong quý vị tránh mặc trang phục màu trắng để dành sự nổi bật cho cô dâu.",
  },
  {
    label: "Lưu ý",
    value: "Có bãi đậu xe tại nhà",
    supportingText: "Nếu quý vị có nhu cầu về món chay hoặc chế độ ăn đặc biệt, kính mong thông báo khi xác nhận tham dự.",
  },
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    time: "07:00 - 08:30",
    title: "Lễ Vu Quy tại nhà gái",
    description: "Gia đình nhà trai đến nhà gái làm lễ Vu Quy, cô dâu từ giã tổ tiên và gia đình.",
  },
  {
    time: "08:30 - 09:00",
    title: "Rước dâu về nhà trai",
    description: "Đoàn rước dâu khởi hành từ nhà gái về nhà trai, cô dâu chính thức về nhà chồng.",
  },
  {
    time: "09:00 - 10:00",
    title: "Lễ Thành Hôn tại nhà trai",
    description: "Lễ gia tiên, lễ thành hôn, cô dâu chú rể làm lễ trước bàn thờ tổ tiên nhà trai và nhận lời chúc phúc từ gia đình hai bên.",
  },
  {
    time: "10:00 - 11:00",
    title: "Chụp ảnh & Chào hỏi",
    description: "Thời gian để chụp ảnh cùng cặp đôi, gia đình hai bên và khách mời.",
  },
  {
    time: "11:00 - 13:30",
    title: "Tiệc mừng",
    description: "Tiệc mừng cưới với các món ăn truyền thống, nâng ly chúc phúc và chung vui cùng gia đình hai họ.",
  },
  {
    time: "13:30",
    title: "Tiễn khách",
    description: "Gia đình hai bên cảm ơn và tiễn khách về.",
  },
];

export const VENUE_GROOM = {
  venueName: "Tư gia nhà trai",
  addressLines: ["An Lạc, Xã Vụ Bản", "Tỉnh Ninh Bình"],
  coordinates: { lat: 20.324818, lng: 106.088168 },
  mapUrl: "https://www.google.com/maps/place/20%C2%B019'29.3%22N+106%C2%B005'17.4%22E/@20.324818,106.0855931,17z",
  note: "Có bãi đậu xe tại nhà. Kính mong quý vị đến sớm 20-30 phút để thuận tiện sắp xếp chỗ ngồi.",
};

export const VENUE_BRIDE = {
  venueName: "Tư gia nhà gái",
  addressLines: ["Đội 3 Vân Cát, Xã Vụ Bản", "Tỉnh Ninh Bình"],
  coordinates: { lat: 20.363823, lng: 106.083362 },
  mapUrl: "https://www.google.com/maps/place/20%C2%B021'49.8%22N+106%C2%B005'00.1%22E/@20.363823,106.0827183,19z",
  note: "Địa điểm tổ chức Lễ Vu Quy vào sáng sớm.",
};

// Backward compatibility
export const VENUE = VENUE_GROOM;

export const CONTACT_ACTIONS = [
  {
    label: "Liên hệ gia đình nhà trai",
    hint: "+84 912 345 678",
    href: "tel:+84912345678",
    icon: "phone" as const,
  },
  {
    label: "Liên hệ gia đình nhà gái",
    hint: "+84 987 654 321",
    href: "tel:+84987654321",
    icon: "phone" as const,
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_DATA: FaqItem[] = [
  {
    question: "Trang phục tham dự như thế nào?",
    answer:
      "Kính mong quý vị lựa chọn trang phục lịch sự, áo dài truyền thống được hoan nghênh. Vui lòng tránh màu trắng để dành sự nổi bật cho cô dâu.",
  },
  {
    question: "Hạn xác nhận tham dự là khi nào?",
    answer:
      "Kính mong quý vị xác nhận tham dự trước ngày 15 tháng 12 năm 2026 để gia đình chúng tôi có thể chuẩn bị chu đáo.",
  },
  {
    question: "Tôi có thể đưa trẻ nhỏ đi cùng không?",
    answer:
      "Gia đình chúng tôi rất hoan nghênh các em nhỏ tham dự. Kính mong quý vị thông báo số lượng trẻ em khi xác nhận để chúng tôi chuẩn bị ghế ngồi phù hợp.",
  },
  {
    question: "Thiệp mời có dành cho người đi cùng không?",
    answer:
      "Do sự sắp xếp chỗ ngồi và chuẩn bị tiệc, kính mong quý vị thông báo số lượng người đi cùng khi xác nhận tham dự. Gia đình chúng tôi xin trân trọng đón tiếp.",
  },
  {
    question: "Có chỗ đậu xe tại nhà không?",
    answer:
      "Có bãi đậu xe tại nhà và khu vực lân cận. Nếu quý vị đi từ xa, có thể liên hệ gia đình để được hỗ trợ chỉ đường cụ thể.",
  },
  {
    question: "Có món chay hoặc món ăn theo chế độ đặc biệt không?",
    answer:
      "Nếu quý vị có nhu cầu về món chay hoặc chế độ ăn đặc biệt, kính mong thông báo khi xác nhận tham dự để gia đình chuẩn bị chu đáo.",
  },
  {
    question: "Tôi nên đến lúc mấy giờ?",
    answer:
      "Lễ Thành Hôn bắt đầu lúc 09:00 sáng. Kính mong quý vị có mặt trước 20-30 phút để thuận tiện đón tiếp và sắp xếp chỗ ngồi.",
  },
  {
    question: "Nếu tôi đến muộn thì sao?",
    answer:
      "Nếu có việc bận không thể đến đúng giờ, kính mong quý vị thông báo trước để gia đình sắp xếp. Quý vị vẫn được chào đón nồng nhiệt dù đến muộn.",
  },
];

export type CalendarEventInfo = {
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  description: string;
  ctaLabel: string;
};

export const CALENDAR_EVENT: CalendarEventInfo = {
  title: "Lễ Thành Hôn Hoàng Hiếu & Kim Liên",
  location: "Tư gia nhà trai, Xã An Lạc, Vụ Bản, Ninh Bình",
  startTime: WEDDING_DATE_ISO,
  endTime: "2026-12-25T13:30:00+07:00",
  description: "Gia đình chúng tôi trân trọng kính mời quý vị đến chung vui trong ngày trọng đại.",
  ctaLabel: "Thêm vào lịch",
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

export const TRAVEL_GUIDANCE: TravelItem[] = [
  {
    title: "Từ Hà Nội",
    summary: "Khoảng cách ~90km, thời gian di chuyển khoảng 2 giờ",
    details:
      "Từ Hà Nội đi theo Quốc lộ 1A hoặc cao tốc Pháp Vân - Ninh Bình, sau đó rẽ vào hướng Vụ Bản. Có thể sử dụng xe khách, xe riêng hoặc thuê xe.",
    link: {
      label: "Xem chỉ đường trên Google Maps",
      href: "https://www.google.com/maps/dir/Hà+Nội/An+Lạc+Vụ+Bản+Ninh+Bình",
    },
  },
  {
    title: "Từ TP. Nam Định",
    summary: "Khoảng cách ~30km, thời gian di chuyển khoảng 40 phút",
    details:
      "Từ trung tâm TP. Nam Định đi theo Quốc lộ 21B hướng Ninh Bình, sau đó rẽ vào hướng Vụ Bản. Đường đi thuận tiện, dễ tìm.",
  },
  {
    title: "Lưu trú gợi ý",
    summary: "Khách sạn tại TP. Ninh Bình hoặc Nam Định",
    details:
      "Nếu quý vị đến từ xa, có thể nghỉ tại các khách sạn ở TP. Ninh Bình (cách ~15km) hoặc TP. Nam Định (cách ~30km). Chúng tôi khuyến nghị đặt phòng sớm.",
    link: {
      label: "Tìm khách sạn gần Ninh Bình",
      href: "https://www.google.com/maps/search/hotels+near+Ninh+Bình",
    },
  },
  {
    title: "Đậu xe và đến sớm",
    summary: "Có bãi đậu xe tại nhà",
    details:
      "Nhà có bãi đậu xe rộng rãi. Kính mong quý vị đến sớm 20-30 phút để thuận tiện đón tiếp, sắp xếp chỗ ngồi và không bỏ lỡ phần lễ quan trọng.",
  },
];

export type GalleryTeaserItem = {
  src: string;
  alt: string;
  aspectRatio?: "portrait" | "landscape" | "square";
};

export const HERO_IMAGE = {
  src: "/images/hero/couple-hero.svg",
  alt: "Ảnh cặp đôi - Hero background",
};

export const GALLERY_TEASER_ITEMS: GalleryTeaserItem[] = [
  {
    src: "/images/gallery/couple-1.svg",
    alt: "Ảnh minh hoạ cặp đôi trong buổi chụp ảnh cưới",
    aspectRatio: "portrait",
  },
  {
    src: "/images/gallery/couple-2.svg",
    alt: "Ảnh minh hoạ khoảnh khắc lãng mạn của cặp đôi",
    aspectRatio: "portrait",
  },
  {
    src: "/images/gallery/couple-3.svg",
    alt: "Ảnh cặp đôi trong khung cảnh lãng mạn",
    aspectRatio: "landscape",
  },
  {
    src: "/images/gallery/couple-4.svg",
    alt: "Khoảnh khắc hạnh phúc của cặp đôi",
    aspectRatio: "square",
  },
  {
    src: "/images/gallery/couple-5.svg",
    alt: "Ảnh cặp đôi trong buổi chụp ngoại cảnh",
    aspectRatio: "portrait",
  },
  {
    src: "/images/gallery/couple-6.svg",
    alt: "Chi tiết trang trí và hoa cưới",
    aspectRatio: "square",
  },
];
