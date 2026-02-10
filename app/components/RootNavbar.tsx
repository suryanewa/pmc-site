 "use client";
 
 import { usePathname } from "next/navigation";
 
import { Navbar } from "./Navbar";

const LIGHT_BLUE = "#41C9C1";
const PROGRAMS = [
  { slug: "product-team", color: "#5076DD" },
  { slug: "mentorship", color: "#6966E3" },
  { slug: "grad-bootcamp", color: "#41C9C1" },
];
const PEOPLE_ROUTES = ["leadership", "teams", "community"] as const;
const PEOPLE_LABELS: Record<(typeof PEOPLE_ROUTES)[number], string> = {
  leadership: "e-board",
  teams: "leads",
  community: "past-teams",
};
 
 export function RootNavbar() {
   const pathname = usePathname();
 
  const peopleMatch = PEOPLE_ROUTES.find((slug) => pathname.startsWith(`/people/${slug}`));
  const programMatch = PROGRAMS.find((item) => pathname.startsWith(`/programs/${item.slug}`));

  if (programMatch) {
    return (
      <Navbar
        variant="dark"
        logoSuffix={programMatch.slug}
        logoSuffixColor={programMatch.color}
      />
    );
  }

  if (peopleMatch) {
    return <Navbar variant="light" logoSuffix={PEOPLE_LABELS[peopleMatch]} logoSuffixColor={LIGHT_BLUE} />;
  }

  if (pathname.startsWith("/people")) {
    return <Navbar variant="light" logoSuffixColor={LIGHT_BLUE} />;
  }
 
   return <Navbar />;
 }
