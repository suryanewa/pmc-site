'use client';

import { motion } from 'framer-motion';
import {Newsletter} from "../../components/Newsletter";
import { Timeline } from '@/components/ui/timeline';
import Link from 'next/link';
import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from '../../components/ScrollAnimations';

const curriculumData = [
  {
    title: "Weeks 1-3",
    content: (
      <div>
        <h4 className="text-2xl font-[family-name:var(--font-gotham-bold)] text-white mb-4">Phase 1: Validation</h4>
        <p className="text-neutral-300 text-base md:text-lg mb-6">
        Before writing a single line of code, you’ll learn how to identify real pain points and validate demand in the wild. This phase is about developing sharp product instincts and avoiding the #1 startup failure: building something nobody wants.
        </p>
        <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
            User Interviews
          </span>
          <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
          Problem Discovery
          </span>
          <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
          Market Research
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Weeks 4-6",
    content: (
      <div>
        <h4 className="text-2xl font-[family-name:var(--font-gotham-bold)] text-white mb-4">Phase 2: Build</h4>
        <p className="text-neutral-300 text-base md:text-lg mb-6">
          Now you move fast. Using the newest AI tools and rapid iteration techniques, you’ll design, build, and ship a working product that solves the problem you validated.        </p>
        <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
            AI-Powered Development
          </span>
          <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
          Product Design
          </span>
          <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
          Ship Fast
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Weeks 7-9",
    content: (
      <div>
        <h4 className="text-2xl font-[family-name:var(--font-gotham-bold)] text-white mb-4">Phase 3: Go-To-Market</h4>
        <p className="text-neutral-300 text-base md:text-lg mb-6">
          Building is only half the battle. In this final phase, you’ll focus on distribution, growth, and monetization—figuring out how to get users, keep them, and generate revenue.        </p>
        <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
            Launch Strategy
          </span>
          <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
          Growth Tactics
          </span>
          <span className="px-4 py-2 bg-[#ECB22F]/30 border border-[#ECB22F]/30 rounded-full text-[#ECB22F] text-sm">
          Revenue
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
            <StaggerContainer className="flex items-center gap-6 md:gap-10 lg:gap-14">
              <StaggerItem><img src="/design-color-palette-sample.svg" alt="" className="size-12 md:size-16" /></StaggerItem>
              <StaggerItem><img src="/design-ruler.svg" alt="" className="size-12 md:size-16 shrink-0" /></StaggerItem>
              <StaggerItem><img src="/design-layer.svg" alt="" className="size-12 md:size-16 shrink-0" /></StaggerItem>
              <StaggerItem><img src="/design-block.svg" alt="" className="size-12 md:size-16 shrink-0" /></StaggerItem>
              <StaggerItem><img src="/design-ruler.svg" alt="" className="size-12 md:size-16 shrink-0" /></StaggerItem>
              <StaggerItem><img src="/design-website.svg" alt="" className="size-12 md:size-16 shrink-0" /></StaggerItem>
              <StaggerItem><img src="/design-coding.svg" alt="" className="size-12 md:size-16 shrink-0" /></StaggerItem>
            </StaggerContainer>

            {/* Description */}
            <FadeUp delay={0.2}>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
                teaches students how real companies are built. We&apos;ll guide you through the same frameworks used by early-stage founders — from ideation and validation to product and growth. By the end of 9 weeks, you&apos;ll have made money on the internet.
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
              <Timeline data={curriculumData} showHeader={false} />
            </div>
          </FadeIn>
        </div>
      </section>
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
    </div>
  );
}