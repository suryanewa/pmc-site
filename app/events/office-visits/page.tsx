'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import { FadeUp, StaggerContainer, StaggerItem } from '../../components/ScrollAnimations';

const UnicornScene = dynamic(() => import('unicornstudio-react/next'), { ssr: false });
import { JoinUsSection } from '../../components/JoinUsSection';
import { FAQSection } from '../../components/FAQSection';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { TextAnimate } from '@/components/ui/text-animate';
import AsciiHoverEffect from '@/components/AsciiHoverEffect';
import CountUp from '@/components/CountUp';

const whatYouSee = [
  'Real team workspaces and daily product rituals',
  'Presentations from product, engineering, and design leads',
  'How different team structures and processes actually work',
  'Q&A sessions with employees across all levels',
];

const howItWorks = [
  { number: '1', title: 'Get notified', description: 'Join our mailing list. Tour opportunities go to PMC members first.' },
  { number: '2', title: 'Sign up fast', description: 'Spots are limited to 15\u201320 students. Groups fill up quickly.' },
  { number: '3', title: 'Visit', description: 'Tours last 1\u20132 hours. We handle logistics \u2014 you show up curious.' },
  { number: '4', title: 'Connect', description: 'Exchange contacts, grab coffee with team members, and stay in touch.' },
];

