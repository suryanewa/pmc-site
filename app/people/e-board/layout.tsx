import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "E-Board",
  description: "PMC leadership team at NYU Stern.",
};

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

