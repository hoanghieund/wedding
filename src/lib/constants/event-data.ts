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

export const COUPLE_NAMES = "Minh & An";

export const WEDDING_DATE_ISO = "2026-11-22T15:00:00+07:00";
export const RSVP_DEADLINE_ISO = "2026-10-30T23:59:59+07:00";

export const EVENT_DETAILS: EventDetail[] = [
  {
    label: "Địa điểm",
    value: "Trung tâm Tiệc cưới White Palace",
    supportingText: "194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh",
  },
  {
    label: "Ngày & Giờ",
    value: "Chủ Nhật, ngày 22 tháng 11, 2026 · 15:00",
    supportingText: "Lễ cưới sẽ bắt đầu đúng giờ, vui lòng đến sớm 15 phút.",
  },
  {
    label: "Hạn chót xác nhận tham dự",
    value: "Thứ Sáu, ngày 30 tháng 10, 2026",
    supportingText: "Vui lòng xác nhận tham dự sớm để chúng tôi chuẩn bị chu đáo nhất.",
  },
  {
    label: "Trang phục",
    value: "Trang phục lịch sự với tông màu trung tính hoặc pastel",
    supportingText: "Vui lòng tránh mặc trang phục màu trắng tinh để nhường sự nổi bật cho cô dâu.",
  },
  {
    label: "Hướng dẫn khách mời",
    value: "Có bãi đậu xe tại chỗ và hỗ trợ thang máy.",
    supportingText: "Kính mong quý vị cho chúng tôi biết về yêu cầu chế độ ăn uống đặc biệt khi xác nhận tham dự.",
  },
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    time: "15:00",
    title: "Đón khách",
    description: "Nước uống chào mừng, hướng dẫn khách và sắp xếp chỗ ngồi trước khi buổi lễ bắt đầu.",
  },
  {
    time: "15:30",
    title: "Lễ cưới",
    description: "Buổi lễ ngắn gọn với những lời chúc phúc từ gia đình và lời thề nguyện của cặp đôi.",
  },
  {
    time: "16:30",
    title: "Chụp ảnh & Chào hỏi",
    description: "Thời gian thoải mái để chụp ảnh cùng cặp đôi và gia đình hai bên.",
  },
  {
    time: "17:30",
    title: "Tiệc tối",
    description: "Tiệc tối bắt đầu với các tiết mục biểu diễn, nâng ly và chung vui cùng nhau.",
  },
  {
    time: "20:30",
    title: "Tiễn khách",
    description: "Lời cảm ơn cuối cùng, tặng quà mang về và hỗ trợ phương tiện di chuyển.",
  },
];

export const VENUE = {
  venueName: "Trung tâm Tiệc cưới White Palace",
  addressLines: ["194 Hoàng Văn Thụ, Phường 9", "Quận Phú Nhuận, TP. Hồ Chí Minh"],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=White+Palace+194+Hoàng+Văn+Thụ",
  note: "Bãi đậu xe tại chỗ có giới hạn, nên ưu tiên sử dụng dịch vụ gọi xe hoặc đi chung xe.",
};

export const CONTACT_ACTIONS = [
  {
    label: "Liên hệ gia đình",
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

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_DATA: FaqItem[] = [
  {
    question: "Trang phục tham dự như thế nào?",
    answer:
      "Kính mong quý vị lựa chọn trang phục lịch sự với tông màu trung tính hoặc pastel, và vui lòng tránh màu trắng để dành sự nổi bật cho cô dâu.",
  },
  {
    question: "Hạn chót xác nhận tham dự (RSVP) là khi nào?",
    answer:
      "Kính mong quý vị xác nhận tham dự trước ngày 30 tháng 10 năm 2026 để gia đình chúng tôi có thể chuẩn bị chu đáo cho buổi tiệc.",
  },
  {
    question: "Tôi có thể dẫn theo người thân (plus-one) không?",
    answer:
      "Do sự sắp xếp chỗ ngồi của buổi tiệc, chúng tôi xin được đón tiếp những khách mời có tên trong thiệp mời. Kính mong quý vị thông cảm.",
  },
  {
    question: "Có chỗ đậu xe tại địa điểm không?",
    answer:
      "Địa điểm tổ chức có khu vực đậu xe tại chỗ và hỗ trợ thang máy để thuận tiện cho việc di chuyển của quý vị.",
  },
  {
    question: "Có tùy chọn món chay hoặc món ăn theo chế độ đặc biệt không?",
    answer:
      "Nếu quý vị có nhu cầu về món chay hoặc chế độ ăn đặc biệt, kính mong vui lòng thông báo khi xác nhận tham dự để gia đình chúng tôi chuẩn bị được chu toàn.",
  },
  {
    question: "Tôi nên đến lúc mấy giờ?",
    answer:
      "Kính mong quý vị có mặt trước giờ cử hành khoảng 15 phút để thuận tiện cho việc đón tiếp và ổn định chỗ ngồi.",
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
  title: "Lễ Thành Hôn Minh & An",
  location: "Trung tâm Tiệc cưới White Palace, 194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh",
  startTime: WEDDING_DATE_ISO,
  endTime: "2026-11-22T20:30:00+07:00",
  description: "Trân trọng kính mời quý vị đến chung vui trong ngày trọng đại của gia đình chúng tôi.",
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
    title: "Lưu trú gợi ý",
    summary: "Khách sạn gần địa điểm tổ chức",
    details:
      "Khu vực Phú Nhuận có nhiều khách sạn 3-4 sao trong bán kính 2km. Chúng tôi khuyến nghị đặt phòng sớm nếu quý vị đến từ tỉnh xa.",
    link: {
      label: "Tìm khách sạn gần đây",
      href: "https://www.google.com/maps/search/hotels+near+194+Hoàng+Văn+Thụ,+Phú+Nhuận",
    },
  },
  {
    title: "Di chuyển đến địa điểm",
    summary: "Phương tiện công cộng và gọi xe",
    details:
      "Từ sân bay Tân Sơn Nhất: khoảng 20 phút bằng taxi/Grab. Từ trung tâm Quận 1: khoảng 15 phút. Địa điểm nằm trên trục đường chính, dễ dàng tìm thấy.",
  },
  {
    title: "Đậu xe và gọi xe",
    summary: "Bãi đậu xe có giới hạn",
    details:
      "Trung tâm có bãi đậu xe tại chỗ nhưng số lượng có hạn. Chúng tôi khuyến nghị sử dụng dịch vụ Grab/taxi hoặc đi chung xe để thuận tiện hơn.",
  },
  {
    title: "Đến sớm",
    summary: "Khuyến nghị đến trước 15 phút",
    details:
      "Kính mong quý vị có mặt trước giờ cử hành khoảng 15 phút để thuận tiện cho việc đón tiếp, sắp xếp chỗ ngồi và tránh bỏ lỡ phần lễ quan trọng.",
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
