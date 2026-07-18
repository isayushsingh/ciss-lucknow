import ServicesPage from "../../components/ServicesPage";
import { SITE_URL } from "../layout";

export const metadata = {
  title: "All Security Services",
  description:
    "The full range of guarding services CISS Lucknow deploys across Lucknow, Kanpur, Unnao and Gautam Buddha Nagar — industrial, corporate, residential, bank, hotel, school, event and more.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/services`,
    title: "All Security Services | CISS Lucknow",
    description:
      "The full range of guarding services CISS Lucknow deploys across Lucknow, Kanpur, Unnao and Gautam Buddha Nagar.",
    images: [{ url: "/images/logo.png", width: 518, height: 240, alt: "CISS Lucknow logo" }],
  },
};

export default function Page() {
  return <ServicesPage />;
}
