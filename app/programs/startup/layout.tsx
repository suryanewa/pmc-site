export default function StartupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        /* Hide root navbar and footer on startup page */
        body > nav:first-of-type,
        body > footer {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  );
}
