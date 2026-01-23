'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { Newsletter } from './components/Newsletter';
import { FadeUp, FadeIn } from './components/ScrollAnimations';
import { Polaroid } from './components/Polaroid';
import Link from "next/link";
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

// Dynamic import for Three.js scene to avoid SSR issues
const HeroScene = dynamic(() => import('./components/HeroScene').then(mod => ({ default: mod.HeroScene })), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />
});

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="size-9 flex items-center justify-center text-[#041540]/60 hover:text-[#041540] transition-colors duration-300"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

// Company logos for the marquee
const companyLogos = [
  { image: "/companies/lux_capital_logo.jpeg", name: "Lux Capital" },
  { image: "/companies/a16z.jpg", name: "a16z" },
  { image: "/companies/figma.png", name: "Figma" },
  { image: "/companies/venmo.png", name: "Venmo" },
  { image: "/companies/anthropic.png", name: "Anthropic" },
  { image: "/companies/usv.jpg", name: "USV" },
  { image: "/companies/bessemer.png", name: "Bessemer" },
  { image: "/companies/meta.png", name: "Meta" },
];

// Programs data
const programs = [
  {
    id: 'startup',
    title: '/startup',
    description: 'A 9-week, build-from-zero accelerator. You\'ll interview users to validate a real market gap, design and ship a product, and ultimately take it to market.',
    color: '#AD1DE0',
    href: '/programs/startup',
  },
  {
    id: 'investing',
    title: '/investing',
    description: 'An intensive 9-week program focused on how real investors evaluate startups. Break down deals, analyze companies, and build investment theses.',
    color: '#2DB67D',
    href: '/programs/investing',
  },
  {
    id: 'eir',
    title: '/eir',
    description: 'A selective program for NYU founders who are actively building. Get 1-on-1 mentorship and direct access to venture capitalists.',
    color: '#F0C75B',
    href: '/programs/eir',
  },
];

