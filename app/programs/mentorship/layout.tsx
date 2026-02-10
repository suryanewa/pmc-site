import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentorship",
  description:
    "PMC Mentorship Program — one-on-one guidance from experienced PMs across two tracks: Intro and Advanced.",
};

export default function InvestingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
