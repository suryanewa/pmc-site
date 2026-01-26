'use client';

import { motion } from 'framer-motion';
import {Newsletter} from "../../components/Newsletter";
import { Timeline } from '@/components/ui/timeline';
import Link from 'next/link';
import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from '../../components/ScrollAnimations';

// EIR Companies - logos should be white on transparent background
const eirCompanies = [
  { name: 'Terra', logo: '/eir-logos/terra.png', url: 'https://useterra.com/' },
  { name: 'Blockhouse', logo: '/eir-logos/blockhouse.png', url: 'https://blockhouse.app/' },
  { name: 'Clique', logo: '/eir-logos/clique.avif', url: 'https://clique.so' },
  { name: 'Flite', logo: '/eir-logos/flite.webp', url: 'https://flite.city' },
  { name: 'IRL', logo: '/eir-logos/irl.avif', url: 'https://www.playslap.com/irl' },
  { name: 'Synaptrix', logo: '/eir-logos/synaptrix.png', url: 'https://synaptrix-labs.com' },
];

const curriculumData = [
  {
    title: "Weeks 1-2",
    content: (
      <div>
        <h4 className="text-2xl font-medium text-white mb-4">Phase 1: Selection & Alignment</h4>
        <p className="text-neutral-300 text-base md:text-lg mb-6">
        You begin with a highly selective application and interview process designed to identify founders who are serious about building. Once admitted, you’ll meet your cohort over dinner and align on expectations, goals, and how to get the most out of the program.      </p>
        <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
            Alignment
          </span>
          <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
           Kickoff
          </span>
          <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
          Community
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Weeks 3-7",
    content: (
      <div>
        <h4 className="text-2xl font-medium text-white mb-4">Phase 2: Build, Learn, and Iterate</h4>
        <p className="text-neutral-300 text-base md:text-lg mb-6">
        This is the core of the program. You’ll participate in founder dinners, need-based workshops, and office hours with VC partners, all tailored to the specific challenges your startup is facing. Whether you’re refining your idea, building an MVP, or pushing toward revenue.</p>
               <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
            Mentorship
          </span>
          <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
          Learning
          </span>
          <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
          Workshops
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Weeks 8-9",
    content: (
      <div>
        <h4 className="text-2xl font-medium text-white mb-4">Phase 3: Exposure & Outcomes</h4>
        <p className="text-neutral-300 text-base md:text-lg mb-6">
        The semester culminates in optional pitch opportunities and deeper VC exposure. You’ll reflect on your progress, sharpen your narrative, and present your company to investors, peers, and the broader startup community. You'll leave the program with momentum, clarity, and a stronger founder network.</p>        <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
          Pitch
          </span>
          <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
          Network
          </span>
          <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
          Raise
          </span>
        </div>
      </div>
    ),
  },
];


export default function EirPage() {
  return (
    <div className="bg-[#1e1e1e] relative">
      {/* Background illustration - extends beyond hero with fade */}
      <div className="absolute top-0 left-0 w-full h-[110vh] pointer-events-none">
        <img
          src="/bill.png"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        {/* Gradient fade overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-[#1e1e1e]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-32 md:pt-40 lg:pt-48 min-h-screen">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col gap-8 max-w-4xl">
            {/* Heading */}
            <FadeUp>
              <h1 className="text-[clamp(2.5rem,7vw,5.75rem)] font-medium leading-none tracking-[-0.03em] text-white">
                Entrepreneurs In Residence
              </h1>
            </FadeUp>

            {/* Decoration Icons Row */}
            <StaggerContainer className="flex items-center gap-4 md:gap-10 lg:gap-14 no-wrap">
              <StaggerItem><img src="/design-color-palette-sample.svg" alt="" className="size-10 md:size-16" /></StaggerItem>
              <StaggerItem><img src="/design-ruler.svg" alt="" className="size-10 md:size-16" /></StaggerItem>
              <StaggerItem><img src="/design-layer.svg" alt="" className="size-10 md:size-16" /></StaggerItem>
              <StaggerItem><img src="/design-block.svg" alt="" className="size-10 md:size-16" /></StaggerItem>
              <StaggerItem><img src="/design-website.svg" alt="" className="size-10 md:size-16 hidden sm:block" /></StaggerItem>
              <StaggerItem><img src="/design-coding.svg" alt="" className="size-10 md:size-16 hidden sm:block" /></StaggerItem>
            </StaggerContainer>

            {/* Description */}
            <FadeUp delay={0.2}>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
              EEG’s new unique accelerator program for NYU founders: tailored workshops, expert mentorship, and top-tier VC networking - focused on individual startup needs in a growth-centric community. 
</p>
            </FadeUp>

            {/* Apply Button */}
            <FadeUp delay={0.3}>
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSdcQw779OxVgmhXaUkwDBqMBkfnJU6Dwms5m6tss6jD7ZGVPA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 border border-white text-white font-medium hover:bg-white hover:text-[#1e1e1e] transition-all duration-300 w-fit"
              >
                Chat With Us
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-24 pb-24 min-h-[100vh]">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="text-[clamp(1.5rem,3vw,1.75rem)] font-medium text-white tracking-[-0.02em] mb-0">
              /curriculum
            </h2>
          </FadeUp>

          {/* Timeline with Phase Cards */}
          <FadeIn delay={0.2}>
            <div className="dark">
              <Timeline data={curriculumData} showHeader={false} lineColor="#ECB22F" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EIR Companies Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24 bg-[#1e1e1e]">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="text-[clamp(1.5rem,3vw,1.75rem)] font-medium text-white tracking-[-0.02em] mb-4">
              /eir-companies
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-lg text-white/60 leading-relaxed mb-12 max-w-2xl">
              Companies built by founders in our EIR program.
            </p>
          </FadeUp>

          {/* Company Logos Grid */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {eirCompanies.map((company, index) => (
                <motion.a
                  key={company.name}
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center p-4 sm:p-6 md:p-8 border border-white/20 bg-transparent hover:border-[#ECB22F] hover:bg-[#ECB22F]/10 transition-all duration-300 aspect-[2/1]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-h-6 sm:max-h-8 md:max-h-10 w-auto object-contain brightness-0 invert transition-opacity duration-300"
                  />
                </motion.a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-32 px-6 md:px-16 lg:px-24 bg-[#1e1e1e] relative z-10 overflow-hidden">
          {/* Subtle animated gradient */}
          <motion.div
            className="absolute inset-0 opacity-0"
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
                <Newsletter variant="dark" source="eir-program" />
              </FadeUp>
            </div>
          </div>
        </section>
    </div>
  );
}