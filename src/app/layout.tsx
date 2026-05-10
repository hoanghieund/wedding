import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wedding.hoho-kimlien.com"),
  title: {
    default: "Thiệp mời lễ thành hôn – Hoàng Hiếu & Kim Liên",
    template: "%s | Đám cưới",
  },
  description:
    "Trân trọng kính mời quý vị tham dự lễ thành hôn. Xem chi tiết, lịch trình, địa điểm và xác nhận tham dự.",
  keywords: ["đám cưới", "thiệp mời", "Hoàng Hiếu", "Kim Liên", "Ninh Bình"],
  authors: [{ name: "Hoàng Hiếu & Kim Liên" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://wedding.hoho-kimlien.com",
    siteName: "Đám cưới Hoàng Hiếu & Kim Liên",
    title: "Thiệp mời lễ thành hôn",
    description:
      "Xem chi tiết lễ thành hôn của Hoàng Hiếu & Kim Liên – ngày 25/12/2026, Ninh Bình.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Thiệp mời đám cưới Hoàng Hiếu & Kim Liên",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiệp mời lễ thành hôn",
    description:
      "Xem chi tiết lễ thành hôn của Hoàng Hiếu & Kim Liên – ngày 25/12/2026, Ninh Bình.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "https://wedding.hoho-kimlien.com/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] font-sans text-[var(--text-primary)]">{children}</body>
    </html>
  );
}
