import { Navbar } from '../../components/Navbar';

export default function InvestingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        /* Hide root navbar on investing page - we use our own */
        body > nav:first-of-type {
          display: none !important;
        }
      `}</style>
      <Navbar variant="dark" logoSuffix="investing" logoSuffixColor="#2DB67D" />
      {children}
    </>
  );
}
