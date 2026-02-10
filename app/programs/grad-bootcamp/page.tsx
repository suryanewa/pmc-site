'use client';

import { Timeline } from '@/components/ui/timeline';
import { FadeUp, FadeIn } from '../../components/ScrollAnimations';
import { Chip } from '../../components/Chip';
import { Button } from '../../components/Button';
import { ApplicationsCountdown } from '../../components/ApplicationsCountdown';
import { JoinUsSection } from '../../components/JoinUsSection';
import { FAQSection } from '../../components/FAQSection';
import { TextAnimate } from '@/components/ui/text-animate';
import { ProgramOverviewSection } from '../../components/ProgramOverviewSection';
import { ProgramApplicationSection } from '../../components/ProgramApplicationSection';

const ACCENT = '#41C9C1';

const curriculumData = [
  {
    title: 'Sessions 1–3',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">
          Phase 1: Research &amp; Problem Framing
        </h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          Start by choosing a product you use and love. Through interviews, surveys, and journey
          mapping, you&apos;ll uncover real user problems and frame them clearly using Design
          Thinking principles. You&apos;ll develop opportunity statements that guide every
          decision that follows.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color={ACCENT}>User Research</Chip>
          <Chip color={ACCENT}>Journey Mapping</Chip>
          <Chip color={ACCENT}>Problem Framing</Chip>
        </div>
      </div>
    ),
  },
  {
    title: 'Sessions 4–5',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">
          Phase 2: Ideation &amp; Prioritization
        </h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          Generate solutions using frameworks like SCAMPER and Crazy 8s, then ruthlessly
          prioritize with RICE and MoSCoW. You&apos;ll develop a clear value proposition and
          define the features that matter most for your MVP.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color={ACCENT}>SCAMPER</Chip>
          <Chip color={ACCENT}>Crazy 8s</Chip>
          <Chip color={ACCENT}>RICE &amp; MoSCoW</Chip>
        </div>
      </div>
    ),
  },
  {
    title: 'Sessions 6–8',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">
          Phase 3: PRD, Prototyping &amp; Testing
        </h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          Write a production-ready PRD, build your MVP prototype, and run usability testing.
          You&apos;ll plan metrics using AARRR and HEART frameworks, turning your product concept
          into something measurable and defensible.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color={ACCENT}>PRD Writing</Chip>
          <Chip color={ACCENT}>MVP Prototyping</Chip>
          <Chip color={ACCENT}>Usability Testing</Chip>
        </div>
      </div>
    ),
  },
  {
    title: 'Sessions 9–10',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">
          Phase 4: Storytelling &amp; Presentations
        </h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          Craft your product narrative and go-to-market strategy. The program culminates in
          final presentations to industry PMs, where you&apos;ll showcase your complete journey
          from problem to solution and receive direct professional feedback.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color={ACCENT}>Product Storytelling</Chip>
          <Chip color={ACCENT}>Go-to-Market</Chip>
          <Chip color={ACCENT}>Final Presentations</Chip>
        </div>
      </div>
    ),
  },
];

const deliverables = [
  {
    number: '01',
    title: 'Portfolio-Ready PRD',
    description:
      'A complete Product Requirements Document showing your journey from user research to MVP.',
  },
  {
    number: '02',
    title: 'User Research Summaries',
    description:
      'Journey maps and opportunity statements backed by real user interviews and surveys.',
  },
  {
    number: '03',
    title: 'Prioritized Feature Sets',
    description:
      'Clear OKRs and success metrics with features prioritized using industry frameworks.',
  },
  {
    number: '04',
    title: 'Working Prototype',
    description:
      'A working prototype or vibe-coded MVP demonstrating your product vision.',
  },
  {
    number: '05',
    title: 'Presentation Deck',
    description:
      'A complete deck showcasing Problem, Research, Ideation, MVP, Metrics, and Next Steps.',
  },
  {
    number: '06',
    title: 'Resume-Ready Project',
    description:
      'A project to showcase in PM interviews and internship applications with real feedback from industry PMs.',
  },
];

