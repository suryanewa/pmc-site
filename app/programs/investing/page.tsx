'use client';

import { motion } from 'framer-motion';
import {Newsletter} from "../../components/Newsletter";
import { Timeline } from '@/components/ui/timeline';
import Link from 'next/link';
import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from '../../components/ScrollAnimations';

const curriculumData = [
  {
    title: "Weeks 1–2",
    content: (
      <div>
        <h4 className="text-2xl font-medium text-white mb-4">Phase 1: Foundations</h4>
        <p className="text-neutral-300 text-base md:text-lg mb-6">You'll learn how to think about markets, incentives, power laws, and product–market fit, so you can evaluate companies with clear, repeatable frameworks. The goal is alignment around how value is created and why it compounds.
          In weeks 1 and 2, you'll build the mental models investors actually use. 
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-[#2DB67D]/30 border border-[#2DB67D]/30 rounded-full text-[#2DB67D] text-sm">
            Mental Models
          </span>
          <span className="px-4 py-2 bg-[#2DB67D]/30 border border-[#2DB67D]/30 rounded-full text-[#2DB67D] text-sm">
            Market Analysis
          </span>
          <span className="px-4 py-2 bg-[#2DB67D]/30 border border-[#2DB67D]/30 rounded-full text-[#2DB67D] text-sm">
            Value Creation
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Weeks 3–5",
    content: (
      <div>
        <h4 className="text-2xl font-medium text-white mb-4">Phase 2: First-Principles Thinking</h4>
        <p className="text-neutral-300 text-base md:text-lg mb-6">
          Now you go deeper. Through company deep dives, debates, and applied exercises, you'll learn how to break businesses down from first principles and defend clear positions under uncertainty. The focus is on original thinking—pushing past summaries and developing conviction you can stand behind.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-[#2DB67D]/30 border border-[#2DB67D]/30 rounded-full text-[#2DB67D] text-sm">
            Deep Dives
          </span>
          <span className="px-4 py-2 bg-[#2DB67D]/30 border border-[#2DB67D]/30 rounded-full text-[#2DB67D] text-sm">
            Debates
          </span>
          <span className="px-4 py-2 bg-[#2DB67D]/30 border border-[#2DB67D]/30 rounded-full text-[#2DB67D] text-sm">
            Conviction Building
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Weeks 6–7",
    content: (
      <div>
        <h4 className="text-2xl font-medium text-white mb-4">Phase 3: Investing Mechanics</h4>
        <p className="text-neutral-300 text-base md:text-lg mb-6">
          Here, you build real investing fluency. You'll learn how fund math, dilution, term sheets, and valuation actually work—and how these mechanics shape incentives and outcomes. This phase equips you to analyze real deals through a practical lens.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-[#2DB67D]/30 border border-[#2DB67D]/30 rounded-full text-[#2DB67D] text-sm">
            Fund Math
          </span>
          <span className="px-4 py-2 bg-[#2DB67D]/30 border border-[#2DB67D]/30 rounded-full text-[#2DB67D] text-sm">
            Term Sheets
          </span>
          <span className="px-4 py-2 bg-[#2DB67D]/30 border border-[#2DB67D]/30 rounded-full text-[#2DB67D] text-sm">
            Valuation
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Weeks 8–9",
    content: (
      <div>
        <h4 className="text-2xl font-medium text-white mb-4">Phase 4: Sourcing & Judgment</h4>
        <p className="text-neutral-300 text-base md:text-lg mb-6">
          In the final phase, you operate like an investor. You'll source companies, pitch ideas, and compare opportunities in fast-paced, competitive settings. By the end, you're forming independent judgments and articulating why a company will win.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-[#2DB67D]/30 border border-[#2DB67D]/30 rounded-full text-[#2DB67D] text-sm">
            Deal Sourcing
          </span>
          <span className="px-4 py-2 bg-[#2DB67D]/30 border border-[#2DB67D]/30 rounded-full text-[#2DB67D] text-sm">
            Pitch Practice
          </span>
          <span className="px-4 py-2 bg-[#2DB67D]/30 border border-[#2DB67D]/30 rounded-full text-[#2DB67D] text-sm">
            Investment Thesis
          </span>
        </div>
      </div>
    ),
  },
];


export default function InvestingPage() {
  return (
    <div className="bg-[#1e1e1e] relative">
      {/* Background illustration - extends beyond hero with fade */}
      <div className="absolute top-0 left-0 w-full h-[110vh] pointer-events-none">
        <img
          src="/traitorous-8.png"
          alt=""
          className="w-full h-full object-cover opacity-20"
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
                Investing Team
              </h1>
            </FadeUp>

            {/* Decoration Icons Row */}
            <StaggerContainer className="flex items-center gap-4 md:gap-10 lg:gap-14 no-wrap">
              <StaggerItem><img src="/Group.svg" alt="" className="size-10 md:size-16" /></StaggerItem>
              <StaggerItem><img src="/Group-1.svg" alt="" className="size-10 md:size-16" /></StaggerItem>
              <StaggerItem><img src="/Group-2.svg" alt="" className="size-10 md:size-16" /></StaggerItem>
              <StaggerItem><img src="/Group-3.svg" alt="" className="size-10 md:size-16" /></StaggerItem>
              <StaggerItem><img src="/Group-4.svg" alt="" className="size-10 md:size-16 hidden sm:block" /></StaggerItem>
              <StaggerItem><img src="/Group-5.svg" alt="" className="size-10 md:size-16 hidden sm:block" /></StaggerItem>
              <StaggerItem><img src="/Group-6.svg" alt="" className="size-10 md:size-16 hidden md:block" /></StaggerItem>
            </StaggerContainer>

            {/* Description */}
            <FadeUp delay={0.2}>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
                teaches students how to think like a venture capitalist. You&apos;ll develop critical judgement through deep research, rigorous reading, and structured analysis of real startups, markets, and founders. By the end of 9 weeks, you&apos;ll have what it takes to be a real VC.
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
              <Timeline data={curriculumData} showHeader={false} lineColor="#2DB67D" />
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
                <Newsletter variant="dark" source="investing-program" />
              </FadeUp>
            </div>
          </div>
        </section>
    </div>
  );
}