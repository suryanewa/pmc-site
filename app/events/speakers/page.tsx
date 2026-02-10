'use client';

import { useState } from 'react';
import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from '../../components/ScrollAnimations';
import { JoinUsSection } from '../../components/JoinUsSection';
import { FAQSection } from '../../components/FAQSection';
import { Button } from '../../components/Button';
import { TextAnimate } from '@/components/ui/text-animate';
import PixelHoverCanvas from '@/components/PixelHoverCanvas';
import CountUp from '@/components/CountUp';
import { LogoLoop } from '@/components/LogoLoop';
import type { LogoItem } from '@/components/LogoLoop';

/* ─── data ─────────────────────────────────────────────────────────── */

const stats = [
  { value: 50, suffix: '+', label: 'Speakers Hosted' },
  { value: 30, suffix: '+', label: 'Companies Represented' },
  { value: 500, suffix: '+', label: 'Students Attended' },
  { value: 4, suffix: '', label: 'Semesters Running' },
];

const benefits = [
  {
    title: 'Unfiltered Insights',
    desc: "Our panels go deep with PMs from startups to Fortune 500s — the real decisions, tradeoffs, and frameworks that define great product work.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
  },
  {
    title: 'Applied Frameworks',
    desc: 'Each week covers different PM topics: discovery, roadmap prioritization, cross-functional leadership, metrics, go-to-market, and more.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
  },
  {
    title: 'Career Clarity',
    desc: "Whether you're new to product or already building something, you'll leave with a sharper understanding of what great product management looks like.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
  },
];

const speakerCompanies: LogoItem[] = [
  { src: '/companies/meta.png', alt: 'Meta' },
  { src: '/companies/figma.svg', alt: 'Figma' },
  { src: '/companies/anthropic.svg', alt: 'Anthropic' },
  { src: '/companies/hinge-logo.svg', alt: 'Hinge' },
  { src: '/companies/lux.svg', alt: 'Lux Capital' },
  { src: '/companies/usv.svg', alt: 'USV' },
  { src: '/companies/bessemer.png', alt: 'Bessemer' },
  { src: '/companies/clay.png', alt: 'Clay' },
  { src: '/companies/clear.png', alt: 'CLEAR' },
  { src: '/companies/mine.svg', alt: 'Mine' },
  { src: '/companies/venmo.png', alt: 'Venmo' },
  { src: '/companies/resy.png', alt: 'Resy' },
  { src: '/companies/ro.png', alt: 'Ro' },
  { src: '/companies/de-shaw.png', alt: 'D.E. Shaw' },
];

const reasons = [
  {
    quote: 'Real conversations, not rehearsed keynotes.',
    detail:
      "Speakers share honest stories about what worked, what didn't, and what they'd do differently. You'll hear from PMs who scaled apps to 100M users and founders who built companies from 0 to 1.",
  },
  {
    quote: 'The network compounds.',
    detail:
      "You'll see the same ambitious students every Thursday. By semester's end, you'll have a real community of people serious about product — not just a contact list.",
  },
  {
    quote: 'It changes what you think is possible.',
    detail:
      'Hearing someone a few years ahead of you describe navigating ambiguity, driving innovation, and shaping products millions use — that shifts your frame of reference permanently.',
  },
];

const logisticsItems = [
  {
    label: 'When',
    value: 'Every Thursday, 6:00 PM',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
  {
    label: 'Where',
    value: 'Kimmel Center / Leslie eLab',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Who',
    value: 'All NYU students',
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
    label: 'Cost',
    value: 'Free, no signup needed',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M13 5v2" />
        <path d="M13 17v2" />
        <path d="M13 11v2" />
      </svg>
    ),
  },
];

const speakerFAQs = [
  {
    question: 'Do I need to be a PMC member to attend?',
    answer: 'No. Speaker Series is open to all NYU students regardless of major, year, or experience level. Just show up.',
  },
  {
    question: 'How do I find out about upcoming speakers?',
    answer: 'Follow us on Instagram @nyupmc and subscribe to our newsletter. We announce speakers weekly.',
  },
  {
    question: 'Can I talk to the speaker afterward?',
    answer: 'Yes. Most sessions include time for networking and one-on-one conversation after the panel.',
  },
  {
    question: 'Where exactly do events take place?',
    answer: 'Generally the Kimmel Center or Leslie eLab at NYU. Exact room details are shared on Instagram before each event.',
  },
  {
    question: 'What if I have no product management experience?',
    answer: "That's totally fine. Many attendees are exploring the field for the first time. The format is designed to be approachable regardless of background.",
  },
];

/* ─── component ────────────────────────────────────────────────────── */

