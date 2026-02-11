'use client';

import { motion, animate, useMotionValue, useTransform, AnimatePresence, useReducedMotion } from 'motion/react';
import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from './Button';
import { TextAnimate } from '@/components/ui/text-animate';
import { useIsMobile } from '../../hooks/use-is-mobile';

const HeroScene = dynamic(
  () => import('./HeroScene').then((mod) => ({ default: mod.HeroScene })),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
  }
);

const HeroWarpCanvas = dynamic(
  () => import('./HeroWarpCanvas').then((m) => ({ default: m.HeroWarpCanvas })),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 z-0" />,
  }
);

function AnimatedStat({
  number,
  label,
  active,
  onComplete,
}: {
  number: string;
  label: string;
  active: boolean;
  onComplete: () => void;
}) {
  const [showLabel, setShowLabel] = useState(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = isMobile || prefersReducedMotion;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

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
      },
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

export function HomeHeroSection() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceHeroMotion = isMobile || prefersReducedMotion;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--scroll-background', '#000000');

    return () => {
      root.style.setProperty('--scroll-background', '#000000');
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 bg-black py-16 md:py-24 relative overflow-visible">
      <HeroWarpCanvas />
      <div className="w-full max-w-[1400px] mx-auto relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="max-w-[800px] text-left relative z-20">
          <motion.p
            className="text-xs uppercase tracking-[0.2em] text-[#DBDBDB]/50 mb-6"
            initial={shouldReduceHeroMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceHeroMotion ? 0 : 0.8 }}
          >

          </motion.p>

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

          <motion.p
            className="text-xl md:text-2xl text-[#DBDBDB]/75 leading-[1.6] mb-10"
            initial={shouldReduceHeroMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceHeroMotion ? 0 : 0.6, delay: shouldReduceHeroMotion ? 0 : 0.2 }}
          >
            NYU&apos;s fastest-growing club empowering students to succeed as product managers in any industry
          </motion.p>

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
                href="/people/e-board"
                borderColor="#5076DD"
                textColor="#FFFFFF"
                className="px-8 py-4"
                animated={false}
              >
                Coffee Chat
              </Button>
              <a
                href="https://linktr.us17.list-manage.com/subscribe?u=245830e19ea7d43db4cf58081&id=6bd6c94c01"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-white after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Join Our Newsletter
              </a>
            </div>
          </motion.div>
        </div>

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
  );
}
