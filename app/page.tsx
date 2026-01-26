'use client';

import { motion } from 'framer-motion';
import { Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Newsletter } from './components/Newsletter';
import { FadeUp, FadeIn } from './components/ScrollAnimations';
import { Polaroid } from './components/Polaroid';
import { HeroWarpCanvas } from './components/HeroWarpCanvas';
import Link from "next/link";
import { LogoCloudAnimated } from "@/components/smoothui/logo-cloud-1";
import TiltedCard from "@/components/TiltedCard";

const HeroScene = dynamic(
  () => import('./components/HeroScene').then((mod) => ({ default: mod.HeroScene })),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
  }
);

const RocketScene = dynamic(
  () => import('@/components/RocketScene'),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
  }
);

const PlantsScene = dynamic(
  () => import('@/components/PlantsScene'),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
  }
);

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
  const programsTopRef = useRef<HTMLDivElement | null>(null);
  const eventsTopRef = useRef<HTMLDivElement | null>(null);
  const [isProgramsDark, setIsProgramsDark] = useState(false);
  const isProgramsDarkRef = useRef(false);
  const themeTransition = "transition-colors duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

  useEffect(() => {
    isProgramsDarkRef.current = isProgramsDark;
  }, [isProgramsDark]);

  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>("[data-navbar]");
    let ticking = false;
    let lastValue = isProgramsDarkRef.current;

    const update = () => {
      ticking = false;
      const programsTop = programsTopRef.current;
      const eventsTop = eventsTopRef.current;
      if (navbar && programsTop && eventsTop) {
        const navBottom = navbar.getBoundingClientRect().bottom;
        const programsTopPos = programsTop.getBoundingClientRect().top;
        const eventsTopPos = eventsTop.getBoundingClientRect().top;
        const nextValue = programsTopPos <= navBottom && eventsTopPos > navBottom;

        if (nextValue !== lastValue) {
          lastValue = nextValue;
          isProgramsDarkRef.current = nextValue;
          setIsProgramsDark(nextValue);
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    const resizeObserver = navbar ? new ResizeObserver(onScroll) : null;
    resizeObserver?.observe(navbar as Element);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      resizeObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--scroll-background",
      isProgramsDark ? "#041540" : "#F7F3EE"
    );

    return () => {
      root.style.setProperty("--scroll-background", "#F7F3EE");
    };
  }, [isProgramsDark]);

  return (
    <div className="min-h-screen relative">
      <main>
        {/* Hero Section - Clean text-based */}
        <section className="min-h-screen flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 bg-[#F7F3EE] py-24 relative overflow-hidden">
          <HeroWarpCanvas />
          <div className="w-full max-w-[1400px] mx-auto relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-16">
            <div className="max-w-[1000px] text-left">
            {/* Subtitle */}
            <motion.p
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-[#041540]/40 bg-[#F7F3EE] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#041540]/70 opacity-70 hover:opacity-100 hover:bg-[#041540] hover:text-white transition-all duration-300">
                  NYU&apos;s Premier Entrepreneurship Club
                </span>
                <span className="inline-flex items-center rounded-full border border-[#041540]/40 bg-[#F7F3EE] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#041540]/70 opacity-70 hover:opacity-100 hover:bg-[#041540] hover:text-white transition-all duration-300">
                  Est. 2003
                </span>
              </span>
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              className="text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#041540] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              The Home of NYU<br />
              Founders & Investors
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-[#041540]/60 leading-relaxed max-w-2xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Guiding the next generation of founders and investors through hands-on programs to build startups, develop venture fundamentals, and accelerate proven teams with direct access to industry leaders.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="#programs"
                  className="inline-block px-8 py-4 bg-[#041540] text-white font-medium hover:bg-[#0a2a6e] transition-colors duration-300"
                >
                  Explore Our Programs
                </Link>
                <Link
                  href="#"
                  className="inline-block px-8 py-4 border border-[#041540] text-[#041540] font-medium hover:bg-[#041540] hover:text-white transition-all duration-300"
                >
                  Coffee Chat Leadership
                </Link>
              </div>
            </motion.div>

            </div>
            <div
              className="relative w-full h-[360px] md:h-[460px] lg:h-[600px]"
              data-gsap="parallax"
              data-speed="0.12"
            >
              <Suspense fallback={<div className="w-full h-full" />}>
                <HeroScene />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F3EE] text-[#041540]">
          <LogoCloudAnimated title="Our Network" description="" />
        </section>

        {/* Programs Section */}
        <section
          className={`relative py-32 px-6 md:px-16 lg:px-24 ${themeTransition} ${
            isProgramsDark ? "text-[#F7F3EE]" : "text-[#041540]"
          }`}
        >
          <div
            ref={programsTopRef}
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            aria-hidden="true"
          />
          <div className="max-w-[1400px] mx-auto">
            {/* Section Header */}
            <div className="grid lg:grid-cols-2 gap-8 mb-20">
              <FadeUp>
                <h2
                  className={`text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em] ${themeTransition} ${
                    isProgramsDark ? "text-[#F7F3EE]" : "text-[#041540]"
                  }`}
                >
                  Programs
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p
                  className={`text-lg leading-relaxed lg:pt-4 ${themeTransition} ${
                    isProgramsDark ? "text-[#F7F3EE]/70" : "text-[#041540]/60"
                  }`}
                >
                  Whether you&apos;re interested in startups, investing, or are already building, our semester-long programs bring students into NYU&apos;s startup, tech, and venture capital ecosystem.
                </p>
              </FadeUp>
            </div>

            {/* Programs Cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program, index) => (
                <FadeUp key={program.id} delay={0.1 * index}>
                  <Link href={program.href} className="block">
                    <TiltedCard
                      altText={`EEG ${program.title} program`}
                      captionText={program.title}
                      containerHeight="540px"
                      containerWidth="100%"
                      imageHeight="540px"
                      imageWidth="100%"
                      rotateAmplitude={10}
                      scaleOnHover={1.04}
                      showMobileWarning={false}
                      showTooltip={false}
                      backgroundColor={`${program.color}20`}
                      backgroundContent={
                        program.id === 'eir' 
                          ? (isHovered: boolean) => <RocketScene isHovered={isHovered} /> 
                          : program.id === 'startup'
                            ? (isHovered: boolean) => <PlantsScene isHovered={isHovered} />
                            : undefined
                      }
                      pixelEffect={{
                        colors: isProgramsDark
                          ? `${program.color},rgba(247,243,238,0.85),rgba(4,21,64,0.55)`
                          : `${program.color},rgba(4,21,64,0.6),rgba(247,243,238,0.7)`,
                        gap: 6,
                        speed: 30,
                        className: isProgramsDark
                          ? "opacity-40 mix-blend-screen"
                          : "opacity-35 mix-blend-multiply",
                      }}
                      displayOverlayContent
                      overlayContent={
                        <div
                          className={`flex flex-col justify-start items-center text-center h-full w-full p-6 ${themeTransition} ${
                            isProgramsDark
                              ? "text-[#F7F3EE]"
                              : "text-[#041540]"
                          }`}
                          style={{ paddingTop: '12%' }}
                        >
                          <h3
                            className="text-2xl font-medium tracking-[-0.02em]"
                            style={{ fontFamily: 'var(--font-gotham-medium)' }}
                          >
                            <span
                              className={`${themeTransition} ${
                                isProgramsDark ? "text-white" : "text-[#041540]"
                              }`}
                            >
                              eeg
                            </span>
                            <span style={{ color: program.color }}>{program.title}</span>
                          </h3>
                          <p
                            className={`mt-3 text-sm leading-relaxed ${themeTransition} ${
                              isProgramsDark ? "text-[#F7F3EE]/70" : "text-[#041540]/60"
                            }`}
                          >
                            {program.description}
                          </p>
                          <div
                            className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-white w-fit ${themeTransition}`}
                            style={{ backgroundColor: program.color }}
                          >
                            Explore Program
                            <span aria-hidden="true">↗</span>
                          </div>
                        </div>
                      }
                    />
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-32 px-6 md:px-16 lg:px-24 bg-white relative z-10">
          <div
            ref={eventsTopRef}
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            aria-hidden="true"
          />
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
                <FadeIn
                  delay={0.2}
                  className="absolute w-[240px] md:w-[280px] left-[0%] top-[0%] hover:z-50"
                  data-gsap="parallax"
                  data-speed="0.08"
                >
                  <Polaroid src="/lux.jpeg" alt="Lux Capital" caption="eeg/lux-capital" rotation={-3} />
                </FadeIn>
                <FadeIn
                  delay={0.35}
                  className="absolute w-[240px] md:w-[280px] right-[5%] top-[8%] hover:z-50"
                  data-gsap="parallax"
                  data-speed="0.14"
                >
                  <Polaroid src="/zfellows.jpeg" alt="Zfellows" caption="eeg/zfellows" rotation={2}/>
                </FadeIn>
                <FadeIn
                  delay={0.5}
                  className="absolute w-[240px] md:w-[280px] left-[15%] top-[40%] hover:z-50"
                  data-gsap="parallax"
                  data-speed="0.1"
                >
                  <Polaroid src="/beli.png" alt="Beli" caption="eeg/beli" rotation={4} />
                </FadeIn>
                <FadeIn
                  delay={0.65}
                  className="absolute w-[240px] md:w-[280px] right-[0%] bottom-[5%] hover:z-50"
                  data-gsap="parallax"
                  data-speed="0.06"
                >
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
