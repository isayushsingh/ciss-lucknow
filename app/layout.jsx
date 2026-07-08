import "./globals.css";

export const metadata = {
  title: "CISS Lucknow — Civil & Industrial Security Services",
  description:
    "Trained, vetted security guards, bouncers, and 24×7 protection for businesses, events, and homes across Lucknow.",
  icons: { icon: "/images/logo.png" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
