'use client';

import { motion } from 'framer-motion';
import { Newsletter } from './components/Newsletter';
import { FadeUp, FadeIn } from './components/ScrollAnimations';
import { Polaroid } from './components/Polaroid';
import { HeroWarpCanvas } from './components/HeroWarpCanvas';
import Link from "next/link";
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

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
  return (
    <div className="min-h-screen relative">
      <main>
        {/* Hero Section - Clean text-based */}
        <section className="min-h-screen flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 bg-[#F7F3EE] py-24 relative overflow-hidden">
          <HeroWarpCanvas />
          <div className="w-full max-w-[1400px] mx-auto relative z-10">
            <div className="max-w-[1000px] text-left">
            {/* Subtitle */}
            <motion.p
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-[#041540]/20 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#041540]/60">
                  NYU Stern&apos;s Premier Entrepreneurship Club
                </span>
                <span className="inline-flex items-center rounded-full border border-[#041540]/20 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#041540]/60">
                  EST 2003
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
              <Link
                href="#programs"
                className="inline-block px-8 py-4 bg-[#041540] text-white font-medium hover:bg-[#0a2a6e] transition-colors duration-300"
              >
                Explore Programs
              </Link>
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
