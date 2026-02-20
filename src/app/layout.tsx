import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const metadataBase =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.length > 0
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL("https://pngwn.app");

export const metadata: Metadata = {
  metadataBase,
  title: "pngwn | Personalized weather omniscience.",
  description:
    "pngwn is a personalized weather companion that learns what to wear from your real trips.",
  openGraph: {
    title: "pngwn",
    description: "Personalized weather omniscience.",
    url: "/",
    siteName: "pngwn",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "pngwn",
    description: "What to wear, learned from you.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="en">
      <body className="antialiased">
        {children}

        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        ) : null}

        <Analytics />
      </body>
    </html>
  );
}