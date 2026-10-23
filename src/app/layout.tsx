import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "9Router Guide — Setup, Integrations & Troubleshooting", template: "%s | 9Router Guide" },
  description: site.description,
  icons: { icon: "/icon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "9Router Guide",
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "9Router Guide", type: "image/jpeg" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "9Router Guide — Setup, Integrations & Troubleshooting",
    description: site.description,
    images: ["/og-image.jpg"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
