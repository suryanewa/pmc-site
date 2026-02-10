import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the team behind PMC at NYU Stern.",
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
