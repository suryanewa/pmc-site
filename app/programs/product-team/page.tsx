'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import { Timeline } from '@/components/ui/timeline';
import { FadeUp, FadeIn } from '../../components/ScrollAnimations';
import { Chip } from '../../components/Chip';
import { Button } from '../../components/Button';
import { JoinUsSection } from '../../components/JoinUsSection';
import { FAQSection } from '../../components/FAQSection';
import { TextAnimate } from '@/components/ui/text-animate';
import { ProgramOverviewSection } from '../../components/ProgramOverviewSection';
import { ProgramApplicationSection } from '../../components/ProgramApplicationSection';
import AsciiHoverEffect from '@/components/AsciiHoverEffect';

const UnicornScene = dynamic(() => import('unicornstudio-react/next'), { ssr: false });

const ACCENT = '#5076DD';

const curriculumData = [
  {
    title: 'Weeks 1–3',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">
          Phase 1: Research &amp; Discovery
        </h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          Before building anything, you&apos;ll learn to uncover real user problems. Through
          interviews, surveys, and data analysis, you&apos;ll develop the research instincts every
          great PM needs. This phase is about understanding people deeply and finding opportunities
          worth pursuing.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color={ACCENT}>User Interviews</Chip>
          <Chip color={ACCENT}>Data Analysis</Chip>
          <Chip color={ACCENT}>Problem Discovery</Chip>
        </div>
      </div>
    ),
  },
  {
    title: 'Weeks 4–6',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">
          Phase 2: Ideation &amp; Prototyping
        </h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          Now you move from insights to solutions. You&apos;ll generate features, test value
          propositions, and build interactive prototypes and wireframes. The focus is on turning
          research into tangible product concepts that solve real problems.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color={ACCENT}>Feature Ideation</Chip>
          <Chip color={ACCENT}>Wireframes</Chip>
          <Chip color={ACCENT}>Prototyping</Chip>
        </div>
      </div>
    ),
  },
  {
    title: 'Weeks 7–8',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">
          Phase 3: Strategy &amp; Roadmapping
        </h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          With a validated solution in hand, you&apos;ll build the strategic framework around it.
          Product strategy, roadmapping, and launch planning come together as you prepare to
          present your complete vision to industry professionals.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color={ACCENT}>Product Strategy</Chip>
          <Chip color={ACCENT}>Roadmapping</Chip>
          <Chip color={ACCENT}>Launch Planning</Chip>
        </div>
      </div>
    ),
  },
  {
    title: 'Weeks 9–10',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">
          Phase 4: Presentations &amp; Feedback
        </h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          The program culminates in two rounds of presentations to industry PMs. You&apos;ll
          refine your storytelling, defend your decisions, and receive direct feedback from
          professionals who do this work every day. You&apos;ll leave with a polished case study
          and real presentation experience.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color={ACCENT}>Presentations</Chip>
          <Chip color={ACCENT}>PM Feedback</Chip>
          <Chip color={ACCENT}>Case Study</Chip>
        </div>
      </div>
    ),
  },
];

const deliverables = [
  {
    number: '01',
    title: 'Product Case Study',
    description:
      'A complete case study showing your journey from user research to final solution.',
  },
  {
    number: '02',
    title: 'High-Fidelity Prototypes',
    description:
      'Interactive prototypes of your product features built in Figma.',
  },
  {
    number: '03',
    title: 'Product Roadmap',
    description:
      'Product roadmaps and launch strategies ready for stakeholder review.',
  },
  {
    number: '04',
    title: 'Industry Feedback',
    description:
      'Experience presenting to and getting feedback from industry-specific professionals.',
  },
  {
    number: '05',
    title: 'Portfolio Piece',
    description:
      'A solid portfolio piece to showcase in PM interviews and recruiting.',
  },
  {
    number: '06',
    title: 'Exclusive Events',
    description:
      'Access to workshops and office tours with leading product organizations.',
  },
];

const skills = [
  'User research & insight extraction',
  'Feature prioritization frameworks',
  'Figma prototyping',
  'Stakeholder management',
  'Data-driven decision making',
  'Value proposition testing',
  'Product roadmapping',
  'Presentation & storytelling',
];

const applicationSteps = [
  {
    number: '1',
    title: 'Written Application',
    description:
      'Questions about your interests in product management and how you think about products you use every day.',
  },
  {
    number: '2',
    title: 'Interview',
    description:
      'A conversation to get to know you better and understand how you approach problem-solving.',
  },
];

