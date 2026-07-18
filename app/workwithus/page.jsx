import WorkWithUsPage from "../../components/WorkWithUsPage";
import { SITE_URL } from "../layout";

export const metadata = {
  title: "Work With Us",
  description:
    "Open security guard, supervisor and bouncer roles at CISS Lucknow across Lucknow, Kanpur, Unnao and Gautam Buddha Nagar. Apply today.",
  alternates: { canonical: "/workwithus" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/workwithus`,
    title: "Work With Us | CISS Lucknow",
    description:
      "Open security guard, supervisor and bouncer roles at CISS Lucknow across Lucknow, Kanpur, Unnao and Gautam Buddha Nagar.",
    images: [{ url: "/images/logo.png", width: 518, height: 240, alt: "CISS Lucknow logo" }],
  },
};

export default function Page() {
  return <WorkWithUsPage />;
}
