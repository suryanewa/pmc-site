'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../components/Button';
import { Timeline } from '../../components/Timeline';
import { Footer } from '../../components/Footer';
import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from '../../components/ScrollAnimations';

const curriculumPhases = [
  {
    id: 'validation',
    title: 'Phase 1: Validation',
    description: "In weeks 1-3, you'll learn how to interview users and validate problems that are actually worth building for.",
    badges: [
      {
        text: 'Validate',
        rotation: -15,
        arrowPosition: 'right' as const,
        arrowRotation: 50,
        offsetX: -120,
        offsetY: 170,
      }
    ]
  },
  {
    id: 'build',
    title: 'Phase 2: Build',
    description: "In weeks 4-6, you'll turn your validated problem into a real-world solution. Using the latest AI tools, you'll learn to design and ship fast.",
    badges: [
      {
        text: 'Ship Fast',
        rotation: 15,
        arrowPosition: 'left' as const,
        arrowRotation: -50,
        offsetX: 500,
        offsetY: 80,
      },
      {
        text: 'Build!',
        rotation: 5,
        arrowPosition: 'right' as const,
        arrowRotation: 30,
        offsetX: 100,
        offsetY: 200,
      }
    ]
  },
  {
    id: 'gtm',
    title: 'Phase 3: Go-To-Market',
    description: "In weeks 7-9, it's all about taking your product to market. This is the culmination of your work – go out and figure how to maximize revenue.",
    badges: [
      {
        text: 'Revenue',
        rotation: 10,
        arrowPosition: 'left' as const,
        arrowRotation: -40,
        offsetX: 150,
        offsetY: 220,
      }
    ]
  }
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
          src="/bill.png"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        {/* Gradient fade overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-[#1e1e1e]" />
      </div>

      {/* Dark Navbar - transparent in hero, solid + compact when scrolled */}
      <nav className={`flex items-center justify-between w-full px-[80px] fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${isPastHero ? 'py-4 shadow-sm bg-[#1e1e1e]' : 'py-[43px] bg-transparent'}`}>
        <a href="/" className="flex items-center">
          <img src="/eir.svg" alt="EEG Startup" className="h-[44px]" />
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
            <h1 className="text-[92px] font-medium leading-none tracking-[-0.075em] text-white whitespace-nowrap">
              Entrepreneurs In Residence
            </h1>
          </FadeUp>

          {/* Decoration Icons Row */}
          <StaggerContainer className="flex items-center gap-[55px] flex-wrap pr-[92px]">
            <StaggerItem><img src="/design-color-palette-sample.svg" alt="" className="size-16" /></StaggerItem>
            <StaggerItem><img src="/design-ruler.svg" alt="" className="size-16" /></StaggerItem>
            <StaggerItem><img src="/design-layer.svg" alt="" className="size-16" /></StaggerItem>
            <StaggerItem><img src="/design-block.svg" alt="" className="size-16" /></StaggerItem>
            <StaggerItem><img src="/design-ruler.svg" alt="" className="size-16" /></StaggerItem>
            <StaggerItem><img src="/design-website.svg" alt="" className="size-16" /></StaggerItem>
            <StaggerItem><img src="/design-coding.svg" alt="" className="size-16" /></StaggerItem>
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
      <section className="relative z-10 px-[80px] pt-24 pb-24">
        <FadeUp>
          <h2 className="text-[28px] font-medium text-white tracking-[-0.075em] mb-16">
            /curriculum
          </h2>
        </FadeUp>

        {/* Timeline with Phase Cards */}
        <FadeIn delay={0.2}>
          <Timeline phases={curriculumPhases} minHeight={800} badgeVariant="orange" />
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
