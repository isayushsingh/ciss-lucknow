import "./globals.css";

// ⚠️ Change this to your real domain once you have one (e.g. https://cisslucknow.com)
export const SITE_URL = "https://ciss-lucknow.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Security Guards in Lucknow | CISS — Civil & Industrial Security Services",
    template: "%s | CISS Lucknow",
  },
  description:
    "Hire trained, PSARA-licensed security guards, bouncers and 24×7 security services in Lucknow. Industrial, corporate, residential, event and bank security. Founded by a retired IPS officer. Free site assessment.",
  keywords: [
    "security guards in Lucknow",
    "security agency Lucknow",
    "security services Lucknow",
    "bouncers in Lucknow",
    "security guard company Lucknow",
    "industrial security Lucknow",
    "event security Lucknow",
    "PSARA licensed security agency",
    "women security guards Lucknow",
    "bank security guards Lucknow",
    "CISS Lucknow",
  ],
  authors: [{ name: "CISS Lucknow" }],
  creator: "CISS Lucknow",
  publisher: "CISS Lucknow",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "CISS Lucknow",
    title: "Security Guards in Lucknow | CISS — Civil & Industrial Security Services",
    description:
      "Trained, vetted, PSARA-licensed security guards and 24×7 protection for businesses, events and homes across Lucknow. Free site assessment.",
    images: [{ url: "/images/logo.png", width: 518, height: 240, alt: "CISS Lucknow logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Guards in Lucknow | CISS Lucknow",
    description:
      "Trained, vetted, PSARA-licensed security guards and 24×7 protection across Lucknow.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
  category: "Security Services",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f2038",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
