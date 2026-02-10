import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investing",
  description:
    "PMC Investing Team — learn how investors evaluate startups through deep dives, debates, and deal mechanics.",
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
