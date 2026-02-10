import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup",
  description:
    "PMC Startup Team — a 9-week accelerator for idea validation, building, and distribution & growth.",
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