const tourBenefits = [
  {
    title: 'See Real Culture',
    desc: "Job descriptions don't tell you what a company actually feels like. Walk the floors, meet the people, and feel the energy for yourself.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </svg>
    ),
  },
  {
    title: 'Build Real Relationships',
    desc: "You'll have time to ask questions, grab coffee with team members, and often stay connected with PMs and designers just a few years ahead of you.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Find Your Fit',
    desc: "Learn how a startup's product culture differs from a growth-stage company or an established tech giant. Understand what environments work for you.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    title: 'Open Doors',
    desc: 'Past tour attendees have received direct interview invitations and internship offers from companies they visited.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

const industries = [
  'Fintech & Banking Infrastructure',
  'Consumer Social',
  'B2B SaaS & Enterprise',
  'Media & Content Platforms',
  'E-Commerce',
  'Venture Capital',
  'Design & Creative Tools',
  'Health Tech',
];

const stats = [
  { value: 15, suffix: '+', label: 'Companies Visited' },
  { value: 20, suffix: '', label: 'Students Per Tour' },
  { value: 2, suffix: '', label: 'Hour Average Visit' },
  { value: 100, suffix: '%', label: 'Free to Attend' },
];

const officeTourFAQs = [
  { question: 'How do I sign up for a tour?', answer: 'Subscribe to our newsletter and follow us on Instagram. We share tour opportunities with PMC members first, and spots fill up fast.' },
  { question: 'How many students go on each tour?', answer: 'We keep groups intentionally small \u2014 typically 15\u201320 students \u2014 for more meaningful engagement with the host company.' },
  { question: 'Do I need to be a PMC member?', answer: "Tours are shared with PMC members first. Make sure you're on our mailing list to get first access to tour opportunities." },
  { question: 'What should I wear?', answer: "Business casual is always safe. We'll share specific guidance for each company before the visit." },
  { question: 'Can tours lead to job opportunities?', answer: 'Absolutely. Several students have received interview invitations, mentorship connections, and internship offers from companies they visited through our tours.' },
  { question: 'How often do tours happen?', answer: 'Office Tours happen throughout the semester based on company availability. We typically run several tours per semester.' },
];

export default function OfficeVisitsPage() {
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  const [hoverOverview, setHoverOverview] = useState(false);
  const [hoverSee, setHoverSee] = useState(false);
  const [hoverHow, setHoverHow] = useState(false);

  return (
    <div className="bg-black relative">
      <div className="absolute top-0 left-0 w-full h-[110vh] pointer-events-none">
        <UnicornScene
          projectId="nfEXG2pQZ01qd0grcKXy"
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
          width="100%"
          height="100%"
        />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-black" />
      </div>

      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-20 pb-16 md:py-24 min-h-[80vh] md:min-h-screen flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 max-w-3xl text-center">
            <FadeUp>
              <h1 className="section-title text-[#DBDBDB] text-center">
                <TextAnimate as="span" animation="slideLeft" by="character" className="inline">
                  Office Tours
                </TextAnimate>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-base md:text-xl text-[#DBDBDB]/70 leading-relaxed max-w-2xl">
                Go inside the companies shaping how millions of people work,
                communicate, and live. We take small groups to visit startups,
                tech giants, and VC firms across NYC &mdash; so you can see what
                building products actually looks like.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <Button
                href="https://www.instagram.com/nyupmc/"
                className="px-8 py-4"
              >
                Event Updates
              </Button>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Overview Bento Card */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="border border-[#3F3F3F]/40 overflow-hidden bg-[#3F3F3F]/20">
              {/* Top panel */}
              <div
                className="relative cursor-default"
                onMouseEnter={() => setHoverOverview(true)}
                onMouseLeave={() => setHoverOverview(false)}
              >
                <AsciiHoverEffect
                  active={hoverOverview}
                  colors="#5076DD,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                  fontSize={10}
                  className="opacity-40 mix-blend-screen"
                />
                <div className="relative z-10 p-8 md:p-12">
                  <h2 className="section-title text-[#DBDBDB] mb-8 text-center">
                    <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                      Overview
                    </TextAnimate>
                  </h2>
                  <p className="text-base md:text-lg text-[#DBDBDB]/80 leading-relaxed max-w-3xl mx-auto text-center">
                    There&apos;s only so much you can learn from slides and case
                    studies. Our Office Tours let you walk through actual product
                    offices, meet the teams behind the work, and understand how
                    companies operate day-to-day. You&apos;ll meet designers
                    whose mocks become shipped features, engineers whose systems
                    scale to millions, and PMs making calls that define product
                    strategy.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#3F3F3F]/40" />

              {/* Bottom row */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: What You'll See */}
                <div
                  className="relative overflow-hidden p-8 md:p-12 cursor-default"
                  onMouseEnter={() => setHoverSee(true)}
                  onMouseLeave={() => setHoverSee(false)}
                >
                  <AsciiHoverEffect
                    active={hoverSee}
                    colors="#5076DD,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                    fontSize={10}
                    className="opacity-40 mix-blend-screen"
                  />
                  <div className="relative z-10">
                    <h3 className="text-sm font-bold tracking-widest text-[#DBDBDB] uppercase mb-6">
                      What You&apos;ll See
                    </h3>
                    <ul className="space-y-3">
                      {whatYouSee.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[#DBDBDB]/80">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5076DD] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: How It Works */}
                <div
                  className="relative overflow-hidden p-8 md:p-12 border-t md:border-t-0 md:border-l border-[#3F3F3F]/40 cursor-default"
                  onMouseEnter={() => setHoverHow(true)}
                  onMouseLeave={() => setHoverHow(false)}
                >
                  <AsciiHoverEffect
                    active={hoverHow}
                    colors="#5076DD,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                    fontSize={10}
                    className="opacity-40 mix-blend-screen"
                  />
                  <div className="relative z-10">
                    <h3 className="text-sm font-bold tracking-widest text-[#DBDBDB] uppercase mb-6">
                      How It Works
                    </h3>
                    <div className="space-y-6">
                      {howItWorks.map((step) => (
                        <div key={step.number} className="flex gap-4 group">
                          <span className="flex items-center justify-center w-9 h-9 border border-[#3F3F3F]/60 text-[#DBDBDB] text-sm shrink-0 mt-0.5 transition-colors duration-300 group-hover:border-[#5076DD]">
                            {step.number}
                          </span>
                          <div>
                            <h4 className="text-lg text-[#DBDBDB] font-medium mb-1">{step.title}</h4>
                            <p className="text-[#DBDBDB]/60 text-base">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* More Than a Visit — Benefit Cards */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] text-center mb-16">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                More Than a Visit
              </TextAnimate>
            </h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tourBenefits.map((b, i) => (
              <StaggerItem key={b.title}>
                <div
                  className="relative overflow-hidden bg-[#3F3F3F]/20 border border-[#3F3F3F]/40 p-8 md:p-10 cursor-default h-full"
                  onMouseEnter={() => setHoveredBenefit(i)}
                  onMouseLeave={() => setHoveredBenefit(null)}
                >
                  <AsciiHoverEffect
                    active={hoveredBenefit === i}
                    colors="#5076DD,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                    fontSize={10}
                    className="opacity-40 mix-blend-screen"
                  />
                  <div className="relative z-10">
                    <div className="w-10 h-10 mb-6 text-[#5076DD]">{b.icon}</div>
                    <h3 className="sub-section-title text-[#DBDBDB] mb-3">{b.title}</h3>
                    <p className="text-[#DBDBDB]/70 text-base leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Industries We Explore */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] text-center mb-4">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Industries We Explore
              </TextAnimate>
            </h2>
            <p className="text-lg text-[#DBDBDB]/60 text-center mb-12 max-w-2xl mx-auto">
              We prioritize companies that are building interesting products,
              moving fast, and willing to be transparent about how they work.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {industries.map((type) => (
                <Chip color="#5076DD" key={type}>{type}</Chip>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-16">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center ${i < stats.length - 1 ? 'md:border-r md:border-[#3F3F3F]/40' : ''}`}
                >
                  <span
                    className="section-title text-[#5076DD]"
                    style={{ fontFamily: 'var(--font-gotham-medium)' }}
                  >
                    <CountUp to={stat.value} duration={2} />
                    {stat.suffix}
                  </span>
                  <p className="text-sm uppercase tracking-widest text-[#DBDBDB]/50 mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <JoinUsSection variant="default" newsletterSource="office-tours" />
      <FAQSection variant="default" items={officeTourFAQs} />
    </div>
  );
}
