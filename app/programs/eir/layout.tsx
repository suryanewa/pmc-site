import { Navbar } from '../../components/Navbar';

export default function EirLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        /* Hide root navbar on eir page - we use our own */
        body > nav:first-of-type {
          display: none !important;
        }
      `}</style>
      <Navbar variant="dark" logoSuffix="eir" logoSuffixColor="#F0C75B" />
      {children}
    </>
  );
}
