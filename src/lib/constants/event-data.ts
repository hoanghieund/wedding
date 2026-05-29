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

export type AttendanceStatus = "attending" | "not_attending" | "maybe";

const SITE_BASE_URL = "https://wedding-hieu-lien.vercel.app";
const WEDDING_TIME_ZONE = "Asia/Ho_Chi_Minh";
const EVENT_TIMES = {
  startAt: "2026-12-06 09:00",
  endAt: "2026-12-06 13:30",
  rsvpDeadlineAt: "2026-12-05 23:59",
  validFromAt: "2026-10-01 00:00",
} as const;
const COUPLE_INFO = {
  groomName: "Hoàng Hiếu",
  groomGiftName: "HOÀNG HIẾU",
  groomFullName: "Trần Xuân Hiếu",
  brideName: "Kim Liên",
  brideGiftName: "KIM LIÊN",
  brideFullName: "Trần Thị Liên",
  combinedName: "Hoàng Hiếu & Kim Liên",
} as const;
const TRANSFER_NOTE = "Mung cuoi Hoang Hieu Kim Lien";

function toIsoWithWeddingTimezone(dateTime: string) {
  return `${dateTime.replace(" ", "T")}:00+07:00`;
}

const EVENT_START_ISO = toIsoWithWeddingTimezone(EVENT_TIMES.startAt);
const EVENT_END_ISO = toIsoWithWeddingTimezone(EVENT_TIMES.endAt);
const RSVP_DEADLINE_ISO_VALUE = toIsoWithWeddingTimezone(
  EVENT_TIMES.rsvpDeadlineAt,
);
const VALID_FROM_ISO = toIsoWithWeddingTimezone(EVENT_TIMES.validFromAt);

