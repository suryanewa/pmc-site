"use client";

import { Timeline } from "@/components/ui/timeline";
import { FadeUp, FadeIn } from "../../components/ScrollAnimations";
import { Chip } from "../../components/Chip";
import { Button } from "../../components/Button";
import { ApplicationsCountdown } from "../../components/ApplicationsCountdown";
import { JoinUsSection } from "../../components/JoinUsSection";
import { FAQSection } from "../../components/FAQSection";
import TiltedCard from "@/components/TiltedCard";
import TextType from "@/components/TextType";
import { ProgramOverviewSection } from "../../components/ProgramOverviewSection";
import { ProgramApplicationSection } from "../../components/ProgramApplicationSection";

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
    title: 'Weeks 1-2',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">Phase 1: Selection & Alignment</h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          You begin with a highly selective application and interview process designed to identify
          founders who are serious about building. Once admitted, you’ll meet your cohort over
          dinner and align on expectations, goals, and how to get the most out of the program.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color="#41C9C1">Alignment</Chip>
          <Chip color="#41C9C1">Kickoff</Chip>
          <Chip color="#41C9C1">Community</Chip>
        </div>
      </div>
    ),
  },
  {
    title: 'Weeks 3-7',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">Phase 2: Build, Learn, and Iterate</h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          This is the core of the program. You’ll participate in founder dinners, need-based
          workshops, and office hours with VC partners, all tailored to the specific challenges your
          startup is facing, whether you’re refining your idea, building an MVP, or pushing toward
          revenue.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color="#41C9C1">Mentorship</Chip>
          <Chip color="#41C9C1">Learning</Chip>
          <Chip color="#41C9C1">Workshops</Chip>
        </div>
      </div>
    ),
  },
  {
    title: 'Weeks 8-9',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">Phase 3: Exposure & Outcomes</h4>
          <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          The semester culminates in optional pitch opportunities and deeper VC exposure. You’ll
          reflect on your progress, sharpen your narrative, and present your company to investors,
          peers, and the broader startup community. You&apos;ll leave the program with momentum,
          clarity, and a stronger founder network.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color="#41C9C1">Pitch</Chip>
          <Chip color="#41C9C1">Network</Chip>
          <Chip color="#41C9C1">Raise</Chip>
        </div>
      </div>
    ),
  },
];

export default function EirPage() {
  return (
    <div className="bg-black relative">
      {/* Background illustration - extends beyond hero with fade */}
      <div className="absolute top-0 left-0 w-full h-[110vh] pointer-events-none">
        <img
          src="/bill.png"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        {/* Gradient fade overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-20 pb-16 md:py-24 min-h-[80vh] md:min-h-screen flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 max-w-4xl text-center">
            <FadeUp>
              <h1 className="section-title text-[#DBDBDB] text-center">
                <TextType
                  text="Entrepreneurs In Residence"
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
                PMC’s new unique accelerator program for NYU founders: tailored workshops, expert
                mentorship, and top-tier VC networking – focused on individual startup needs in a
                growth-centric community.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <div className="w-full sm:w-auto flex justify-center">
                  <ApplicationsCountdown accentColor="#41C9C1" />
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
                <img src="/design-color-palette-sample.svg" alt="" className="size-16 md:size-20 lg:size-24" />
                <img src="/design-ruler.svg" alt="" className="size-16 md:size-20 lg:size-24" />
                <img src="/design-layer.svg" alt="" className="size-16 md:size-20 lg:size-24" />
                <img src="/design-block.svg" alt="" className="size-16 md:size-20 lg:size-24" />
                <img src="/design-website.svg" alt="" className="hidden sm:block size-16 md:size-20 lg:size-24" />
                <img src="/design-coding.svg" alt="" className="hidden sm:block size-16 md:size-20 lg:size-24" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Overview Section */}
      <ProgramOverviewSection
        accentColor="#41C9C1"
        description={
          <>
            <p className="mb-6">
              Entrepreneurs In Residence (EIR) is a selective accelerator program for NYU founders. We provide tailored workshops, expert mentorship, and top-tier VC networking – focused on individual startup needs in a growth-centric community.
            </p>
            <p>
              This is not a class. It is a commitment to building your company alongside other high-agency founders.
            </p>
          </>
        }
        whatToExpect={[
          "Weekly founder dinners",
          "Need-based workshops",
          "Partner office hours",
          "Investor pitch opportunities",
          "Demo Day presentation"
        ]}
        requirements={[
          "Must have an existing startup or strong idea",
          "Commitment to the 9-week program",
          "Openness to feedback and iteration"
        ]}
        imageSrc="/eir.png"
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
              <Timeline data={curriculumData} showHeader={false} lineColor="#41C9C1" />
            </div>
          </FadeIn>
        </div>
      </section>

      <ProgramApplicationSection accentColor="#41C9C1" programTitle="eir" />

      {/* EIR Companies Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-4 text-center">
              <TextType
                text="EIR Companies"
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

          <FadeUp delay={0.1}>
            <p className="text-lg text-[#DBDBDB]/60 leading-relaxed mb-12 max-w-2xl">
              Companies built by founders in our EIR program.
            </p>
          </FadeUp>

          {/* Company Logos Grid */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {eirCompanies.map((company) => (
                <TiltedCard
                  key={company.name}
                  containerHeight="220px"
                  imageHeight="220px"
                  imageWidth="100%"
                  containerWidth="100%"
                  rotateAmplitude={10}
                  scaleOnHover={1.04}
                  showMobileWarning={false}
                  showTooltip={false}
                  borderRadius={0}
                  backgroundColor="#3F3F3F"
                  backgroundContent={(isHovered: boolean) => (
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex h-full w-full items-center justify-center border border-[#3F3F3F]/60 bg-transparent transition-colors duration-300"
                      style={{
                        backgroundColor: isHovered ? "rgba(65, 201, 193, 0.08)" : "transparent",
                        borderColor: isHovered ? "#41C9C1" : "rgba(219,219,219,0.2)",
                      }}
                    >
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="max-h-8 sm:max-h-10 md:max-h-12 w-auto object-contain brightness-0 invert"
                      />
                    </a>
                  )}
                  pixelEffect={{
                    colors: "#41C9C1,rgba(219,219,219,0.7),rgba(63,63,63,0.8)",
                    gap: 7,
                    speed: 28,
                    className: "opacity-40 mix-blend-screen",
                  }}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <JoinUsSection variant="eir" newsletterSource="eir-program" />
      <FAQSection variant="eir" />
    </div>
  );
}
