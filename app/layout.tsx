import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Preloader } from "./components/Preloader";
import { SmoothScroll } from "./components/SmoothScroll";
import { ScrollBackground } from "./components/ScrollBackground";
import { GsapScrollEffects } from "./components/GsapScrollEffects";

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

export const metadata: Metadata = {
  title: "EEG | NYU Stern's Premier Entrepreneurship Club",
  description: "Where NYU's Founders & Investors Are Made. Established in 2003, EEG is NYU Stern's premier entrepreneurship club.",
  icons: {
    icon: "/eeg-logo.svg",
    shortcut: "/eeg-logo.svg",
    apple: "/eeg-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${gothamMedium.variable} ${gothamBold.variable} ${GeistSans.className} antialiased`}>
        <Preloader />
        <SmoothScroll>
          <ScrollBackground />
          <GsapScrollEffects />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
