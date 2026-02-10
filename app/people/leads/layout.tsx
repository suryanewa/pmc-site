import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Leads",
  description: "Explore PMC teams by year and semester.",
};

export default function TeamsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