export const EVENT_DATA = {
  site: {
    baseUrl: SITE_BASE_URL,
    locale: "vi_VN",
    language: "vi",
    title: `Thiệp mời lễ thành hôn – ${COUPLE_INFO.combinedName}`,
    titleTemplate: "%s | Đám cưới",
    siteName: `Đám cưới ${COUPLE_INFO.combinedName}`,
    description:
      "Trân trọng kính mời quý vị tham dự lễ thành hôn. Xem chi tiết, lịch trình, địa điểm và xác nhận tham dự.",
    shareDescription: `Xem chi tiết lễ thành hôn của ${COUPLE_INFO.combinedName} – ngày ${EVENT_TIMES.startAt}, Ninh Bình.`,
    keywords: ["đám cưới", "thiệp mời", "Hoàng Hiếu", "Kim Liên", "Ninh Bình"],
    ogImage: {
      url: "/opengraph-image.png",
      absoluteUrl: `${SITE_BASE_URL}/opengraph-image.png`,
      width: 1200,
      height: 630,
      alt: `Thiệp mời đám cưới ${COUPLE_INFO.combinedName}`,
    },
  },
  couple: {
    groom: {
      name: COUPLE_INFO.groomName,
    },
    bride: {
      name: COUPLE_INFO.brideName,
    },
    combinedName: COUPLE_INFO.combinedName,
  },
  event: {
    name: `Lễ thành hôn ${COUPLE_INFO.combinedName}`,
    title: "Lễ Thành Hôn",
    timeZone: WEDDING_TIME_ZONE,
    attendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    status: "https://schema.org/EventScheduled",
    description:
      "Gia đình chúng tôi trân trọng kính mời quý vị đến chung vui trong ngày trọng đại.",
    countryCode: "VN",
  },
  venues: {
    groom: {
      venueName: "Tư gia nhà trai",
      addressLines: ["An Lạc, Xã Vụ Bản", "Tỉnh Ninh Bình"],
      streetAddress: "An Lạc, Vụ Bản",
      addressLocality: "Ninh Bình",
      coordinates: { lat: 20.324818, lng: 106.088168 },
      mapUrl:
        "https://www.google.com/maps/place/20%C2%B019'29.3%22N+106%C2%B005'17.4%22E/@20.324818,106.0855931,17z",
      note: "Có bãi đậu xe tại nhà. Kính mong quý vị đến sớm 20-30 phút để thuận tiện sắp xếp chỗ ngồi.",
      mapTitle: "Nhà trai - Lễ Thành Hôn",
      timeLabel: "09:00 - 13:30",
    },
    bride: {
      venueName: "Tư gia nhà gái",
      addressLines: ["Đội 3 Vân Cát, Xã Vụ Bản", "Tỉnh Ninh Bình"],
      streetAddress: "Đội 3 Vân Cát, Vụ Bản",
      addressLocality: "Ninh Bình",
      coordinates: { lat: 20.363823, lng: 106.083362 },
      mapUrl:
        "https://www.google.com/maps/place/20%C2%B021'49.8%22N+106%C2%B005'00.1%22E/@20.363823,106.0827183,19z",
      note: "Địa điểm tổ chức Lễ Vu Quy vào sáng sớm.",
      mapTitle: "Nhà gái - Lễ Vu Quy",
      timeLabel: "07:00 - 08:30 sáng",
    },
  },
  copy: {
    hero: {
      invitation: "Trân trọng kính mời",
      countdownLabel: "Cùng đếm ngược đến ngày vui",
      rsvpLabel: "Xác nhận tham dự",
      scrollLabel: "Cuộn xuống",
    },
    overlay: {
      eyebrow: "Wedding Invitation",
      invitation: "Trân trọng kính mời",
      description:
        "Hân hạnh được đón tiếp Quý vị trong ngày trọng đại của chúng tôi",
      openButton: "Mở Thiệp",
    },
    quickFacts: {
      ariaLabel: "Thông tin nhanh về sự kiện",
      dateLabel: "Ngày cử hành",
      venueLabel: "Địa điểm",
      dressCodeLabel: "Trang phục",
      rsvpDeadlineLabel: "Hạn xác nhận",
    },
    sections: {
      storyChapter: "Chương 3",
      storyTitle: "Hành Trình Nên Duyên",
      galleryChapter: "Chương 4",
      galleryTitle: "Khoảnh Khắc",
      partyChapter: "Chương 6",
      partyTitle: "Đội Ngũ Đồng Hành",
      partyDescription:
        "Đây là những người bạn, người thân luôn ở bên cô dâu chú rể trong quá trình chuẩn bị và trong ngày cưới.",
      giftChapter: "Chương 7",
      giftTitle: "Mừng cưới",
      giftDescription:
        "Sự hiện diện của quý vị là niềm vui lớn nhất của gia đình chúng tôi. Nếu thuận tiện, quý vị có thể gửi lời chúc qua mã QR bên dưới.",
      venueChapter: "Chương 8",
      venueTitle: "Nơi hân hạnh đón tiếp quý vị",
      travelChapter: "Chương 9",
      travelTitle: "Thông tin hữu ích",
      faqChapter: "Chương 10",
      faqTitle: "Câu hỏi thường gặp",
      rsvpChapter: "Chương Kết",
      rsvpTitle: "Xác Nhận Tham Dự",
      rsvpDescription:
        "Gia đình rất hân hạnh được đón tiếp quý vị trong ngày trọng đại này.",
      rsvpSuccessLabel: "XÁC NHẬN ĐÃ GỬI",
      rsvpSuccessMessage: "Gia đình xin cảm ơn quý vị đã xác nhận tham dự.",
    },
    venueDirections: {
      heading: "Xem chỉ đường từ nhà trai đến nhà gái",
      description:
        "Mở Google Maps để xem lộ trình di chuyển chi tiết giữa hai địa điểm",
    },
  },
  details: {
    dressCode: "Trang phục lịch sự, áo dài truyền thống được hoan nghênh",
  },
  schedule: [
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
  ] satisfies ScheduleItem[],
  loveStoryTimeline: [
    {
      date: "2022",
      code: "FIRST_SPARK",
      title: "Năm Ấy, Chúng Mình Bắt Đầu",
      desc: "Năm 2022, giữa những ngày rất bình thường, chúng mình bước vào cuộc đời nhau. Không ồn ào, không vội vã, chỉ là càng nói chuyện càng thấy hợp, càng gặp lại càng thấy thương.",
    },
    {
      date: "2023",
      code: "THE_DEPARTURE",
      title: "Ngày Em Sang Nhật",
      desc: "Khi tình yêu vừa đủ sâu, cô dâu bắt đầu hành trình 3 năm ở Nhật. Từ đây, yêu nhau không còn chỉ là những buổi hẹn gần bên, mà là học cách thương một người qua màn hình điện thoại.",
    },
    {
      date: "2023 - 2025",
      code: "LONG_DISTANCE",
      title: "Ba Năm Giữ Một Lời Hứa",
      desc: "Có những ngày lệch múi giờ, những đêm nhớ nhau đến nghẹn lòng, những lần chỉ kịp hỏi 'hôm nay em ổn không?'. Nhưng sau tất cả, chúng mình vẫn chọn ở lại, chọn tin nhau, chọn đi tiếp.",
    },
    {
      date: "Mỗi Năm",
      code: "REUNION_TRIPS",
      title: "Những Chuyến Bay Về Và Những Chuyến Đi Chung",
      desc: "Mỗi năm cô dâu bay về Việt Nam, và mỗi lần gặp lại, chúng mình lại cùng nhau đi du lịch. Những chuyến đi ấy không chỉ để ngắm cảnh, mà để bù đắp những cái ôm còn thiếu và lưu lại bằng chứng rằng tình yêu này vẫn luôn ở đây.",
    },
    {
      date: "2026",
      code: "NEW_BEGINNING",
      title: "Không Còn Là Yêu Xa",
      desc: "Sau 4 năm yêu nhau, trong đó có 3 năm cách xa, chúng mình hiểu rằng người phù hợp không phải là người luôn ở cạnh từ đầu, mà là người dù xa đến đâu vẫn khiến mình muốn trở về.",
    },
    {
      date: "Hôm Nay",
      code: "WEDDING_DAY",
      title: "Về Chung Một Nhà",
      desc: "Hôm nay, chúng mình không còn đếm ngày gặp lại. Từ những tin nhắn xuyên đêm, những chuyến bay trở về, những hành trình đã đi cùng nhau - tất cả dẫn chúng mình đến khoảnh khắc này: nắm tay nhau, chính thức gọi nhau là gia đình.",
    },
  ],
  weddingParty: [
    {
      name: "Phạm Văn A",
      role: "Phù rể chính",
      duty: "Đồng hành cùng chú rể, hỗ trợ đón khách và giữ không khí buổi tiệc thật vui vẻ.",
      emoji: "🤵",
    },
    {
      name: "Nguyễn Thị B",
      role: "Phù dâu chính",
      duty: "Luôn bên cạnh cô dâu, hỗ trợ chuẩn bị trang phục, nghi thức và những khoảnh khắc quan trọng.",
      emoji: "👰",
    },
    {
      name: "Trần Văn C",
      role: "Người hỗ trợ tiệc cưới",
      duty: "Giúp kết nối khách mời, hỗ trợ hậu cần và cùng gia đình chăm chút cho ngày vui trọn vẹn.",
      emoji: "🤵",
    },
  ],
  gifts: [
    {
      title: "Mừng cưới chú rể",
      bank: "VIETCOMBANK",
      name: COUPLE_INFO.groomGiftName,
      bankId: "VCB",
      accountNumber: "1012880445",
      accountName: COUPLE_INFO.groomFullName,
      transferNote: TRANSFER_NOTE,
    },
    {
      title: "Mừng cưới cô dâu",
      bank: "VIB",
      name: COUPLE_INFO.brideGiftName,
      bankId: "VIB",
      accountNumber: "1012880445",
      accountName: COUPLE_INFO.brideFullName,
      transferNote: TRANSFER_NOTE,
    },
  ],
  faq: [
    {
      question: "Trang phục tham dự như thế nào?",
      answer:
        "Kính mong quý vị lựa chọn trang phục lịch sự, áo dài truyền thống được hoan nghênh. Vui lòng tránh màu trắng để dành sự nổi bật cho cô dâu.",
    },
    {
      question: "Hạn xác nhận tham dự là khi nào?",
      answer: `Kính mong quý vị xác nhận tham dự trước ngày ${EVENT_TIMES.rsvpDeadlineAt} để gia đình chúng tôi có thể chuẩn bị chu đáo.`,
    },
  ] satisfies FAQItem[],
  travel: [
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
  ] satisfies TravelItem[],
  media: {
    heroImage: {
      src: "/images/hero/HAR01404.jpg",
      alt: "Ảnh cặp đôi - Hero background",
    },
  },
  calendar: {
    ctaLabel: "Thêm vào lịch",
  },
  rsvp: {
    source: "wedding_site",
    sourceLabel: "Website thiệp cưới",
    sheetName: "RSVP",
    sheetColumns: [
      "submitted_at",
      "guest_name",
      "attendance_status",
      "attendee_count",
      "guest_message",
      "source",
    ],
    attendanceStatuses: {
      attending: "Tham dự",
      not_attending: "Không tham dự",
      maybe: "Chưa chắc chắn",
    } satisfies Record<AttendanceStatus, string>,
    labels: {
      honeypot: "Website",
      guestName: "Tên khách mời",
      attendanceStatus: "Trạng thái tham dự",
      attendeeCount: "Số lượng khách tham dự",
      guestMessage: "Lời chúc gửi đến Hoàng Hiếu & Kim Liên",
      submit: "Xác Nhận Tham Dự",
      submitting: "Đang Gửi...",
    },
    placeholders: {
      guestName: "Ví dụ: Nguyễn Văn A",
      guestMessage: "Kính chúc hai bạn trăm năm hạnh phúc...",
    },
    validation: {
      minNameLength: 2,
      maxNameLength: 80,
      maxAttendeeCount: 10,
      maxMessageLength: 500,
    },
    errors: {
      invalidSubmission: "Invalid submission.",
      invalidRequestBody: "Invalid request body.",
      checkFields: "Please check the highlighted fields.",
      guestName: "Please enter a name between 2 and 80 characters.",
      attendanceStatus: "Please choose a valid attendance status.",
      attendeeCount: "Please choose a guest count between 0 and 10.",
      guestMessage: "Please keep your message under 500 characters.",
      submitFailed:
        "Chưa gửi được xác nhận. Vui lòng thử lại sau hoặc liên hệ gia đình.",
      serverSubmitFailed: "Unable to submit RSVP right now.",
    },
  },
} as const;

