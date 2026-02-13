import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/pmc-logo.svg"
        alt="PMC logo"
        width={30}
        height={14}
        sizes="30px"
        className="h-6 w-auto"
      />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-black border-t border-[#3F3F3F]/60 relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-16">
        <div className="grid gap-12 md:grid-cols-6">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="inline-flex items-center hover:opacity-70 transition-opacity duration-300">
              <Logo />
            </Link>
            <p className="text-sm leading-relaxed text-[#DBDBDB]/60 max-w-none">
              NYU&apos;s fastest-growing club empowering students to succeed as Product Managers in any industry.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.15em] uppercase text-[#DBDBDB]/50">Events</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Speakers', href: '/events/speakers' },
                { label: 'Office Visits', href: '/events/office-visits' },
                { label: 'Case Comp', href: '/events/case-comp' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#DBDBDB]/70 hover:text-[#DBDBDB] hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.15em] uppercase text-[#DBDBDB]/50">Programs</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Product Team', href: '/programs/product-team' },
                { label: 'Mentorship', href: '/programs/mentorship' },
                { label: 'Grad Bootcamp', href: '/programs/grad-bootcamp' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#DBDBDB]/70 hover:text-[#DBDBDB] hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.15em] uppercase text-[#DBDBDB]/50">Team</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'E-Board', href: '/people/e-board' },
                { label: 'Leads', href: '/people/leads' },
                { label: 'Past Teams', href: '/people/past-teams' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#DBDBDB]/70 hover:text-[#DBDBDB] hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.15em] uppercase text-[#DBDBDB]/50">Connect</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:pmc@nyu.edu"
                  className="text-[#DBDBDB]/70 hover:text-[#DBDBDB] hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Email
                </a>
              </li>
              <li>
                <Link
                  href="/people/e-board"
                  className="text-[#DBDBDB]/70 hover:text-[#DBDBDB] hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Coffee Chat
                </Link>
              </li>
              <li>
                <Link
                  href="/#join-us"
                  className="text-[#DBDBDB]/70 hover:text-[#DBDBDB] hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-[#3F3F3F]/60 my-10" />

        <div className="text-center text-xs text-[#DBDBDB]/40">
          &copy; 2026 Product Management Club
        </div>
      </div>
    </footer>
  );
}
