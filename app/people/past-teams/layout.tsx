import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Past Teams",
  description: "Events, retreats, workshops, and the people who make PMC what it is.",
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

