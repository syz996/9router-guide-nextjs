import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "9Router Guide — Setup, Integrations & Troubleshooting", template: "%s | 9Router Guide" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "9Router Guide",
    description: site.description,
    url: site.url,
    siteName: site.name
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
