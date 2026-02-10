'use client';

import { motion, useInView, animate, useMotionValue, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from './components/Button';
import { JoinUsSection } from './components/JoinUsSection';
import { FAQSection } from './components/FAQSection';
import { FadeUp } from './components/ScrollAnimations';
import { HeroWarpCanvas } from './components/HeroWarpCanvas';
import { LogoCloudAnimated } from "@/components/smoothui/logo-cloud-1";
import { TextAnimate } from '@/components/ui/text-animate';
import { useIsMobile } from '../hooks/use-is-mobile';

declare global {
  interface Window {
    UnicornStudio?: {
      init?: () => void;
      isInitialized?: boolean;
    };
  }
}

const HeroScene = dynamic(
  () => import('./components/HeroScene').then((mod) => ({ default: mod.HeroScene })),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
  }
);

// Programs data
const programs = [
  {
    id: 'product-team',
    title: 'Product Team',
    description: '',
    color: '#5076DD',
    href: '/programs/product-team',
  },
  {
    id: 'mentorship',
    title: 'Mentorship',
    description: '',
    color: '#6966E3',
    href: '/programs/mentorship',
  },
  {
    id: 'grad-bootcamp',
    title: 'Grad Bootcamp',
    description: '',
    color: '#41C9C1',
    href: '/programs/grad-bootcamp',
  },
];