export default function SpeakersPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoverLogistics, setHoverLogistics] = useState(false);

  return (
    <div className="bg-black relative">
      {/* ───── Hero ───── */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-20 pb-16 md:py-24 min-h-[80vh] md:min-h-screen flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 max-w-3xl text-center">
            <FadeUp>
              <h1 className="section-title text-[#DBDBDB] text-center">
                <TextAnimate as="span" animation="slideLeft" by="character" className="inline">
                  Speaker Series
                </TextAnimate>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-base md:text-xl text-[#DBDBDB]/70 leading-relaxed max-w-2xl md:mt-4 mb-8 md:mb-10">
                Every Thursday at 6:00 PM, we bring product leaders from across
                industries directly to NYU students. No fluff — real
                conversations with the people building the future.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <Button
                  href="https://www.instagram.com/nyupmc/"
                  className="w-full sm:w-auto px-8 py-4"
                  fillColor="#41C9C1"
                  textColor="#000000"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    Follow on Instagram
                  </span>
                </Button>
                <a
                  href="#join-us"
                  className="text-[#DBDBDB]/60 hover:text-[#41C9C1] underline underline-offset-4 text-sm transition-colors duration-300"
                >
                  or join our newsletter
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ───── Stats ───── */}
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
                    className="section-title text-[#41C9C1]"
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

      {/* ───── Benefit Cards ───── */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] text-center mb-16">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Learn From the People Building the Future
              </TextAnimate>
            </h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <StaggerItem key={b.title}>
                <div
                  className="relative overflow-hidden bg-[#3F3F3F]/20 border border-[#3F3F3F]/40 p-8 md:p-10 cursor-default h-full"
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <PixelHoverCanvas
                    active={hoveredCard === i}
                    colors="#41C9C1,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                    gap={6}
                    speed={30}
                    className="opacity-40 mix-blend-screen"
                    radius={0}
                  />
                  <div className="relative z-10">
                    <div className="w-10 h-10 mb-6 text-[#41C9C1]">{b.icon}</div>
                    <h3 className="sub-section-title text-[#DBDBDB] mb-3">
                      {b.title}
                    </h3>
                    <p className="text-[#DBDBDB]/70 text-base leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ───── Logo Marquee ───── */}
      <section className="relative z-10 py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] text-center mb-4">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Where Our Speakers Come From
              </TextAnimate>
            </h2>
            <p className="text-lg text-[#DBDBDB]/60 text-center mb-12 max-w-2xl mx-auto">
              We&apos;ve hosted leaders from startups to Fortune 500s.
            </p>
          </FadeUp>
        </div>
        <FadeIn delay={0.2}>
          <LogoLoop
            logos={speakerCompanies}
            speed={80}
            logoHeight={32}
            gap={48}
            pauseOnHover
            fadeOut
            fadeOutColor="#000000"
          />
        </FadeIn>
      </section>

      {/* ───── Why Students Keep Coming Back ───── */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] text-center mb-16">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Why Students Keep Coming Back
              </TextAnimate>
            </h2>
          </FadeUp>

          <div className="max-w-3xl mx-auto space-y-12">
            {reasons.map((r, i) => (
              <FadeUp delay={i * 0.1} key={i}>
                <div className="flex gap-6">
                  <span
                    className="text-5xl font-medium text-[#41C9C1] shrink-0 w-12"
                    style={{ fontFamily: 'var(--font-gotham-medium)' }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="sub-section-title text-[#DBDBDB] mb-2">
                      {r.quote}
                    </h3>
                    <p className="text-[#DBDBDB]/70 text-base md:text-lg leading-relaxed">
                      {r.detail}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Logistics Card ───── */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] text-center mb-12">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Join Us Thursday
              </TextAnimate>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div
              className="relative overflow-hidden bg-[#3F3F3F]/20 border border-[#3F3F3F]/40 cursor-default"
              onMouseEnter={() => setHoverLogistics(true)}
              onMouseLeave={() => setHoverLogistics(false)}
            >
              <PixelHoverCanvas
                active={hoverLogistics}
                colors="#41C9C1,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                gap={6}
                speed={30}
                className="opacity-40 mix-blend-screen"
                radius={0}
              />
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {logisticsItems.map((item, i) => (
                  <div
                    key={item.label}
                    className={`p-8 md:p-10 ${
                      i < logisticsItems.length - 1
                        ? 'border-b sm:border-b-0 sm:border-r border-[#3F3F3F]/40'
                        : ''
                    }`}
                  >
                    <div className="w-8 h-8 text-[#41C9C1] mb-4">{item.icon}</div>
                    <p className="text-sm font-bold tracking-widest text-[#DBDBDB]/50 uppercase mb-2">
                      {item.label}
                    </p>
                    <p className="text-lg text-[#DBDBDB]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ───── Join Us + FAQ ───── */}
      <JoinUsSection variant="default" newsletterSource="speaker-series" />
      <FAQSection variant="default" items={speakerFAQs} />
    </div>
  );
}
