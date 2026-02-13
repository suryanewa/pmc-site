'use client';

import { useState } from 'react';
import Image from 'next/image';
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
import { UnicornHeroBackground } from '../../components/UnicornHeroBackground';

const ACCENT = '#41C9C1';

const curriculumData = [
  {
    title: 'Sessions 1–3',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-left">
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
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-left">
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
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-left">
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
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-left">
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
    title: 'End-to-End Case Study',
    description:
      'A complete end-to-end product case study and a strong understanding of the PM lifecycle.',
  },
  {
    number: '02',
    title: 'Portfolio-Ready Project',
    description:
      'A portfolio-ready product project you can showcase to recruiters and hiring managers.',
  },
  {
    number: '03',
    title: 'PM Frameworks Experience',
    description:
      'Hands-on experience with core PM frameworks and workflows used by industry professionals.',
  },
  {
    number: '04',
    title: 'Industry PM Feedback',
    description:
      'Direct feedback from industry product managers on your work and approach.',
  },
  {
    number: '05',
    title: 'Interview-Ready Artifact',
    description:
      'A strong artifact to use in PM interviews and applications.',
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
      'Short questions about your interest in product management, your background, and how you think about the products you use every day.',
  },
  {
    number: '2',
    title: 'Interview',
    description:
      'A conversation to understand your motivation, problem-solving approach, and fit for a hands-on, fast-paced program.',
  },
];

const speakerCompanies: { name: string; logo?: string; invert?: boolean }[] = [
  { name: 'Stripe', logo: 'https://svgl.app/library/stripe.svg' },
  { name: 'Meta', logo: '/companies/meta.webp', invert: true },
  { name: 'Datadog', logo: 'https://svgl.app/library/datadog.svg' },
  { name: 'NBCUniversal', logo: 'https://svgl.app/library/nbc.svg', invert: true },
  { name: 'Goldman Sachs', logo: 'https://svgl.app/library/goldman-sachs.svg', invert: true },
  { name: 'Boost Payments' },
];