// Animated counter component
function AnimatedStat({ 
  number, 
  label, 
  active, 
  onComplete 
}: { 
  number: string; 
  label: string; 
  active: boolean; 
  onComplete: () => void 
}) {
  const [showLabel, setShowLabel] = useState(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = isMobile || prefersReducedMotion;
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));
  
  const numericValue = parseInt(number.replace(/\D/g, ''));
  const suffix = number.replace(/\d/g, '');

  useEffect(() => {
    if (!active) return;

    if (shouldReduceMotion) {
      count.set(numericValue);
      const rafId = requestAnimationFrame(() => setShowLabel(true));
      return () => cancelAnimationFrame(rafId);
    }

    const controls = animate(count, numericValue, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        setShowLabel(true);
      }
    });

    return () => {
      controls.stop();
    };
  }, [active, numericValue, count, shouldReduceMotion]);

  return (
    <div className="flex flex-col">
      <motion.div 
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
        className="text-4xl md:text-5xl font-medium text-[#DBDBDB] tracking-tight"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
      >
        {shouldReduceMotion ? (
          <>
            <span>{number}</span>
          </>
        ) : (
          <>
            <motion.span>{rounded}</motion.span>
            <span>{suffix}</span>
          </>
        )}
      </motion.div>
      <div className="min-h-[1.5rem]">
        <AnimatePresence>
          {showLabel && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={onComplete}
              className="text-sm text-[#DBDBDB]/60 mt-1"
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Home() {
  const programsTopRef = useRef<HTMLDivElement | null>(null);
  const themeTransition = "transition-colors duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]";
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceHeroMotion = isMobile || prefersReducedMotion;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--scroll-background",
      "#000000"
    );

    return () => {
      root.style.setProperty("--scroll-background", "#000000");
    };
  }, []);

  useEffect(() => {
    const initUnicorn = () => {
      if (window.UnicornStudio?.init) {
        window.UnicornStudio.init();
      }
    };

    initUnicorn();

    const timer = setTimeout(initUnicorn, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative">
      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 bg-black py-16 md:py-24 relative overflow-visible">
          <HeroWarpCanvas />
          <div className="w-full max-w-[1400px] mx-auto relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="max-w-[800px] text-left relative z-20">
              {/* Subtle label */}
              <motion.p
                className="text-xs uppercase tracking-[0.2em] text-[#DBDBDB]/50 mb-6"
                initial={shouldReduceHeroMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: shouldReduceHeroMotion ? 0 : 0.8 }}
              >
                
              </motion.p>

              {/* Main Headline */}
              <h1 className="section-title text-[#DBDBDB] mb-6 tracking-[-0.03em]">
                <TextAnimate
                  as="span"
                  animation="slideLeft"
                  by="character"
                  className="block whitespace-nowrap"
                >
                  Building the product
                </TextAnimate>
                <TextAnimate
                  as="span"
                  animation="slideLeft"
                  by="character"
                  delay={0.35}
                  className="block"
                >
                  leaders of tomorrow.
                </TextAnimate>
              </h1>

              {/* Description */}
              <motion.p
                className="text-xl md:text-2xl text-[#DBDBDB]/75 leading-[1.6] mb-10"
                initial={shouldReduceHeroMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceHeroMotion ? 0 : 0.6, delay: shouldReduceHeroMotion ? 0 : 0.2 }}
              >
                NYU's fastest-growing club empowering students to succeed as product managers in any industry
              </motion.p>

              {/* Two CTAs */}
              <motion.div
                initial={shouldReduceHeroMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceHeroMotion ? 0 : 0.6, delay: shouldReduceHeroMotion ? 0 : 0.3 }}
              >
                <div className="flex flex-wrap items-center gap-8">
                  <Button
                    href="#programs"
                    className="px-8 py-4"
                  >
                    Explore Programs
                  </Button>
                  <Button
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdcQw779OxVgmhXaUkwDBqMBkfnJU6Dwms5m6tss6jD7ZGVPA/viewform"
                    borderColor="#5076DD"
                    textColor="#FFFFFF"
                    className="px-8 py-4"
                    animated={false}
                  >
                    Coffee Chat
                  </Button>
                  <Link
                    href="#join-us"
                    className="relative text-white after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    Join Our Newsletter
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* 3D Mac */}
            <div
              className="relative z-0 hidden md:block w-full aspect-[16/10] justify-self-end overflow-visible"
              data-gsap="parallax"
              data-speed="0.08"
            >
              <Suspense fallback={<div className="w-full h-full" />}>
                <HeroScene />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="bg-black text-[#DBDBDB]">
          <LogoCloudAnimated
            title="Featured Speakers"
            description=""
            logos={[
              { name: "Hinge", src: "/companies/hinge-logo.svg", url: "https://hinge.co", className: "brightness-0 invert opacity-80" },
              { name: "Adobe", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/adobe.svg", url: "https://adobe.com", className: "brightness-0 invert opacity-80" },
              { name: "Goldman Sachs", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/goldmansachs.svg", url: "https://goldmansachs.com", className: "brightness-0 invert opacity-80" },
              { name: "Google", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/google.svg", url: "https://google.com", className: "brightness-0 invert opacity-80" },
              { name: "Discord", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/discord.svg", url: "https://discord.com", className: "brightness-0 invert opacity-80" },
              { name: "IBM", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ibm.svg", url: "https://ibm.com", className: "brightness-0 invert opacity-80" },
              { name: "JP Morgan", src: "/companies/chase-logo.svg", url: "https://jpmorganchase.com", className: "brightness-0 invert opacity-80" },
              { name: "LinkedIn", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg", url: "https://linkedin.com", className: "brightness-0 invert opacity-80" },
              { name: "NBC Universal", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nbc.svg", url: "https://nbcuniversal.com", className: "brightness-0 invert opacity-80" },
              { name: "Spotify", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/spotify.svg", url: "https://spotify.com", className: "brightness-0 invert opacity-80" },
              { name: "Meta", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/meta.svg", url: "https://meta.com", className: "brightness-0 invert opacity-80" },
              { name: "Mastercard", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/mastercard.svg", url: "https://mastercard.com", className: "brightness-0 invert opacity-80" },
              { name: "Oracle", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/oracle.svg", url: "https://oracle.com", className: "brightness-0 invert opacity-80" },
              { name: "Warner Bros", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/warnerbros.svg", url: "https://warnerbros.com", className: "brightness-0 invert opacity-80" },
              { name: "SeatGeek", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/seatgeek.svg", url: "https://seatgeek.com", className: "brightness-0 invert opacity-80" },
              { name: "Epic Games", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/epicgames.svg", url: "https://epicgames.com", className: "brightness-0 invert opacity-80" },
              { name: "Microsoft", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoft.svg", url: "https://microsoft.com", className: "brightness-0 invert opacity-80" },
              { name: "American Express", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/americanexpress.svg", url: "https://americanexpress.com", className: "brightness-0 invert opacity-80" },
            ]}
          />
        </section>

        {/* Programs Section */}
        <section
          id="programs"
          className={`relative overflow-visible py-32 px-6 md:px-16 lg:px-24 ${themeTransition} text-[#DBDBDB]`}
        >
          <div
            ref={programsTopRef}
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            aria-hidden="true"
          />
          <div className="max-w-[1400px] mx-auto">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-20">
              <FadeUp>
                <TextAnimate
                  as="h2"
                  animation="slideLeft"
                  by="character"
                  className={`section-title whitespace-nowrap ${themeTransition} text-[#DBDBDB]`}
                >
                  Programs
                </TextAnimate>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p
                  className={`text-lg leading-relaxed mt-4 max-w-2xl ${themeTransition} text-[#DBDBDB]/70`}
                >
                  Get hands on with our programs and build practical skills through unforgettable experiences. Find your fit below!
                </p>
              </FadeUp>
            </div>

            {/* Programs Cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 overflow-visible">
              {programs.map((program, index) => (
                <FadeUp key={program.id} delay={0.1 * index} className="h-full">
                  <div className="relative h-full min-h-[320px] rounded-2xl bg-[#1E1E1E]/80 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.18)] overflow-hidden">
                    <div
                      data-us-project={
                        program.id === 'investing'
                          ? 'M5cRPBWulgAdSjCuFemf'
                          : program.id === 'eir'
                            ? 'NEJJOUcoL3C4e87FYFaQ'
                            : 'xG650J1WpXyfilT1Q6Bp'
                      }
                      className="absolute z-0"
                      style={{
                        width: 1440,
                        height: 900,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%) scale(0.8)',
                      }}
                    />
                    <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                      <h3
                        className="text-3xl font-medium tracking-[-0.02em]"
                        style={{ fontFamily: 'var(--font-gotham-medium)', color: '#DBDBDB' }}
                      >
                        {program.title}
                      </h3>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - /join-us */}
        <JoinUsSection />

        {/* FAQ Section */}
        <FAQSection />
      </main>
    </div>
  );
}
