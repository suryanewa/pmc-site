import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-url";
import { Footer } from "./components/Footer";
import { RootNavbar } from "./components/RootNavbar";
import { Preloader } from "./components/Preloader";
import { SmoothScroll } from "./components/SmoothScroll";
import { ScrollBackground } from "./components/ScrollBackground";
import { GsapScrollEffects } from "./components/GsapScrollEffects";
import { Providers } from "./components/Providers";
import { PageTransition } from "./components/PageTransition";

const gothamMedium = localFont({
  src: "../public/fonts/Gotham Medium.otf",
  variable: "--font-gotham-medium",
  weight: "500",
});

const gothamBold = localFont({
  src: "../public/fonts/Gotham Bold.otf",
  variable: "--font-gotham-bold",
  weight: "700",
});

const siteUrl = getSiteUrl();
const siteTitle = "PMC | NYU Stern's Premier Entrepreneurship Club";
const siteDescription =
  "Where NYU's Founders & Investors Are Made. Established in 2003, PMC is NYU Stern's premier entrepreneurship club.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteTitle,
    template: "%s | PMC",
  },
  description: siteDescription,
  applicationName: "PMC",
  icons: {
    icon: "/pmc-logo.svg",
    shortcut: "/pmc-logo.svg",
    apple: "/pmc-logo.svg",
  },
  openGraph: {
    type: "website",
    siteName: "PMC",
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${gothamMedium.variable} ${gothamBold.variable} ${GeistSans.className} antialiased`}>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-[#3F3F3F] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#DBDBDB] focus:shadow"
          >
            Skip to content
          </a>
          <Preloader />
          <SmoothScroll>
            <ScrollBackground />
            <GsapScrollEffects />
            <RootNavbar />
            <PageTransition>
              <main id="main">{children}</main>
            </PageTransition>
            <Footer />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