const skills = [
  'User research methodologies',
  'Design Thinking & Lean Startup',
  'Jobs To Be Done (JTBD)',
  'Customer journey mapping',
  'RICE & MoSCoW prioritization',
  'PRD writing & roadmapping',
  'AARRR & HEART metrics',
  'Prototyping & usability testing',
  'Product storytelling',
  'Go-to-market strategy',
  'Agile / Scrum fundamentals',
  'Custom KPI planning',
];

const applicationSteps = [
  {
    number: '1',
    title: 'Written Application',
    description:
      'Questions about your interests in product management, your experience, and how you think about products you use every day.',
  },
  {
    number: '2',
    title: 'Interview',
    description:
      'A conversation to get to know you better and understand how you approach problem-solving.',
  },
];

export default function GradBootcampPage() {
  return (
    <div className="bg-black relative">
      <div className="absolute top-0 left-0 w-full h-[110vh] pointer-events-none">
        <img src="/bill.png" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Hero */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-20 pb-16 md:py-24 min-h-screen flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 max-w-4xl text-center">
            <FadeUp>
              <h1 className="section-title text-[#DBDBDB] text-center">
                <TextAnimate as="span" animation="slideLeft" by="character" className="inline">
                  Graduate PM Bootcamp
                </TextAnimate>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-lg md:text-xl text-[#DBDBDB]/70 leading-[1.6] max-w-2xl md:mt-4 mb-8 md:mb-10">
                A 10-day intensive program for a select cohort of 10–12 NYU graduate students to
                experience the full product management lifecycle. From user research to
                production-ready PRDs, you&apos;ll bring your product ideas to life.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <div className="w-full sm:w-auto flex justify-center">
                  <ApplicationsCountdown accentColor={ACCENT} />
                </div>
                <div className="w-full sm:w-auto">
                  <Button
                    href="#application"
                    className="w-full sm:w-auto px-8 py-4"
                    fillColor={ACCENT}
                    textColor="#000000"
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

      {/* Pixel art icons */}
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

      {/* Overview */}
      <ProgramOverviewSection
        accentColor={ACCENT}
        description={
          <>
            <p className="mb-6">
              The Graduate PM Bootcamp is a 10-day intensive program designed for a select cohort
              of 10–12 NYU graduate students to experience the full product management lifecycle.
              Participants choose a product they use and love, identify user problems, and develop
              effective solutions from the ground up—just like product managers do every day.
            </p>
            <p>
              Guided by experienced industry PMs and mentored by the NYUPMC e-board, our cohorts
              gain practical skills and bring their product ideas to life.
            </p>
          </>
        }
        whatToExpect={[
          'User research through interviews, surveys, and journey mapping',
          'Problem framing and value proposition development',
          'Solution ideation using SCAMPER and Crazy 8s',
          'Feature prioritization with RICE and MoSCoW',
          'PRD development and MVP prototyping',
          'Usability testing and metrics planning (AARRR & HEART)',
          'Product storytelling and go-to-market strategy',
          'Final presentations to industry PMs',
        ]}
        whatToExpectIntro="You will work on:"
        requirements={[
          'An NYU graduate student',
          '0–1 years of internship or work experience in software engineering, marketing, or design',
          'New to Product Management — we\'re here to help you do real PM work!',
          'Curious about how products are built and how to apply frameworks like Design Thinking, Lean Startup, and Agile',
          'Passionate about solving user problems and creating impact',
        ]}
        timeCommitment="2.5 hours / session + independent work"
        imageSrc="/bill.png"
      />

      {/* Deliverables */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32 border-t border-[#3F3F3F]/40">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-4 text-center">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Join the Bootcamp to...
              </TextAnimate>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg text-[#DBDBDB]/70 leading-relaxed mb-16 max-w-2xl mx-auto text-center">
              Produce quality deliverables and develop the core PM skills that employers demand.
            </p>
          </FadeUp>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#3F3F3F]/30">
              {deliverables.map((item) => (
                <div
                  key={item.number}
                  className="bg-black p-8 md:p-10 group hover:bg-[#3F3F3F]/10 transition-colors duration-300 cursor-default"
                >
                  <span
                    className="block text-sm font-medium tracking-widest uppercase mb-4 transition-colors duration-300"
                    style={{ color: ACCENT }}
                  >
                    {item.number}
                  </span>
                  <h4 className="text-lg font-medium text-[#DBDBDB] mb-3">{item.title}</h4>
                  <p className="text-[#DBDBDB]/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Skills */}
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
              Develop expertise in core PM frameworks and methodologies used by industry professionals.
            </p>
          </FadeUp>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {skills.map((skill) => (
                <Chip key={skill} color={ACCENT}>
                  {skill}
                </Chip>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Curriculum */}
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

      {/* Application */}
      <div id="application">
        <ProgramApplicationSection
          accentColor={ACCENT}
          programTitle="bootcamp"
          steps={applicationSteps}
          roundsText="Our application consists of 2 rounds."
          introText={
            <p>
              We open applications at the{' '}
              <strong className="text-[#DBDBDB]">beginning of each semester</strong>.{' '}
              <a
                href="#join-us"
                className="underline underline-offset-4 decoration-current hover:decoration-[#41C9C1] transition-colors"
              >
                Subscribe to our newsletter
              </a>{' '}
              or follow NYUPMC to be the first to know when applications go live!
            </p>
          }
        />
      </div>

      {/* Schedule */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32 border-t border-[#3F3F3F]/40">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-12 text-center">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Schedule
              </TextAnimate>
            </h2>
          </FadeUp>
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#3F3F3F]/30 max-w-4xl mx-auto">
              <div className="bg-black p-8 md:p-10 text-center">
                <span className="block text-3xl md:text-4xl font-medium mb-3" style={{ color: ACCENT }}>
                  10
                </span>
                <p className="text-[#DBDBDB]/70 text-sm leading-relaxed">
                  Sessions between February&nbsp;23 and March&nbsp;27
                </p>
              </div>
              <div className="bg-black p-8 md:p-10 text-center">
                <span className="block text-3xl md:text-4xl font-medium mb-3" style={{ color: ACCENT }}>
                  2.5 hrs
                </span>
                <p className="text-[#DBDBDB]/70 text-sm leading-relaxed">
                  Per session, 6:00–8:30 PM, plus independent deliverable work
                </p>
              </div>
              <div className="bg-black p-8 md:p-10 text-center">
                <span className="block text-3xl md:text-4xl font-medium mb-3" style={{ color: ACCENT }}>
                  10–12
                </span>
                <p className="text-[#DBDBDB]/70 text-sm leading-relaxed">
                  Select cohort of NYU graduate students per session
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Directors */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32 border-t border-[#3F3F3F]/40">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-4 text-center">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Questions?
              </TextAnimate>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg text-[#DBDBDB]/70 leading-relaxed mb-12 max-w-2xl mx-auto text-center">
              Contact the Program Directors
            </p>
          </FadeUp>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#3F3F3F]/30 max-w-2xl mx-auto">
              <div className="bg-black p-8 md:p-10 text-center group hover:bg-[#3F3F3F]/10 transition-colors duration-300">
                <h4 className="text-xl font-medium text-[#DBDBDB] mb-2">Sohan Joshi</h4>
                <a
                  href="mailto:sohan.joshi@nyu.edu"
                  className="text-sm transition-colors duration-300 hover:underline underline-offset-4"
                  style={{ color: ACCENT }}
                >
                  sohan.joshi@nyu.edu
                </a>
              </div>
              <div className="bg-black p-8 md:p-10 text-center group hover:bg-[#3F3F3F]/10 transition-colors duration-300">
                <h4 className="text-xl font-medium text-[#DBDBDB] mb-2">Shreyam Borah</h4>
                <a
                  href="mailto:sb10286@nyu.edu"
                  className="text-sm transition-colors duration-300 hover:underline underline-offset-4"
                  style={{ color: ACCENT }}
                >
                  sb10286@nyu.edu
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <JoinUsSection variant="eir" newsletterSource="grad-bootcamp-program" />
      <FAQSection variant="eir" />
    </div>
  );
}
