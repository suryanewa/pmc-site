'use client';

import { Timeline } from '@/components/ui/timeline';
import { FadeUp, FadeIn } from '../../components/ScrollAnimations';
import { JoinUsSection } from '../../components/JoinUsSection';
import { FAQSection } from '../../components/FAQSection';
import { Chip } from '../../components/Chip';
import { Button } from '../../components/Button';
import { ApplicationsCountdown } from '../../components/ApplicationsCountdown';
import TextType from '@/components/TextType';
import { ProgramOverviewSection } from '../../components/ProgramOverviewSection';
import { ProgramApplicationSection } from '../../components/ProgramApplicationSection';


const curriculumData = [
  {
    title: "Weeks 1-3",
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">Phase 1: Validation</h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
        Before you build anything, you’ll learn how to identify real problems and test whether people actually care. This phase is about developing sharp founder instincts through user interviews, pattern recognition, and ruthless honesty. If the problem isn’t real, nothing else matters.        </p>
        <div className="flex flex-wrap gap-3">
        <Chip color="#5076DD">
        User Interviews
          </Chip>
          <Chip color="#5076DD">
          Problem Discovery
          </Chip>
          <Chip color="#5076DD">
          Market Research
          </Chip>
        </div>
      </div>
    ),
  },
  {
    title: "Weeks 4-6",
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">Phase 2: Build</h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
        Now you move from ideas to proof. Using modern AI tools and rapid iteration, you’ll design, prototype, and ship early versions of your product to validate direction fast. The focus is on progress over polish, proof over slides, and learning through real-world feedback.</p>      <div className="flex flex-wrap gap-3">
        <Chip color="#5076DD">
            AI-Powered Development
          </Chip>
          <Chip color="#5076DD">
          Product Design
          </Chip>
          <Chip color="#5076DD">
          Ship Fast
          </Chip>
        </div>
      </div>
    ),
  },
  {
    title: "Weeks 7-9",
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">Phase 3: Distribution & Growth</h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
        Building is only half the battle. You’ll learn how startups actually grow—through distribution, positioning, and scrappy go-to-market execution. Whether B2B or B2C, this phase teaches you how to get users, test channels, and build momentum where incumbents move slowly. </p>
                <div className="flex flex-wrap gap-3">
        <Chip color="#5076DD">
            Launch Strategy
          </Chip>
          <Chip color="#5076DD">
          Growth Tactics
          </Chip>
          <Chip color="#5076DD">
          Revenue
          </Chip>
        </div>
      </div>
    ),
  },
];

export default function StartupPage() {
  return (
    <div className="bg-black relative">
      {/* Background illustration - extends beyond hero with fade */}
      <div className="absolute top-0 left-0 w-full h-[110vh] pointer-events-none">
        <img
          src="/jobs.svg"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Gradient fade overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-20 pb-16 md:py-24 min-h-[80vh] md:min-h-screen flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 max-w-3xl text-center">
          
            {/* Heading */}
            <FadeUp>
              <h1 className="section-title text-[#DBDBDB] text-center">
                <TextType
                  text="Startup Team"
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

            {/* Description */}
            <FadeUp delay={0.2}>
              <p className="text-base md:text-xl text-[#DBDBDB]/70 leading-relaxed max-w-2xl md:mt-4 mb-8 md:mb-10">
                teaches students how real companies are built. We&apos;ll guide you through the same frameworks used by early-stage founders — from ideation and validation to product and growth. By the end of 9 weeks, you&apos;ll have made money on the internet.
              </p>
            </FadeUp>

            {/* Chip and Button Row */}
            <FadeUp delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <div className="w-full sm:w-auto flex justify-center">
                  <ApplicationsCountdown accentColor="#5076DD" />
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
                <img src="/dec-1.svg" alt="" className="size-16 md:size-20 lg:size-24" />
                <img src="/dec-2.svg" alt="" className="size-16 md:size-20 lg:size-24" />
                <img src="/dec-3.svg" alt="" className="size-16 md:size-20 lg:size-24" />
                <img src="/dec-4.svg" alt="" className="size-16 md:size-20 lg:size-24" />
                <img src="/dec-5.svg" alt="" className="hidden sm:block size-16 md:size-20 lg:size-24" />
                <img src="/dec-6.svg" alt="" className="hidden sm:block size-16 md:size-20 lg:size-24" />
                <img src="/dec-7.svg" alt="" className="hidden md:block size-16 md:size-20 lg:size-24" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Overview Section */}
      <ProgramOverviewSection
        accentColor="#5076DD"
        description={
          <>
            <p className="mb-6">
              Startup Team is a 9 week program aiming to equip students with the tools to build real companies. We guide you through the same frameworks used by early-stage founders — from ideation and validation to product and growth.
            </p>
            <p>
              By the end of 9 weeks, you&apos;ll have validated a problem, built a solution, and aimed to make your first dollar on the internet.
            </p>
          </>
        }
        whatToExpect={[
          "User interview scripts & insights",
          "MVP product specification",
          "Go-to-market strategy",
          "Pitch deck for demo day",
          "Revenue generation"
        ]}
        requirements={[
          "Must be a first or second year undergrad student",
          "No prior experience expected",
          "A strong bias for action and building"
        ]}
        imageSrc="/jobs.svg"
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
              <Timeline data={curriculumData} showHeader={false} lineColor="#5076DD" />
            </div>
          </FadeIn>
        </div>
      </section>

      <ProgramApplicationSection accentColor="#5076DD" programTitle="startup" />

      <JoinUsSection variant="startup" newsletterSource="startup-program" />
      <FAQSection variant="startup" />
    </div>
  );
}
