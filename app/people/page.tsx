import { redirect } from 'next/navigation';

export default function TeamIndexPage() {
  // Make /people route point to the E-Board subpage
  redirect('/people/e-board');
}
