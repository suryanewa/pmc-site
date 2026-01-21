export default function PeopleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        /* Hide root navbar on people page */
        body > nav:first-of-type {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  );
}
