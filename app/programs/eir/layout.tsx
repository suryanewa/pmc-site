import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EIR",
  description:
    "Entrepreneurs In Residence — PMC’s accelerator for NYU founders: tailored workshops, mentorship, and VC networking.",
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
