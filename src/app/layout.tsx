import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { EVENT_DATA } from "@/lib/constants/event-data";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-serif",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-serif",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin", "vietnamese"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(EVENT_DATA.site.baseUrl),
  title: {
    default: EVENT_DATA.site.title,
    template: EVENT_DATA.site.titleTemplate,
  },
  description: EVENT_DATA.site.description,
  keywords: [...EVENT_DATA.site.keywords],
  authors: [{ name: EVENT_DATA.couple.combinedName }],
  openGraph: {
    type: "website",
    locale: EVENT_DATA.site.locale,
    url: EVENT_DATA.site.baseUrl,
    siteName: EVENT_DATA.site.siteName,
    title: EVENT_DATA.site.title,
    description: EVENT_DATA.site.shareDescription,
    images: [
      {
        url: EVENT_DATA.site.ogImage.url,
        width: EVENT_DATA.site.ogImage.width,
        height: EVENT_DATA.site.ogImage.height,
        alt: EVENT_DATA.site.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: EVENT_DATA.site.title,
    description: EVENT_DATA.site.shareDescription,
    images: [EVENT_DATA.site.ogImage.url],
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
  alternates: { canonical: `${EVENT_DATA.site.baseUrl}/` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={EVENT_DATA.site.language}
      className={`h-full antialiased ${playfairDisplay.variable} ${cormorantGaramond.variable} ${greatVibes.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] font-sans text-[var(--text-primary)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:inset-x-0 focus:top-0 focus:z-[9999] focus:block focus:w-auto focus:bg-[var(--accent)] focus:px-6 focus:py-3 focus:text-center focus:text-sm focus:text-[var(--bg)]"
        >
          Chuyển đến nội dung chính
        </a>
        {children}
      </body>
    </html>
  );
}