export const COUPLE = EVENT_DATA.couple;
export const EVENT_CONFIG = {
  weddingDateISO: EVENT_START_ISO,
  weddingEndISO: EVENT_END_ISO,
  validFromISO: VALID_FROM_ISO,
};
export const COUPLE_NAMES = EVENT_DATA.couple.combinedName;
export const WEDDING_DATE_ISO = EVENT_START_ISO;
export const RSVP_DEADLINE_ISO = RSVP_DEADLINE_ISO_VALUE;
export const VENUE_GROOM = EVENT_DATA.venues.groom;
export const VENUE_BRIDE = EVENT_DATA.venues.bride;
export const SCHEDULE_ITEMS: ScheduleItem[] = [...EVENT_DATA.schedule];
export const FAQ_DATA: FAQItem[] = [...EVENT_DATA.faq];
export const CALENDAR_EVENT = {
  title: `${EVENT_DATA.event.title} ${EVENT_DATA.couple.combinedName}`,
  location: `${VENUE_GROOM.venueName}, ${VENUE_GROOM.addressLines.join(", ")}`,
  startTime: EVENT_START_ISO,
  endTime: EVENT_END_ISO,
  description: EVENT_DATA.event.description,
  ctaLabel: EVENT_DATA.calendar.ctaLabel,
};
export const TRAVEL_GUIDANCE: TravelItem[] = [...EVENT_DATA.travel];
export const HERO_IMAGE = EVENT_DATA.media.heroImage;
