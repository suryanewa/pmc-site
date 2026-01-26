'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {Newsletter} from "../../components/Newsletter";
import { Timeline } from '@/components/ui/timeline';
import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from '../../components/ScrollAnimations';


const curriculumData = [
  {
    title: "Weeks 1-3",
    content: (
      <div>
        <h4 className="text-2xl font-medium text-white mb-4">Phase 1: Validation</h4>
        <p className="text-neutral-300 text-base md:text-lg mb-6">
        Before you build anything, you’ll learn how to identify real problems and test whether people actually care. This phase is about developing sharp founder instincts through user interviews, pattern recognition, and ruthless honesty. If the problem isn’t real, nothing else matters.        </p>
        <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 bg-[#AD1DE0]/20 border border-[#AD1DE0]/20 rounded-full text-[#AD1DE0] text-sm">
        User Interviews
          </span>
          <span className="px-4 py-2 bg-[#AD1DE0]/20 border border-[#AD1DE0]/20 rounded-full text-[#AD1DE0] text-sm">
          Problem Discovery
          </span>
          <span className="px-4 py-2 bg-[#AD1DE0]/20 border border-[#AD1DE0]/20 rounded-full text-[#AD1DE0] text-sm">
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
        <h4 className="text-2xl font-medium text-white mb-4">Phase 2: Build</h4>
        <p className="text-neutral-300 text-base md:text-lg mb-6">
        Now you move from ideas to proof. Using modern AI tools and rapid iteration, you’ll design, prototype, and ship early versions of your product to validate direction fast. The focus is on progress over polish, proof over slides, and learning through real-world feedback.</p>      <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 bg-[#AD1DE0]/20 border border-[#AD1DE0]/20 rounded-full text-[#AD1DE0] text-sm">
            AI-Powered Development
          </span>
          <span className="px-4 py-2 bg-[#AD1DE0]/20 border border-[#AD1DE0]/20 rounded-full text-[#AD1DE0] text-sm">
          Product Design
          </span>
          <span className="px-4 py-2 bg-[#AD1DE0]/20 border border-[#AD1DE0]/20 rounded-full text-[#AD1DE0] text-sm">
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
        <h4 className="text-2xl font-medium text-white mb-4">Phase 3: Distribution & Growth</h4>
        <p className="text-neutral-300 text-base md:text-lg mb-6">
        Building is only half the battle. You’ll learn how startups actually grow—through distribution, positioning, and scrappy go-to-market execution. Whether B2B or B2C, this phase teaches you how to get users, test channels, and build momentum where incumbents move slowly. </p>
                <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 bg-[#AD1DE0]/20 border border-[#AD1DE0]/20 rounded-full text-[#AD1DE0] text-sm">
            Launch Strategy
          </span>
          <span className="px-4 py-2 bg-[#AD1DE0]/20 border border-[#AD1DE0]/20 rounded-full text-[#AD1DE0] text-sm">
          Growth Tactics
          </span>
          <span className="px-4 py-2 bg-[#AD1DE0]/20 border border-[#AD1DE0]/20 rounded-full text-[#AD1DE0] text-sm">
          Revenue
          </span>
        </div>
      </div>
    ),
  },
];

export default function StartupPage() {
  return (
    <div className="bg-[#1e1e1e] relative">
      {/* Background illustration - extends beyond hero with fade */}
      <div className="absolute top-0 left-0 w-full h-[110vh] pointer-events-none">
        <img
          src="/jobs.svg"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Gradient fade overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-[#1e1e1e]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-32 md:pt-40 lg:pt-48 min-h-screen">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col gap-8 max-w-3xl">
            {/* Heading */}
            <FadeUp>
              <h1 className="text-[clamp(3rem,8vw,5.75rem)] font-medium leading-none tracking-[-0.03em] text-white">
                Startup Team
              </h1>
            </FadeUp>

            {/* Decoration Icons Row */}
            <StaggerContainer className="flex items-center gap-4 md:gap-10 lg:gap-14 no-wrap">
              <StaggerItem><img src="/dec-1.svg" alt="" className="size-10 md:size-16" /></StaggerItem>
              <StaggerItem><img src="/dec-2.svg" alt="" className="size-10 md:size-16" /></StaggerItem>
              <StaggerItem><img src="/dec-3.svg" alt="" className="size-10 md:size-16" /></StaggerItem>
              <StaggerItem><img src="/dec-4.svg" alt="" className="size-10 md:size-16" /></StaggerItem>
              <StaggerItem><img src="/dec-5.svg" alt="" className="size-10 md:size-16 hidden sm:block" /></StaggerItem>
              <StaggerItem><img src="/dec-6.svg" alt="" className="size-10 md:size-16 hidden sm:block" /></StaggerItem>
              <StaggerItem><img src="/dec-7.svg" alt="" className="size-10 md:size-16 hidden md:block" /></StaggerItem>
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
              <Timeline data={curriculumData} showHeader={false} lineColor="#AD1DE0" />
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
                <Newsletter variant="dark" />
              </FadeUp>
            </div>
          </div>
        </section>
    </div>
  );
}
