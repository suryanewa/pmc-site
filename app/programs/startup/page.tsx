'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../components/Button';
import { Timeline } from '@/components/ui/timeline';
import { Footer } from '../../components/Footer';
import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from '../../components/ScrollAnimations';

const curriculumData = [
  {
    title: "Weeks 1-3",
    content: (
      <div>
        <h4 className="text-2xl font-[family-name:var(--font-gotham-bold)] text-white mb-4">Phase 1: Validation</h4>
        <p className="text-neutral-300 text-base md:text-lg mb-6">
          You&apos;ll learn how to interview users and validate problems that are actually worth building for.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
            User Interviews
          </span>
          <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
            Problem Discovery
          </span>
          <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
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
          You&apos;ll turn your validated problem into a real-world solution. Using the latest AI tools, you&apos;ll learn to design and ship fast.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
            AI-Powered Development
          </span>
          <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
            Product Design
          </span>
          <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
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
          It&apos;s all about taking your product to market. This is the culmination of your work – go out and figure how to maximize revenue.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
            Launch Strategy
          </span>
          <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
            Growth Tactics
          </span>
          <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
            Revenue
          </span>
        </div>
      </div>
    ),
  },
];

export default function StartupPage() {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hero section is min-h-screen, so we check if scrolled past ~80% of viewport height
      const heroThreshold = window.innerHeight * 0.8;
      setIsPastHero(window.scrollY > heroThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      {/* Dark Navbar - transparent in hero, solid + compact when scrolled */}
      <nav className={`flex items-center justify-between w-full px-[80px] fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${isPastHero ? 'py-4 shadow-sm bg-[#1e1e1e]' : 'py-[43px] bg-transparent'}`}>
        <a href="/" className="flex items-center">
          <img src="/startup.svg" alt="EEG Startup" className="h-[44px]" />
        </a>

        <div className="flex items-center gap-[60px]">
          {/* Programs dropdown */}
          <div className="relative group">
            <span className="text-white text-lg font-medium hover:opacity-70 transition-opacity cursor-default">
              EEG/programs
            </span>
            {/* Dropdown menu */}
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-[#1e1e1e] border border-white/10 rounded-lg shadow-lg py-2 min-w-[160px]">
                <a
                  href="/programs/startup"
                  className="block px-4 py-2 text-white text-base font-medium hover:bg-white/10 transition-colors"
                >
                  /startup
                </a>
                <a
                  href="/programs/investing"
                  className="block px-4 py-2 text-white text-base font-medium hover:bg-white/10 transition-colors"
                >
                  /investing
                </a>
                <a
                  href="/programs/eir"
                  className="block px-4 py-2 text-white text-base font-medium hover:bg-white/10 transition-colors"
                >
                  /eir
                </a>
              </div>
            </div>
          </div>
          <a
            href="/people"
            className="text-white text-lg font-medium hover:opacity-70 transition-opacity"
          >
            EEG/people
          </a>
          <Button size="lg" className="w-[175px]">
            EEG/coffee
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-[80px] pt-[247px] min-h-screen">
        <div className="flex flex-col gap-8 max-w-[874px]">
          {/* Heading */}
          <FadeUp>
            <h1 className="text-[92px] font-medium leading-none tracking-[-0.075em] text-white">
              Startup Team
            </h1>
          </FadeUp>

          {/* Decoration Icons Row */}
          <StaggerContainer className="flex items-center gap-[55px] flex-wrap pr-[92px]">
            <StaggerItem><img src="/dec-1.svg" alt="" className="size-16" /></StaggerItem>
            <StaggerItem><img src="/dec-2.svg" alt="" className="size-16" /></StaggerItem>
            <StaggerItem><img src="/dec-3.svg" alt="" className="size-16" /></StaggerItem>
            <StaggerItem><img src="/dec-4.svg" alt="" className="size-16" /></StaggerItem>
            <StaggerItem><img src="/dec-5.svg" alt="" className="size-16" /></StaggerItem>
            <StaggerItem><img src="/dec-6.svg" alt="" className="size-16" /></StaggerItem>
            <StaggerItem><img src="/dec-7.svg" alt="" className="size-16" /></StaggerItem>
          </StaggerContainer>

          {/* Description */}
          <FadeUp delay={0.2}>
            <p className="text-[28px] font-medium leading-snug tracking-[-0.075em] text-white max-w-[639px]">
              teaches students how real companies are built. We'll guide you through the same frameworks used by early-stage founders — from ideation and validation to product and growth. By the end of 9 weeks, you'll have made money on the internet.
            </p>
          </FadeUp>

          {/* Apply Button */}
          <FadeUp delay={0.3}>
            <Button size="lg" className="w-[175px]">
              Apply Now
            </Button>
          </FadeUp>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="relative z-10 px-[80px] pt-24 pb-24 min-h-[1000vh]">
        <FadeUp>
          <h2 className="text-[28px] font-medium text-white tracking-[-0.075em] mb-0">
            /curriculum
          </h2>
        </FadeUp>

        {/* Timeline with Phase Cards */}
        <FadeIn delay={0.2}>
          <div className="dark">
            <Timeline data={curriculumData} showHeader={false} />
          </div>
        </FadeIn>
      </section>

      {/* Light mode footer for startup page */}
      <Footer variant="light" />
    </div>
  );
}
