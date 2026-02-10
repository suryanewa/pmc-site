import dynamic from 'next/dynamic';
import { HomeHeroSection } from './components/HomeHeroSection';
import { HomeProgramsSection } from './components/HomeProgramsSection';
import { JoinUsSection } from './components/JoinUsSection';
import { FAQSection } from './components/FAQSection';

const LogoCloudAnimated = dynamic(
  () => import('@/components/smoothui/logo-cloud-1').then((m) => ({ default: m.LogoCloudAnimated }))
);

const logos = [
  { name: 'Hinge', src: '/companies/hinge-logo.svg', url: 'https://hinge.co', className: 'brightness-0 invert opacity-80' },
  { name: 'Adobe', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/adobe.svg', url: 'https://adobe.com', className: 'brightness-0 invert opacity-80' },
  { name: 'Goldman Sachs', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/goldmansachs.svg', url: 'https://goldmansachs.com', className: 'brightness-0 invert opacity-80' },
  { name: 'Google', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/google.svg', url: 'https://google.com', className: 'brightness-0 invert opacity-80' },
  { name: 'Discord', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/discord.svg', url: 'https://discord.com', className: 'brightness-0 invert opacity-80' },
  { name: 'IBM', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ibm.svg', url: 'https://ibm.com', className: 'brightness-0 invert opacity-80' },
  { name: 'JP Morgan', src: '/companies/chase-logo.svg', url: 'https://jpmorganchase.com', className: 'brightness-0 invert opacity-80' },
  { name: 'LinkedIn', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg', url: 'https://linkedin.com', className: 'brightness-0 invert opacity-80' },
  { name: 'NBC Universal', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nbc.svg', url: 'https://nbcuniversal.com', className: 'brightness-0 invert opacity-80' },
  { name: 'Spotify', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/spotify.svg', url: 'https://spotify.com', className: 'brightness-0 invert opacity-80' },
  { name: 'Meta', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/meta.svg', url: 'https://meta.com', className: 'brightness-0 invert opacity-80' },
  { name: 'Mastercard', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/mastercard.svg', url: 'https://mastercard.com', className: 'brightness-0 invert opacity-80' },
  { name: 'Oracle', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/oracle.svg', url: 'https://oracle.com', className: 'brightness-0 invert opacity-80' },
  { name: 'Warner Bros', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/warnerbros.svg', url: 'https://warnerbros.com', className: 'brightness-0 invert opacity-80' },
  { name: 'SeatGeek', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/seatgeek.svg', url: 'https://seatgeek.com', className: 'brightness-0 invert opacity-80' },
  { name: 'Epic Games', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/epicgames.svg', url: 'https://epicgames.com', className: 'brightness-0 invert opacity-80' },
  { name: 'Microsoft', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoft.svg', url: 'https://microsoft.com', className: 'brightness-0 invert opacity-80' },
  { name: 'American Express', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/americanexpress.svg', url: 'https://americanexpress.com', className: 'brightness-0 invert opacity-80' },
];

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <main>
        <HomeHeroSection />
        <section className="bg-black text-[#DBDBDB]">
          <LogoCloudAnimated title="Featured Speakers" description="" logos={logos} />
        </section>
        <HomeProgramsSection />
        <JoinUsSection />
        <FAQSection />
      </main>
    </div>
  );
}