export default function GradBootcampPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="bg-black relative">
      <UnicornHeroBackground projectId="EQvAvFB5IeSsVwWQyJuV" />

      {/* Hero */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-20 pb-16 md:py-24 min-h-screen flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 max-w-4xl text-center">
            <FadeUp>
              <h1 className="section-title text-[#DBDBDB] text-center">
                <TextAnimate as="span" animation="slideLeft" by="character" className="inline">
                  Graduate Bootcamp
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

      {/* Overview */}
      <ProgramOverviewSection
        accentColor={ACCENT}
        description={
          <>
            <p className="mb-6">
              The Graduate Product Management Bootcamp is a selective, hands-on program designed for NYU graduate students who want to break into product management and adjacent roles.
            </p>
            <p className="mb-6">
              Over eight intensive sessions spread across 3–4 weeks, participants choose a product they personally use and believe can be improved, then work through the complete PM workflow — from problem discovery and user research to ideation, MVP planning, PRD writing, prototyping, and testing.
            </p>
            <p>
              The program combines instruction from experienced industry product managers across big tech and startups, with continuous feedback and mentorship from the NYUPMC e-board. By the end, participants leave with a resume-ready, portfolio-ready PM project that reflects how product managers think, build, and communicate.
            </p>
          </>
        }
        whatToExpect={[
          'Problem definition, hypothesis formulation, and clear problem framing',
          'User research through interviews and qualitative analysis',
          'Feature ideation and prioritization',
          'PRD writing and MVP planning',
          'Prototyping, testing, and metrics definition',
          'Presenting your work and receiving feedback from industry PMs',
        ]}
        whatToExpectIntro="You will work on…"
        requirements={[
          'An NYU graduate student across any school',
          'Early in your career with 0–1 years of experience in marketing, design, software engineering, or PM',
          'Interested in product management, product marketing, design, or strategy',
          'Curious about how real products are built and scaled',
          'Motivated to create a strong PM portfolio project',
        ]}
        timeCommitment="~10 hours per week during the program"
        imageSrc="/grad-bootcamp/IMG_0505.webp"
        imageAlt="Graduate Bootcamp session"
      />

      {/* Deliverables */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32 border-t border-[#3F3F3F]/40">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-4 text-center">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                What You&apos;ll Walk Away With
              </TextAnimate>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg text-[#DBDBDB]/70 leading-relaxed mb-16 max-w-2xl mx-auto text-center">
              By the end of the program, you&apos;ll have:
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
                    colors="#41C9C1,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                    fontSize={12}
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

      {/* Gallery */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32 border-t border-[#3F3F3F]/40">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#3F3F3F]/30">
              <div className="relative bg-black aspect-[4/3] overflow-hidden">
                <Image
                  src="/grad-bootcamp/IMG_0509.webp"
                  alt="Bootcamp participants collaborating"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="relative bg-black aspect-[4/3] overflow-hidden">
                <Image
                  src="/grad-bootcamp/IMG_0115.webp"
                  alt="Bootcamp presentation session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="relative bg-black aspect-[4/3] overflow-hidden">
                <Image
                  src="/grad-bootcamp/1761092216594.webp"
                  alt="Bootcamp cohort group photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
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
          steps={applicationSteps}
          roundsText="Our application process has two rounds:"
          introText={
            <>
              <p className="mb-4">
                The Graduate PM Bootcamp admits a small, selective cohort to ensure high-quality feedback and mentorship. Applications open at the{' '}
                <strong className="text-[#DBDBDB]">beginning of the semester</strong>.
              </p>
              <p>
                <a
                  href="#join-us"
                  className="underline underline-offset-4 decoration-current hover:decoration-[#41C9C1] transition-colors"
                >
                  Subscribe to our newsletter
                </a>{' '}
                or follow NYUPMC updates to be the first to know when applications open.
              </p>
            </>
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

      {/* Featured Speakers From */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32 border-t border-[#3F3F3F]/40">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-12 text-center">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Featured Speakers From
              </TextAnimate>
            </h2>
          </FadeUp>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#3F3F3F]/30 max-w-4xl mx-auto">
              {speakerCompanies.map((company) => (
                <div
                  key={company.name}
                  className="flex items-center justify-center h-20 bg-black hover:bg-[#3F3F3F]/10 transition-colors duration-300 px-4"
                >
                  {!company.logo ? (
                    <span className="text-sm font-bold tracking-wide uppercase text-[#DBDBDB]">
                      {company.name}
                    </span>
                  ) : company.logo.startsWith('http') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-8 w-auto object-contain"
                      style={company.invert ? { filter: 'brightness(0) invert(1)' } : undefined}
                    />
                  ) : (
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={120}
                      height={32}
                      className="h-8 w-auto object-contain"
                      style={company.invert ? { filter: 'brightness(0) invert(1)' } : undefined}
                    />
                  )}
                </div>
              ))}
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
              <div
                className="relative overflow-hidden bg-black p-8 md:p-10 text-center group hover:bg-[#3F3F3F]/10 transition-colors duration-300"
                onMouseEnter={() => setHoveredCard('director-sohan')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <AsciiHoverEffect
                  active={hoveredCard === 'director-sohan'}
                  colors="#41C9C1,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                  fontSize={12}
                  className="opacity-40 mix-blend-screen"
                />
                <h4 className="relative z-10 text-xl font-medium text-[#DBDBDB] mb-2">Sohan Joshi</h4>
                <a
                  href="mailto:sohan.joshi@nyu.edu"
                  className="relative z-10 text-sm transition-colors duration-300 hover:underline underline-offset-4"
                  style={{ color: ACCENT }}
                >
                  sohan.joshi@nyu.edu
                </a>
              </div>
              <div
                className="relative overflow-hidden bg-black p-8 md:p-10 text-center group hover:bg-[#3F3F3F]/10 transition-colors duration-300"
                onMouseEnter={() => setHoveredCard('director-shreyam')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <AsciiHoverEffect
                  active={hoveredCard === 'director-shreyam'}
                  colors="#41C9C1,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                  fontSize={12}
                  className="opacity-40 mix-blend-screen"
                />
                <h4 className="relative z-10 text-xl font-medium text-[#DBDBDB] mb-2">Shreyam Borah</h4>
                <a
                  href="mailto:sb10286@nyu.edu"
                  className="relative z-10 text-sm transition-colors duration-300 hover:underline underline-offset-4"
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
      <FAQSection
        variant="eir"
        items={[
          {
            question: 'Who can apply?',
            answer:
              'The Graduate Product Management Bootcamp is open to NYU graduate students across all schools and programs. It is designed for students early in their careers, typically with 0\u20131 years of experience in fields such as engineering, design, marketing, analytics, or strategy, who are exploring product management or adjacent roles. Prior PM experience is not required; the program is best suited for students who are curious about how products are built, motivated to learn by doing, and interested in creating a strong, portfolio-ready PM project.',
          },
          {
            question: 'How much interaction do you get with professionals?',
            answer:
              'Participants have extensive, direct interaction with industry product managers throughout the program. PMs lead the sessions, teach core concepts, evaluate participant work, and provide real-time feedback during presentations. There are built-in opportunities for live Q&A and one-on-one or small-group conversations during sessions, along with access to recruiting and interview insights. Participants also benefit from networking opportunities, including an exclusive industry office tour, enabling meaningful connections with multiple PMs across companies and industries.',
          },
          {
            question: 'How much individual vs. collaborative work is involved?',
            answer:
              'The work is primarily individual, with each participant owning their own end-to-end product case and working independently on their project. At the same time, the program is highly interactive, with structured feedback sessions and presentations where participants review each other\u2019s work, learn from different approaches, and receive critique from both the cohort and the NYU Product Management Club e-board. This setup mirrors real PM environments where individual ownership is paired with peer review and shared learning.',
          },
          {
            question: 'What do the curriculum and deliverables look like?',
            answer:
              'The curriculum is structured around the core product management lifecycle and is delivered in a compressed, intensive format. Participants produce a clear problem statement, user research insights, feature ideas and prioritization logic, an MVP scope, a structured PRD, a testing and metrics plan, and a final product narrative. All deliverables build toward a single, cohesive PM case study designed to be portfolio- and interview-ready.',
          },
          {
            question: 'Are we creating a new product?',
            answer:
              'No, participants work on an existing product that they already use and understand rather than creating a new one from scratch. This approach allows students to focus on realistic user problems, constraints, and tradeoffs, and to practice applying PM frameworks in real-world contexts. The emphasis is on improving and evolving an existing product, which better reflects how product managers operate in practice.',
          },
          {
            question: 'How is this different from the Product Team?',
            answer:
              'Product Team is an undergraduate-focused, semester-long program taught by internal Product Team leads and designed to introduce PM fundamentals over time. The Graduate Product Management Bootcamp is built specifically for graduate students, taught by industry product managers, and delivered in a much more intensive and condensed format. The bootcamp operates at a graduate level, with higher expectations, faster pacing, and a stronger focus on producing a resume-ready PM artifact in a short time frame.',
          },
          {
            question: 'How is this different from the Mentorship Program?',
            answer:
              'The Mentorship Program is a personalized and flexible experience centered on career growth, networking, and skill development through one-on-one guidance with industry product managers. It is ideal for students seeking structured support in breaking into product management, refining resumes and portfolios, preparing for internships and full-time roles, and navigating early career decisions. Unlike the Graduate Product Management Bootcamp, which is project-driven and cohort-based, the Mentorship Program focuses on individual development, long-term guidance, and building meaningful professional relationships.',
          },
        ]}
      />
    </div>
  );
}