// Animated counter component
function AnimatedStat({ number, label, delay = 0 }: { number: string; label: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div 
        className="text-4xl md:text-5xl font-medium text-[#041540] tracking-tight"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {number}
      </motion.div>
      <div className="text-sm text-[#041540]/50 mt-1">
        {label}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Track scroll progress as state for HeroScene
  useMotionValueEvent(heroScrollProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  // Parallax effects for hero section
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);
  
  // Text should appear (~35-50% scroll), comes from bottom
  const textOpacity = useTransform(heroScrollProgress, [0.35, 0.45], [0, 1]);
  const textY = useTransform(heroScrollProgress, [0.35, 0.45], [40, 0]);

  return (
    <div className="min-h-screen relative">
      <main>
        {/* Hero Section - Taller to allow scroll-based animation + extra space after */}
        <section 
          ref={heroRef}
          className="h-[300vh] relative bg-[#F7F3EE]"
        >
          {/* Sticky container for 3D scene */}
          <div className="sticky top-0 h-screen">
            {/* 3D Mac Scene - Fullscreen */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              }>
                <HeroScene scrollProgress={scrollProgress} />
              </Suspense>
            </motion.div>

            {/* Overlay Content - Appears UNDER the Mac, comes from bottom */}
            <motion.div 
              className="absolute inset-0 flex items-end justify-center pb-8 md:pb-12 pointer-events-none"
              style={{ opacity: textOpacity, y: textY }}
            >
              <div className="text-center max-w-xl">
                {/* Hero Headline */}
                <div className="mb-4">
                  {['Where NYU\'s', 'Founders & Investors', 'Are Made'].map((line, lineIndex) => (
                    <h1 
                      key={lineIndex}
                      className="text-[clamp(1.5rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#041540]"
                    >
                      {line}
                    </h1>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-[#041540]/60 leading-relaxed max-w-md mx-auto">
                  NYU Stern&apos;s premier entrepreneurship club since 2003
                </p>
              </div>
            </motion.div>

            {/* Scroll indicator - visible at start, fades as you scroll */}
            <motion.div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              style={{ opacity: useTransform(heroScrollProgress, [0, 0.15], [1, 0]) }}
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
          </div>
        </section>

        {/* Secondary Hero - Full info section */}
        <section className="py-24 px-6 md:px-12 lg:px-16 bg-[#F7F3EE]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              {/* Left - Main content */}
              <div>
                <motion.p 
                  className="text-xs tracking-[0.2em] uppercase text-[#041540]/50 font-medium mb-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Est. 2003 — NYU Stern
                </motion.p>

                <motion.p 
                  className="text-lg md:text-xl text-[#041540]/70 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  EEG immerses students in the worlds of entrepreneurship, technology, and venture capital through hands-on programs, weekly speaker events, and direct access to industry leaders.
                </motion.p>
              </div>

              {/* Right - Newsletter & Social */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-sm text-[#041540]/50 mb-4">Stay updated with our latest events and opportunities</p>
                <div className="flex flex-col gap-5">
                  <Newsletter variant="light" />
                  
                  {/* Social Icons */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs tracking-widest uppercase text-[#041540]/40">Follow</span>
                    <div className="w-6 h-px bg-[#041540]/20" />
                    <SocialIcon href="https://www.linkedin.com/company/nyueeg/" label="LinkedIn">
                      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </SocialIcon>
                    <SocialIcon href="https://x.com/nyueeg" label="X">
                      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </SocialIcon>
                    <SocialIcon href="https://www.instagram.com/nyu.eeg/" label="Instagram">
                      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </SocialIcon>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Logo Marquee - Minimal */}
        <section className="py-12 border-y border-[#041540]/10 bg-white/50">
          <div className="flex items-center justify-center gap-8 opacity-60">
            <span className="text-xs tracking-[0.15em] uppercase text-[#041540]/50 shrink-0">
              Speakers from
            </span>
            <InfiniteMovingCards
              items={companyLogos}
              direction="left"
              speed="slow"
              pauseOnHover={false}
            />
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-32 px-6 md:px-16 lg:px-24">
          <div className="max-w-[1400px] mx-auto">
            {/* Section Header */}
            <div className="grid lg:grid-cols-2 gap-8 mb-20">
              <FadeUp>
                <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#041540]">
                  Programs
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-lg text-[#041540]/60 leading-relaxed lg:pt-4">
                  Whether you&apos;re interested in startups, investing, or are already building, our semester-long programs bring students into NYU&apos;s startup, tech, and venture capital ecosystem.
                </p>
              </FadeUp>
            </div>

            {/* Programs Grid */}
            <div className="space-y-1">
              {programs.map((program, index) => (
                <FadeUp key={program.id} delay={0.1 * index}>
                  <Link href={program.href}>
                    <motion.div
                      className="group relative py-10 border-t border-[#041540]/10 cursor-pointer overflow-hidden"
                      whileHover={{ x: 12 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Hover background effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(90deg, ${program.color}08 0%, transparent 50%)`
                        }}
                      />
                      
                      <div className="flex items-start justify-between gap-8 relative z-10">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <motion.span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: program.color }}
                              whileHover={{ scale: 1.5 }}
                              transition={{ duration: 0.2 }}
                            />
                            <h3 
                              className="text-2xl md:text-3xl font-medium text-[#041540] group-hover:text-[#0115DF] transition-colors duration-300"
                              style={{ fontFamily: 'var(--font-gotham-medium)' }}
                            >
                              {program.title}
                            </h3>
                          </div>
                          <p className="text-[#041540]/50 max-w-2xl leading-relaxed pl-6">
                            {program.description}
                          </p>
                        </div>
                        <div className="shrink-0 mt-2">
                          <motion.div
                            className="w-10 h-10 rounded-full border border-[#041540]/20 flex items-center justify-center group-hover:border-[#0115DF] group-hover:bg-[#0115DF] transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: 45 }}
                          >
                            <svg
                              className="w-4 h-4 text-[#041540]/40 group-hover:text-white transition-colors duration-300"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </FadeUp>
              ))}
              {/* Bottom border */}
              <div className="border-t border-[#041540]/10" />
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-32 px-6 md:px-16 lg:px-24 bg-white relative z-10">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Left - Content */}
              <div>
                <FadeUp>
                  <p className="text-sm tracking-[0.2em] uppercase text-[#041540]/50 font-medium mb-6">
                    Weekly Events
                  </p>
                  <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#041540] mb-8">
                    Speaker Series
                  </h2>
                </FadeUp>
                
                <FadeUp delay={0.1}>
                  <div className="space-y-6 mb-12">
                    <p className="text-lg text-[#041540]/70 leading-relaxed">
                      We host our weekly speaker series on <span className="text-[#041540] font-medium">Thursdays @ 12:30 pm</span>. All members of the NYU community are welcome.
                    </p>
                    <p className="text-lg text-[#041540]/70 leading-relaxed">
                      So far, we&apos;ve hosted over <span className="text-[#041540] font-medium">250 conversations</span> with founders, operators and investors—the best in their fields.
                    </p>
                  </div>
                </FadeUp>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#041540]/10">
                  <AnimatedStat number="250+" label="Speaker Events" delay={0} />
                  <AnimatedStat number="20+" label="Years Active" delay={0.1} />
                  <AnimatedStat number="100+" label="Alumni Network" delay={0.2} />
                </div>
              </div>

              {/* Right - Polaroids with stagger */}
              <div className="relative min-h-[500px] lg:min-h-[600px]">
                <FadeIn delay={0.2} className="absolute w-[240px] md:w-[280px] left-[0%] top-[0%] hover:z-50">
                  <Polaroid src="/lux.jpeg" alt="Lux Capital" caption="eeg/lux-capital" rotation={-3} />
                </FadeIn>
                <FadeIn delay={0.35} className="absolute w-[240px] md:w-[280px] right-[5%] top-[8%] hover:z-50">
                  <Polaroid src="/zfellows.jpeg" alt="Zfellows" caption="eeg/zfellows" rotation={2}/>
                </FadeIn>
                <FadeIn delay={0.5} className="absolute w-[240px] md:w-[280px] left-[15%] top-[40%] hover:z-50">
                  <Polaroid src="/beli.png" alt="Beli" caption="eeg/beli" rotation={4} />
                </FadeIn>
                <FadeIn delay={0.65} className="absolute w-[240px] md:w-[280px] right-[0%] bottom-[5%] hover:z-50">
                  <Polaroid src="/varun-rana.png" alt="Varun Rana" caption="eeg/varun-rana" rotation={-2}/>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Minimal Dark */}
        <section className="py-32 px-6 md:px-16 lg:px-24 bg-[#041540] relative z-10 overflow-hidden">
          {/* Subtle animated gradient */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, #0115DF20 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, #0115DF20 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, #0115DF20 0%, transparent 50%)",
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="max-w-3xl">
              <FadeUp>
                <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em] text-white mb-8">
                  Join the community
                </h2>
              </FadeUp>
              
              <FadeUp delay={0.1}>
                <p className="text-lg text-white/60 leading-relaxed mb-12 max-w-xl">
                  Get access to exclusive events, mentorship, and a network of ambitious students and industry leaders.
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <Newsletter variant="dark" />
              </FadeUp>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
