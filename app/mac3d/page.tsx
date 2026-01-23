'use client';

import { motion } from 'framer-motion';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for Three.js scene to avoid SSR issues
const HeroScene = dynamic(() => import('../components/HeroScene').then(mod => ({ default: mod.HeroScene })), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />
});

export default function Mac3DPage() {
  return (
    <div className="min-h-screen relative">
      <main>
        {/* Hero Section - Static layout with Mac on right, text on left */}
        <section className="h-screen relative bg-[#F7F3EE]">
          {/* 3D Mac Scene - Right half */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#041540]/20 border-t-[#041540]/60 rounded-full animate-spin" />
              </div>
            }>
              <HeroScene />
            </Suspense>
          </motion.div>

          {/* Text Content - Left half */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-start pl-12 md:pl-20 lg:pl-32 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="text-left max-w-lg">
              {/* Hero Headline */}
              <div className="mb-6">
                {['Where NYU\'s', 'Founders & Investors', 'Are Made'].map((line, lineIndex) => (
                  <h1 
                    key={lineIndex}
                    className="text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#041540]"
                  >
                    {line}
                  </h1>
                ))}
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-[#041540]/60 leading-relaxed max-w-md">
                NYU Stern&apos;s premier entrepreneurship club since 2003
              </p>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 border-2 border-[#041540]/30 rounded-full flex items-start justify-center p-1"
            >
              <motion.div 
                className="w-1 h-1.5 bg-[#041540]/50 rounded-full"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
