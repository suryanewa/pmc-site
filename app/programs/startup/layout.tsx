import { Navbar } from '../../components/Navbar';

export default function StartupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        /* Hide root navbar on startup page - we use our own */
        body > nav:first-of-type {
          display: none !important;
        }
      `}</style>
      <Navbar variant="dark" logoSuffix="startup" logoSuffixColor="#AD1DE0" />
      {children}
    </>
  );
}
