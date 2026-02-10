import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graduate PM Bootcamp",
  description:
    "PMC Graduate PM Bootcamp — a 10-day intensive program for NYU graduate students to experience the full product management lifecycle.",
};

export default function EirLayout({
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