export default function ProductTeamPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="bg-black relative">
      {/* Background WebGL scene */}
      <div className="absolute top-0 left-0 w-full h-[110vh] pointer-events-none">
        <UnicornScene
          projectId="a4deINddypTDvltPc07V"
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
          width="100%"
          height="100%"
        />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-20 pb-16 md:py-24 min-h-screen flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 max-w-3xl text-center">
            <FadeUp>
              <h1 className="section-title text-[#DBDBDB] text-center">
                <TextAnimate as="span" animation="slideLeft" by="character" className="inline">
                  Product Team
                </TextAnimate>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <div className="w-full sm:w-auto">
                  <Button
                    href="#application"
                    className="w-full sm:w-auto px-8 py-4"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Apply Now
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
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

      {/* Overview Section */}
      <ProgramOverviewSection
        accentColor={ACCENT}
        description={
          <>
            <p className="mb-6">
              Product Team is a 10-week hands-on program designed for a select cohort of students
              to experience the full product management lifecycle. From ideation to production
              specifications, students choose a product they use and love, identify user problems,
              and develop effective solutions from the ground up.
            </p>
            <p>
              Guided by experienced PMs, our cohorts gain practical skills and bring their product
              ideas to life—just like product managers do every day.
            </p>
          </>
        }
        whatToExpect={[
          'User research through interviews and data analysis',
          'Feature ideation and value proposition testing',
          'Interactive prototypes and wireframes',
          'Product strategy and roadmapping',
          'Two rounds of presentations to industry PMs',
        ]}
        whatToExpectIntro="You will work on:"
        requirements={[
          'A first or second year undergrad student',
          'New to Product Management — we\'re here to help you do real PM work!',
          'Curious about technology and how products are built',
          'Passionate about solving user problems and creating impact',
        ]}
        timeCommitment="6–7 hours / week"
        imageSrc="/product-team/6796689aa6dd4f0210c8eff0_IMG_8903.jpg"
      />

      {/* Deliverables Section — "Join P-Team to..." */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32 border-t border-[#3F3F3F]/40">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-4 text-center">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Join P-Team to...
              </TextAnimate>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg text-[#DBDBDB]/70 leading-relaxed mb-16 max-w-2xl mx-auto text-center">
              Produce quality deliverables and develop the skills that define great product managers.
            </p>
          </FadeUp>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#3F3F3F]/30">
              {deliverables.map((item) => (
                <div
                  key={item.number}
                  className="relative overflow-hidden bg-black p-8 md:p-10 group hover:bg-[#3F3F3F]/10 transition-colors duration-300 cursor-default"
                  onMouseEnter={() => setHoveredCard(`deliverable-${item.number}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <AsciiHoverEffect
                    active={hoveredCard === `deliverable-${item.number}`}
                    colors="#5076DD,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                    fontSize={10}
                    className="opacity-40 mix-blend-screen"
                  />
                  <span
                    className="relative z-10 block text-sm font-medium tracking-widest uppercase mb-4 transition-colors duration-300"
                    style={{ color: ACCENT }}
                  >
                    {item.number}
                  </span>
                  <h4 className="relative z-10 text-lg font-medium text-[#DBDBDB] mb-3">{item.title}</h4>
                  <p className="relative z-10 text-[#DBDBDB]/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-4 text-center">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Skills You&apos;ll Develop
              </TextAnimate>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg text-[#DBDBDB]/70 leading-relaxed mb-12 max-w-2xl mx-auto text-center">
              Develop expertise in both hard and soft skills that employers value most.
            </p>
          </FadeUp>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {skills.map((skill) => (
                <Chip key={skill} color={ACCENT}>
                  {skill}
                </Chip>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Building Together */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-12 text-center">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Building Together
              </TextAnimate>
            </h2>
          </FadeUp>
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="relative aspect-[4/3] overflow-hidden border border-[#3F3F3F]/40">
                <Image src="/product-team/IMG_9983.jpeg" alt="Product Team working together" fill className="object-cover" sizes="(max-width: 768px) 50vw, 50vw" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-[#3F3F3F]/40">
                <Image src="/product-team/IMG_1511.jpeg" alt="Product Team collaboration" fill className="object-cover" sizes="(max-width: 768px) 50vw, 50vw" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-[#3F3F3F]/40">
                <Image src="/product-team/screenshot-feb-2026.png" alt="Product Team session" fill className="object-cover" sizes="(max-width: 768px) 50vw, 50vw" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-[#3F3F3F]/40">
                <Image src="/product-team/productteamf24.webp" alt="Product Team Fall 2024" fill className="object-cover" sizes="(max-width: 768px) 50vw, 50vw" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-32 pb-32 min-h-[100vh]">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-0 text-center">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Curriculum
              </TextAnimate>
            </h2>
          </FadeUp>
          <FadeIn delay={0.2}>
            <div className="dark">
              <Timeline data={curriculumData} showHeader={false} lineColor={ACCENT} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Application Section */}
      <div id="application">
        <ProgramApplicationSection
          accentColor={ACCENT}
          steps={applicationSteps}
          roundsText="Our application consists of 2 rounds."
          introText={
            <p>
              We open our applications at the{' '}
              <strong className="text-[#DBDBDB]">beginning of each semester</strong>.{' '}
              <a
                href="#join-us"
                className="underline underline-offset-4 decoration-current hover:decoration-[#5076DD] transition-colors"
              >
                Subscribe to our newsletter
              </a>{' '}
              to be the first to know when it comes out!
            </p>
          }
        />
      </div>

      <JoinUsSection variant="startup" newsletterSource="product-team-program" />
      <FAQSection variant="startup" />
    </div>
  );
}
