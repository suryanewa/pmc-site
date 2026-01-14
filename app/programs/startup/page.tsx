'use client';

import { Button } from '../../components/Button';
import { PhaseCard } from '../../components/PhaseCard';
import { Badge } from '../../components/Badge';

export default function StartupPage() {
  return (
    <div className="bg-[#1e1e1e] relative">
      {/* Background illustration - hero only */}
      <img
        src="/jobs.svg"
        alt=""
        className="absolute top-[98px] left-0 w-full h-[923px] object-cover pointer-events-none opacity-100"
      />

      {/* Dark Navbar - positioned above root navbar */}
      <nav className="flex items-center justify-between w-full px-[52px] py-[43px] fixed top-0 left-0 right-0 z-[60] bg-[#1e1e1e]">
        <div className="flex items-center">
          <img src="/startup.svg" alt="EEG Startup" className="h-[44px]" />
        </div>

        <div className="flex items-center gap-[60px]">
          <a
            href="/programs"
            className="text-white text-lg font-medium hover:opacity-70 transition-opacity"
          >
            EEG/programs
          </a>
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
      <section className="relative z-10 px-[67px] pt-[247px] min-h-screen">
        <div className="flex flex-col gap-8 max-w-[874px]">
          {/* Heading */}
          <h1 className="text-[92px] font-medium leading-none tracking-[-0.075em] text-white">
            Startup Team
          </h1>

          {/* Decoration Icons Row */}
          <div className="flex items-center gap-[55px] flex-wrap pr-[92px]">
            <img src="/dec-1.svg" alt="" className="size-16" />
            <img src="/dec-2.svg" alt="" className="size-16" />
            <img src="/dec-3.svg" alt="" className="size-16" />
            <img src="/dec-4.svg" alt="" className="size-16" />
            <img src="/dec-5.svg" alt="" className="size-16" />
            <img src="/dec-6.svg" alt="" className="size-16" />
            <img src="/dec-7.svg" alt="" className="size-16" />
          </div>

          {/* Description */}
          <p className="text-[28px] font-medium leading-snug tracking-[-0.075em] text-white max-w-[639px]">
            teaches students how real companies are built. We'll guide you through the same frameworks used by early-stage founders — from ideation and validation to product and growth. By the end of 9 weeks, you'll have made money on the internet.
          </p>

          {/* Apply Button */}
          <Button size="lg" className="w-[175px]">
            Apply Now
          </Button>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="relative z-10 px-[72px] py-16">
        <h2 className="text-[28px] font-medium text-white tracking-[-0.075em] mb-12">
          /curriculum
        </h2>

        {/* Timeline Container */}
        <div className="relative min-h-[700px]">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white -translate-x-1/2" />

          {/* Phase 1: Validation - Left */}
          <div className="relative pb-32">
            <div className="w-1/2 pr-16">
              <PhaseCard
                title="Phase 1: Validation"
                description="In weeks 1-3, you'll learn how to interview users and validate problems that are actually worth building for."
                side="left"
              />
            </div>
            {/* Badge */}
            <Badge className="left-[15%] top-[110%]" rotation={-15}>Validate</Badge>
          </div>

          {/* Phase 2: Build - Right */}
          <div className="relative pb-32">
            <div className="w-1/2 ml-auto pl-16">
              {/* Rocket Icon */}
              <div className="flex justify-center mb-4">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-[#AD1DE0]">
                  <path d="M32 8L38 20H26L32 8Z" fill="currentColor"/>
                  <rect x="26" y="20" width="12" height="24" fill="currentColor"/>
                  <path d="M20 44L26 36V44H20Z" fill="currentColor"/>
                  <path d="M44 44L38 36V44H44Z" fill="currentColor"/>
                  <rect x="28" y="44" width="8" height="12" fill="currentColor"/>
                </svg>
              </div>
              <PhaseCard
                title="Phase 2: Build"
                description="In weeks 4-6, you'll turn your validated problem into a real-world solution. Using the latest AI tools, you'll learn to design and ship fast."
                side="right"
              />
            </div>
            {/* Badges */}
            <Badge className="right-[5%] top-0" rotation={15}>Ship Fast</Badge>
            <Badge className="right-[10%] top-[120%]" rotation={10}>Build!</Badge>
          </div>

          {/* Phase 3: Go-To-Market - Left */}
          <div className="relative">
            <div className="w-1/2 pr-16">
              <PhaseCard
                title="Phase 3: Go-To-Market"
                description="In weeks 7-9, it's all about taking your product to market. This is the culmination of your work – go out and figure how to maximize revenue."
                side="left"
              />
            </div>
            {/* Badge */}
            <Badge className="left-[5%] top-[80%]" rotation={-10}>Revenue</Badge>
          </div>
        </div>
      </section>
    </div>
  );
}
