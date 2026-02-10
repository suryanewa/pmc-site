import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "PMC events at NYU Stern.",
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
