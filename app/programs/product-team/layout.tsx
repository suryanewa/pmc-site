import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Team",
  description:
    "PMC Product Team — a 10-week hands-on program to experience the full product management lifecycle, from ideation to production specifications.",
};

export default function StartupLayout({
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
