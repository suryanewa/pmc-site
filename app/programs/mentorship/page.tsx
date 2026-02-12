'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FadeUp, FadeIn } from '../../components/ScrollAnimations';
import { Chip } from '../../components/Chip';
import { Button } from '../../components/Button';
import { JoinUsSection } from '../../components/JoinUsSection';
import { FAQSection } from '../../components/FAQSection';
import { TextAnimate } from '@/components/ui/text-animate';
import AsciiHoverEffect from '@/components/AsciiHoverEffect';
import { UnicornHeroBackground } from '../../components/UnicornHeroBackground';

const ACCENT = '#6966E3';
const ACCENT_SECONDARY = '#41C9C1';

interface CompanyLogo {
  name: string;
  logo: string;
  invert?: boolean;
}

const mentorCompanies: CompanyLogo[] = [
  { name: 'Google', logo: 'https://svgl.app/library/google.svg' },
  { name: 'JPMorgan Chase', logo: '/companies/chase-logo.svg', invert: true },
  { name: 'Mastercard', logo: '/companies/mastercard.svg', invert: true },
  { name: 'PwC', logo: '/companies/pwc.svg', invert: true },
  { name: 'Capital One', logo: '/companies/capital-one.webp', invert: true },
  { name: 'Meta', logo: '/companies/meta.webp', invert: true },
];

const additionalEvents = [
  {
    title: 'Intro Mentorship Kickoff',
    description: 'Welcome session for the Intro track — meet your mentor and set semester goals.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    title: 'Advanced Mentorship Kickoff',
    description: 'Welcome session for the Advanced track — align on recruiting goals with your industry mentor.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.536 21.37a1 1 0 0 0 1.02-.096l7.172-5.22a2 2 0 0 0 .451-2.862L10.4 1.666A1 1 0 0 0 8.68 2.04l-.65 7.762a2 2 0 0 1-.766 1.38l-5.991 4.36a1 1 0 0 0 .096 1.72z" />
        <path d="m12.5 15.5 2 2" />
        <path d="m15 13 4 4" />
      </svg>
    ),
  },
  {
    title: 'Career Development Workshops',
    description: 'Hands-on sessions covering resume building, networking strategy, and interview prep.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <rect width="20" height="14" x="2" y="6" rx="2" />
      </svg>
    ),
  },
  {
    title: 'Mastercard NYC Office Visit',
    description: 'An exclusive behind-the-scenes tour of Mastercard\'s New York office.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Mentorship Farewell',
    description: 'Celebrate the semester\'s growth and recognize outstanding mentor-mentee pairs.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
        <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    ),
  },
];

const whatToExpect = [
  'Exclusive access to mentorship-only events, including workshops, professional Q&A sessions, and interview prep',
  'A new friend — a mentor you can turn to for career advice and support',
  'The confidence and candor to network with any prospective employer',
  'A professional resume catered to your industry of interest',
];

