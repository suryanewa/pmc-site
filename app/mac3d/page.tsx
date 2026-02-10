'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useIsMobile } from '../../hooks/use-is-mobile';

// Dynamic import for Three.js scene to avoid SSR issues
const HeroScene = dynamic(() => import('../components/HeroScene').then(mod => ({ default: mod.HeroScene })), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />
});

export default function Mac3DPage() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = isMobile || prefersReducedMotion;

  return (
    <div className="min-h-screen relative">
      {/* Hero Section - Static layout with Mac on right, text on left */}
      <section className="min-h-screen relative bg-black">
        {isMobile ? (
          <div className="relative flex min-h-screen flex-col items-start justify-center gap-8 px-6 py-20">
            <div className="relative h-[220px] w-full overflow-hidden rounded-2xl bg-[#3F3F3F]/30">
              <Image
                src="/background-no-overlay.png"
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            <div className="text-left max-w-lg">
              <div className="mb-6">
                {["Where NYU's", 'Founders & Investors', 'Are Made'].map((line, lineIndex) => (
                    <h1
                    key={lineIndex}
                    className="section-title text-[#DBDBDB] text-center"
                  >
                    {line}
                  </h1>
                ))}
              </div>
              <p className="text-base md:text-lg text-[#DBDBDB]/60 leading-relaxed max-w-md">
                NYU Stern&apos;s premier entrepreneurship club since 2003
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* 3D Mac Scene - Right half */}
            <motion.div
              className="absolute inset-0"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            >
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-[#3F3F3F]/60 border-t-[#41C9C1] rounded-full animate-spin" />
                  </div>
                }
              >
                <HeroScene />
              </Suspense>
            </motion.div>

            {/* Text Content - Left half */}
            <motion.div
              className="absolute inset-0 flex items-center justify-start pl-12 md:pl-20 lg:pl-32 pointer-events-none"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.3 }}
            >
              <div className="text-left max-w-lg">
                {/* Hero Headline */}
                <div className="mb-6">
                  {["Where NYU's", 'Founders & Investors', 'Are Made'].map((line, lineIndex) => (
                    <h1
                      key={lineIndex}
                      className="section-title text-[#DBDBDB]"
                    >
                      {line}
                    </h1>
                  ))}
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-[#DBDBDB]/60 leading-relaxed max-w-md">
                  NYU Stern&apos;s premier entrepreneurship club since 2003
                </p>
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 1 }}
            >
              <motion.div
                animate={{ y: shouldReduceMotion ? 0 : [0, 6, 0] }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.5,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                className="w-5 h-8 border-2 border-[#3F3F3F]/60 rounded-full flex items-start justify-center p-1"
              >
                <motion.div
                  className="w-1 h-1.5 bg-[#DBDBDB]/60 rounded-full"
                  animate={{ opacity: shouldReduceMotion ? 1 : [0.4, 1, 0.4] }}
                  transition={{ duration: shouldReduceMotion ? 0 : 1.5, repeat: shouldReduceMotion ? 0 : Infinity }}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </section>
    </div>
  );
}
