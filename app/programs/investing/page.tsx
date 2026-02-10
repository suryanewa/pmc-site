'use client';

import { Timeline } from '@/components/ui/timeline';
import { FadeUp, FadeIn } from '../../components/ScrollAnimations';
import { Chip } from '../../components/Chip';
import { Button } from '../../components/Button';
import { ApplicationsCountdown } from '../../components/ApplicationsCountdown';
import { JoinUsSection } from '../../components/JoinUsSection';
import { FAQSection } from '../../components/FAQSection';
import TextType from '@/components/TextType';
import { ProgramOverviewSection } from '../../components/ProgramOverviewSection';
import { ProgramApplicationSection } from '../../components/ProgramApplicationSection';

const curriculumData = [
  {
    title: "Weeks 1–2",
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">Phase 1: Foundations</h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">You&apos;ll learn how to think about markets, incentives, power laws, and product–market fit, so you can evaluate companies with clear, repeatable frameworks. The goal is alignment around how value is created and why it compounds.
          In weeks 1 and 2, you&apos;ll build the mental models investors actually use. 
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color="#6966E3">Mental Models</Chip>
          <Chip color="#6966E3">Market Analysis</Chip>
          <Chip color="#6966E3">Value Creation</Chip>
        </div>
      </div>
    ),
  },
  {
    title: "Weeks 3–5",
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">Phase 2: First-Principles Thinking</h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          Now you go deeper. Through company deep dives, debates, and applied exercises, you&apos;ll learn how to break businesses down from first principles and defend clear positions under uncertainty. The focus is on original thinking—pushing past summaries and developing conviction you can stand behind.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color="#6966E3">Deep Dives</Chip>
          <Chip color="#6966E3">Debates</Chip>
          <Chip color="#6966E3">Conviction Building</Chip>
        </div>
      </div>
    ),
  },
  {
    title: "Weeks 6–7",
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">Phase 3: Investing Mechanics</h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          Here, you build real investing fluency. You&apos;ll learn how fund math, dilution, term sheets, and valuation actually work—and how these mechanics shape incentives and outcomes. This phase equips you to analyze real deals through a practical lens.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color="#6966E3">Fund Math</Chip>
          <Chip color="#6966E3">Term Sheets</Chip>
          <Chip color="#6966E3">Valuation</Chip>
        </div>
      </div>
    ),
  },
  {
    title: "Weeks 8–9",
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">Phase 4: Sourcing & Judgment</h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          In the final phase, you operate like an investor. You&apos;ll source companies, pitch ideas, and compare opportunities in fast-paced, competitive settings. By the end, you&apos;re forming independent judgments and articulating why a company will win.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color="#6966E3">Deal Sourcing</Chip>
          <Chip color="#6966E3">Pitch Practice</Chip>
          <Chip color="#6966E3">Investment Thesis</Chip>
        </div>
      </div>
    ),
  },
];


export default function InvestingPage() {
  return (
    <div className="bg-black relative">
      {/* Background illustration - extends beyond hero with fade */}
      <div className="absolute top-0 left-0 w-full h-[110vh] pointer-events-none">
        <img
          src="/traitorous-8.png"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        {/* Gradient fade overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-20 pb-16 md:py-24 min-h-[80vh] md:min-h-screen flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 max-w-3xl text-center">
            <FadeUp>
              <h1 className="section-title text-[#DBDBDB] text-center">
                <TextType
                  text="Investing Team"
                  typingSpeed={45}
                  initialDelay={400}
                  loop={false}
                  showCursor={true}
                  hideCursorOnComplete={true}
                  cursorCharacter="|"
                  className="inline"
                  as="span"
                />
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-base md:text-xl text-[#DBDBDB]/70 leading-relaxed max-w-2xl md:mt-4 mb-8 md:mb-10">
                teaches students how to think like a venture capitalist. You&apos;ll develop critical judgement through deep research, rigorous reading, and structured analysis of real startups, markets, and founders. By the end of 9 weeks, you&apos;ll have what it takes to be a real VC.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <div className="w-full sm:w-auto flex justify-center">
                  <ApplicationsCountdown accentColor="#6966E3" />
                </div>
                <div className="w-full sm:w-auto">
                  <Button
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdcQw779OxVgmhXaUkwDBqMBkfnJU6Dwms5m6tss6jD7ZGVPA/viewform"
                    className="w-full sm:w-auto px-8 py-4 bg-[#41C9C1] hover:bg-[#5076DD] text-black"
                    fillColor="#41C9C1"
                    textColor="#000000"
                    rippleColor="#5076DD"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Chat With Us
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Pixel art icons - directly below hero */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-8">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="flex justify-center">
              <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-10">
                <img src="/Group.svg" alt="" className="size-16 md:size-20 lg:size-24" />
                <img src="/Group-1.svg" alt="" className="size-16 md:size-20 lg:size-24" />
                <img src="/Group-2.svg" alt="" className="size-16 md:size-20 lg:size-24" />
                <img src="/Group-3.svg" alt="" className="size-16 md:size-20 lg:size-24" />
                <img src="/Group-4.svg" alt="" className="hidden sm:block size-16 md:size-20 lg:size-24" />
                <img src="/Group-5.svg" alt="" className="hidden sm:block size-16 md:size-20 lg:size-24" />
                <img src="/Group-6.svg" alt="" className="hidden md:block size-16 md:size-20 lg:size-24" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Overview Section */}
      <ProgramOverviewSection
        accentColor="#6966E3"
        description={
          <>
            <p className="mb-6">
              Investing Team is a 9 week program aiming to equip students with a wide-ranging skill set, particularly emphasizing analysis of startups through the lens of venture capital.
            </p>
            <p>
              By empowering students with both a strong skill set and valuable resources, we position them for success in their future careers.
            </p>
          </>
        }
        whatToExpect={[
          "Early & growth equity stage startup pitches",
          "Industry report",
          "Industry investment pitch",
          "IPO analysis",
          "DCF valuations"
        ]}
        requirements={[
          "Must be a first or second year undergrad student",
          "No prior experience expected. We're here to teach you!",
          "A strong curiosity for tech, startups, and venture capital"
        ]}
        imageSrc="/traitorous-8.png"
      />

      {/* Curriculum Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-24 pb-24 min-h-[100vh]">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-0 text-center">
              <TextType
                text="Curriculum"
                typingSpeed={45}
                initialDelay={100}
                loop={false}
                showCursor={true}
                hideCursorOnComplete={true}
                cursorCharacter="|"
                className="inline"
                as="span"
                startOnVisible={true}
              />
            </h2>
          </FadeUp>

          {/* Timeline with Phase Cards */}
          <FadeIn delay={0.2}>
            <div className="dark">
              <Timeline data={curriculumData} showHeader={false} lineColor="#6966E3" />
            </div>
          </FadeIn>
        </div>
      </section>

      <ProgramApplicationSection accentColor="#6966E3" programTitle="investing" />

      <JoinUsSection variant="investing" newsletterSource="investing-program" />
      <FAQSection variant="investing" />
    </div>
  );
}