export default function MentorshipPage() {
  const [hoverIntro, setHoverIntro] = useState(false);
  const [hoverAdvanced, setHoverAdvanced] = useState(false);

  const asciiConfig = {
    colors: `${ACCENT},rgba(219,219,219,0.7),rgba(63,63,63,0.8)`,
    fontSize: 10,
    className: 'opacity-40 mix-blend-screen',
  };

  return (
    <div className="bg-black relative">
      <UnicornHeroBackground projectId="Foe2Sv3x1BgVTbuc7Xv6" />

      {/* Hero */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-20 pb-16 md:py-24 min-h-screen flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 max-w-3xl text-center">
            <FadeUp>
              <h1 className="section-title text-[#DBDBDB] text-center">
                <TextAnimate as="span" animation="slideLeft" by="character" className="inline">
                  Mentorship
                </TextAnimate>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <div className="w-full sm:w-auto">
                  <Button
                    href="#tracks"
                    className="w-full sm:w-auto px-8 py-4"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Explore Tracks
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

      {/* Two Tracks Section */}
      <section id="tracks" className="relative z-10 px-6 md:px-16 lg:px-24 py-32">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-4 text-center">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Two Tracks
              </TextAnimate>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg text-[#DBDBDB]/70 leading-relaxed mb-16 max-w-2xl mx-auto text-center">
              Choose the track that matches where you are in your PM journey.
            </p>
          </FadeUp>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#3F3F3F]/30">
              {/* Intro Track */}
              <div
                className="relative overflow-hidden bg-black cursor-default"
                onMouseEnter={() => setHoverIntro(true)}
                onMouseLeave={() => setHoverIntro(false)}
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <AsciiHoverEffect
                    active={hoverIntro}
                    colors={asciiConfig.colors}
                    fontSize={asciiConfig.fontSize}
                    className="opacity-40"
                  />
                </div>
                <div className="relative z-10 p-8 md:p-12 lg:p-16">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <span className="text-sm font-bold tracking-widest text-[#DBDBDB] uppercase">
                      Intro Track
                    </span>
                  </div>
                  <h3 className="sub-section-title text-[#DBDBDB] mb-6">
                    Your First Step into PM
                  </h3>
                  <p className="text-base md:text-lg text-[#DBDBDB]/70 leading-relaxed mb-8">
                    Catered to young professionals in the early stages of their careers who want to
                    take their first step into the world of PM. Intro Mentees are paired one-to-one
                    with a PMC E-Board member with PM experience and internships to learn about the
                    fundamentals of PM and prepare them for their professional careers.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Chip color={ACCENT}>PM Fundamentals</Chip>
                    <Chip color={ACCENT}>E-Board Mentor</Chip>
                    <Chip color={ACCENT}>Career Prep</Chip>
                  </div>
                </div>
              </div>

              {/* Advanced Track */}
              <div
                className="relative overflow-hidden bg-black cursor-default"
                onMouseEnter={() => setHoverAdvanced(true)}
                onMouseLeave={() => setHoverAdvanced(false)}
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <AsciiHoverEffect
                    active={hoverAdvanced}
                    colors={`${ACCENT_SECONDARY},rgba(219,219,219,0.7),rgba(63,63,63,0.8)`}
                    fontSize={asciiConfig.fontSize}
                    className="opacity-40"
                  />
                </div>
                <div className="relative z-10 p-8 md:p-12 lg:p-16">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: ACCENT_SECONDARY }}
                    />
                    <span className="text-sm font-bold tracking-widest text-[#DBDBDB] uppercase">
                      Advanced Track
                    </span>
                  </div>
                  <h3 className="sub-section-title text-[#DBDBDB] mb-6">
                    Accelerate Your PM Career
                  </h3>
                  <p className="text-base md:text-lg text-[#DBDBDB]/70 leading-relaxed mb-8">
                    Intended for students in the later stages of their PM journey, particularly
                    those actively recruiting. Advanced mentees are paired one-to-one with a
                    full-time Product Manager across a range of industries, where they will receive
                    direct, personalized guidance on PM recruiting, interviewing, and career
                    progression.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Chip color={ACCENT_SECONDARY}>Industry Mentor</Chip>
                    <Chip color={ACCENT_SECONDARY}>Recruiting Prep</Chip>
                    <Chip color={ACCENT_SECONDARY}>Career Progression</Chip>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What to Expect */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32 border-t border-[#3F3F3F]/40">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <FadeUp>
                <h2 className="section-title text-[#DBDBDB] mb-8">
                  <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                    What to Expect
                  </TextAnimate>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <ul className="space-y-5">
                  {whatToExpect.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-base md:text-lg text-[#DBDBDB]/80">
                      <span
                        className="mt-2 w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: ACCENT }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>

            <div>
              <FadeUp delay={0.15}>
                <div className="border border-[#3F3F3F]/40 bg-[#3F3F3F]/10 p-8 md:p-10">
                  <h3 className="text-sm font-bold tracking-widest text-[#DBDBDB] uppercase mb-6">
                    Featuring Mentors From
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {mentorCompanies.map((company) => (
                      <div
                        key={company.name}
                        className="flex items-center justify-center h-16 border border-[#3F3F3F]/40 bg-[#3F3F3F]/10 hover:bg-[#3F3F3F]/20 transition-colors duration-300 px-4"
                      >
                        {company.logo.startsWith('http') ? (
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
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center justify-center h-14 px-8 border border-[#3F3F3F]/40 bg-[#3F3F3F]/10">
                      <span className="text-sm font-bold tracking-wide uppercase text-white">
                        And More
                      </span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Events */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32 border-t border-[#3F3F3F]/40">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-4 text-center">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Events &amp; Activities
              </TextAnimate>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg text-[#DBDBDB]/70 leading-relaxed mb-16 max-w-2xl mx-auto text-center">
              Beyond one-on-one meetings, the Mentorship Program hosts exclusive events throughout the semester.
            </p>
          </FadeUp>

          <FadeIn delay={0.2}>
            <div className="space-y-px bg-[#3F3F3F]/30">
              {additionalEvents.map((event, i) => (
                <div
                  key={event.title}
                  className="bg-black p-6 md:p-8 flex items-center gap-6 group hover:bg-[#3F3F3F]/10 transition-colors duration-300 cursor-default"
                >
                  <span
                    className="text-sm font-medium tracking-widest uppercase shrink-0 w-8 text-right transition-colors duration-300"
                    style={{ color: ACCENT }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-[#DBDBDB] mb-1">{event.title}</h4>
                    <p className="text-[#DBDBDB]/60 text-sm leading-relaxed">{event.description}</p>
                  </div>
                  <span className="shrink-0 text-[#6966E3]">
                    {event.icon}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Requirements */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32 border-t border-[#3F3F3F]/40">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-12 text-center">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Requirements
              </TextAnimate>
            </h2>
          </FadeUp>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#3F3F3F]/30 max-w-4xl mx-auto">
              <div className="bg-black p-8 md:p-10 text-center">
                <span className="block text-3xl md:text-4xl font-medium text-[#DBDBDB] mb-3" style={{ color: ACCENT }}>
                  1×
                </span>
                <p className="text-[#DBDBDB]/70 text-sm leading-relaxed">
                  Meet your mentor at least once every two weeks, with at least one meeting in-person
                </p>
              </div>
              <div className="bg-black p-8 md:p-10 text-center">
                <span className="block text-3xl md:text-4xl font-medium text-[#DBDBDB] mb-3" style={{ color: ACCENT }}>
                  100%
                </span>
                <p className="text-[#DBDBDB]/70 text-sm leading-relaxed">
                  Attendance required at mentorship-exclusive events, including networking sessions and professional workshops
                </p>
              </div>
              <div className="bg-black p-8 md:p-10 text-center">
                <span className="block text-3xl md:text-4xl font-medium text-[#DBDBDB] mb-3" style={{ color: ACCENT }}>
                  Guided
                </span>
                <p className="text-[#DBDBDB]/70 text-sm leading-relaxed">
                  A syllabus tailored to your chosen track to structure and maximize your mentorship meetings
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Meet the Leads */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32 border-t border-[#3F3F3F]/40">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-12 text-center">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Meet the Leads
              </TextAnimate>
            </h2>
          </FadeUp>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#3F3F3F]/30 max-w-2xl mx-auto">
              <div className="bg-black p-8 md:p-10 text-center group hover:bg-[#3F3F3F]/10 transition-colors duration-300">
                <h4 className="text-xl font-medium text-[#DBDBDB] mb-2">Ethan Lu</h4>
                <a
                  href="mailto:rkl6999@nyu.edu"
                  className="text-sm transition-colors duration-300 hover:underline underline-offset-4"
                  style={{ color: ACCENT }}
                >
                  rkl6999@nyu.edu
                </a>
              </div>
              <div className="bg-black p-8 md:p-10 text-center group hover:bg-[#3F3F3F]/10 transition-colors duration-300">
                <h4 className="text-xl font-medium text-[#DBDBDB] mb-2">Jade Leong</h4>
                <a
                  href="mailto:jyl9618@nyu.edu"
                  className="text-sm transition-colors duration-300 hover:underline underline-offset-4"
                  style={{ color: ACCENT }}
                >
                  jyl9618@nyu.edu
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <JoinUsSection variant="investing" newsletterSource="mentorship-program" />
      <FAQSection variant="investing" />
    </div>
  );
}
